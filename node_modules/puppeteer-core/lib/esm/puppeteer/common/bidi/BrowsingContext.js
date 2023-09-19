import { assert } from '../../util/assert.js';
import { Deferred } from '../../util/Deferred.js';
import { CDPSession } from '../Connection.js';
import { ProtocolError, TargetCloseError, TimeoutError } from '../Errors.js';
import { setPageContent, waitWithTimeout } from '../util.js';
import { Realm } from './Realm.js';
import { debugError } from './utils.js';
/**
 * @internal
 */
export const lifeCycleToSubscribedEvent = new Map([
    ['load', 'browsingContext.load'],
    ['domcontentloaded', 'browsingContext.domContentLoaded'],
]);
/**
 * @internal
 */
const lifeCycleToReadinessState = new Map([
    ['load', "complete" /* Bidi.BrowsingContext.ReadinessState.Complete */],
    ['domcontentloaded', "interactive" /* Bidi.BrowsingContext.ReadinessState.Interactive */],
]);
/**
 * @internal
 */
export const cdpSessions = new Map();
/**
 * @internal
 */
export class CDPSessionWrapper extends CDPSession {
    #context;
    #sessionId = Deferred.create();
    #detached = false;
    constructor(context, sessionId) {
        super();
        this.#context = context;
        if (!this.#context.supportsCDP()) {
            return;
        }
        if (sessionId) {
            this.#sessionId.resolve(sessionId);
            cdpSessions.set(sessionId, this);
        }
        else {
            context.connection
                .send('cdp.getSession', {
                context: context.id,
            })
                .then(session => {
                this.#sessionId.resolve(session.result.session);
                cdpSessions.set(session.result.session, this);
            })
                .catch(err => {
                this.#sessionId.reject(err);
            });
        }
    }
    connection() {
        return undefined;
    }
    async send(method, ...paramArgs) {
        if (!this.#context.supportsCDP()) {
            throw new Error('CDP support is required for this feature. The current browser does not support CDP.');
        }
        if (this.#detached) {
            throw new TargetCloseError(`Protocol error (${method}): Session closed. Most likely the page has been closed.`);
        }
        const session = await this.#sessionId.valueOrThrow();
        const { result } = await this.#context.connection.send('cdp.sendCommand', {
            method: method,
            params: paramArgs[0],
            session,
        });
        return result.result;
    }
    async detach() {
        cdpSessions.delete(this.id());
        if (!this.#detached && this.#context.supportsCDP()) {
            await this.#context.cdpSession.send('Target.detachFromTarget', {
                sessionId: this.id(),
            });
        }
        this.#detached = true;
    }
    id() {
        const val = this.#sessionId.value();
        return val instanceof Error || val === undefined ? '' : val;
    }
}
/**
 * Internal events that the BrowsingContext class emits.
 *
 * @internal
 */
export const BrowsingContextEmittedEvents = {
    /**
     * Emitted on the top-level context, when a descendant context is created.
     */
    Created: Symbol('BrowsingContext.created'),
    /**
     * Emitted on the top-level context, when a descendant context or the
     * top-level context itself is destroyed.
     */
    Destroyed: Symbol('BrowsingContext.destroyed'),
};
/**
 * @internal
 */
export class BrowsingContext extends Realm {
    #id;
    #url;
    #cdpSession;
    #parent;
    #browserName = '';
    constructor(connection, info, browserName) {
        super(connection);
        this.#id = info.context;
        this.#url = info.url;
        this.#parent = info.parent;
        this.#browserName = browserName;
        this.#cdpSession = new CDPSessionWrapper(this, undefined);
        this.on('browsingContext.domContentLoaded', this.#updateUrl.bind(this));
        this.on('browsingContext.fragmentNavigated', this.#updateUrl.bind(this));
        this.on('browsingContext.load', this.#updateUrl.bind(this));
    }
    supportsCDP() {
        return !this.#browserName.toLowerCase().includes('firefox');
    }
    #updateUrl(info) {
        this.#url = info.url;
    }
    createRealmForSandbox() {
        return new Realm(this.connection);
    }
    get url() {
        return this.#url;
    }
    get id() {
        return this.#id;
    }
    get parent() {
        return this.#parent;
    }
    get cdpSession() {
        return this.#cdpSession;
    }
    async goto(url, options) {
        const { waitUntil = 'load', timeout } = options;
        const readinessState = lifeCycleToReadinessState.get(getWaitUntilSingle(waitUntil));
        try {
            const { result } = await waitWithTimeout(this.connection.send('browsingContext.navigate', {
                url: url,
                context: this.#id,
                wait: readinessState,
            }), 'Navigation', timeout);
            this.#url = result.url;
            return result.navigation;
        }
        catch (error) {
            if (error instanceof ProtocolError) {
                error.message += ` at ${url}`;
            }
            else if (error instanceof TimeoutError) {
                error.message = 'Navigation timeout of ' + timeout + ' ms exceeded';
            }
            throw error;
        }
    }
    async reload(options) {
        const { waitUntil = 'load', timeout } = options;
        const readinessState = lifeCycleToReadinessState.get(getWaitUntilSingle(waitUntil));
        await waitWithTimeout(this.connection.send('browsingContext.reload', {
            context: this.#id,
            wait: readinessState,
        }), 'Navigation', timeout);
    }
    async setContent(html, options) {
        const { waitUntil = 'load', timeout } = options;
        const waitUntilEvent = lifeCycleToSubscribedEvent.get(getWaitUntilSingle(waitUntil));
        await Promise.all([
            setPageContent(this, html),
            waitWithTimeout(new Promise(resolve => {
                this.once(waitUntilEvent, () => {
                    resolve();
                });
            }), waitUntilEvent, timeout),
        ]);
    }
    async sendCDPCommand(method, ...paramArgs) {
        return await this.#cdpSession.send(method, ...paramArgs);
    }
    title() {
        return this.evaluate(() => {
            return document.title;
        });
    }
    dispose() {
        this.removeAllListeners();
        this.connection.unregisterBrowsingContexts(this.#id);
        void this.#cdpSession.detach().catch(debugError);
    }
}
/**
 * @internal
 */
export function getWaitUntilSingle(event) {
    if (Array.isArray(event) && event.length > 1) {
        throw new Error('BiDi support only single `waitUntil` argument');
    }
    const waitUntilSingle = Array.isArray(event)
        ? event.find(lifecycle => {
            return lifecycle === 'domcontentloaded' || lifecycle === 'load';
        })
        : event;
    if (waitUntilSingle === 'networkidle0' ||
        waitUntilSingle === 'networkidle2') {
        throw new Error(`BiDi does not support 'waitUntil' ${waitUntilSingle}`);
    }
    assert(waitUntilSingle, `Invalid waitUntil option ${waitUntilSingle}`);
    return waitUntilSingle;
}
//# sourceMappingURL=BrowsingContext.js.map