import * as Bidi from 'chromium-bidi/lib/cjs/protocol/protocol.js';
import PuppeteerUtil from '../../injected/injected.js';
import { EventEmitter } from '../EventEmitter.js';
import { EvaluateFunc, HandleFor } from '../types.js';
import { Connection } from './Connection.js';
import { BidiElementHandle } from './ElementHandle.js';
import { BidiJSHandle } from './JSHandle.js';
import { Sandbox } from './Sandbox.js';
export declare const SOURCE_URL_REGEX: RegExp;
export declare const getSourceUrlComment: (url: string) => string;
export declare class Realm extends EventEmitter {
    #private;
    readonly connection: Connection;
    constructor(connection: Connection);
    get target(): Bidi.Script.Target;
    handleRealmDestroyed: (params: Bidi.Script.RealmDestroyed['params']) => Promise<void>;
    handleRealmCreated: (params: Bidi.Script.RealmCreated['params']) => void;
    setSandbox(sandbox: Sandbox): void;
    protected internalPuppeteerUtil?: Promise<BidiJSHandle<PuppeteerUtil>>;
    get puppeteerUtil(): Promise<BidiJSHandle<PuppeteerUtil>>;
    evaluateHandle<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, ...args: Params): Promise<HandleFor<Awaited<ReturnType<Func>>>>;
    evaluate<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, ...args: Params): Promise<Awaited<ReturnType<Func>>>;
    [Symbol.dispose](): void;
}
/**
 * @internal
 */
export declare function createBidiHandle(sandbox: Sandbox, result: Bidi.Script.RemoteValue): BidiJSHandle<unknown> | BidiElementHandle<Node>;
//# sourceMappingURL=Realm.d.ts.map