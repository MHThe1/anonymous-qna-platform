/**
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Protocol } from 'devtools-protocol';
import { JSHandle } from '../api/JSHandle.js';
import { Realm } from '../api/Realm.js';
import { Binding } from './Binding.js';
import { CDPSession } from './Connection.js';
import { ExecutionContext } from './ExecutionContext.js';
import { CDPFrame } from './Frame.js';
import { MAIN_WORLD, PUPPETEER_WORLD } from './IsolatedWorlds.js';
import { TimeoutSettings } from './TimeoutSettings.js';
import { EvaluateFunc, HandleFor } from './types.js';
import { WebWorker } from './WebWorker.js';
/**
 * @public
 */
export interface WaitForSelectorOptions {
    /**
     * Wait for the selected element to be present in DOM and to be visible, i.e.
     * to not have `display: none` or `visibility: hidden` CSS properties.
     *
     * @defaultValue `false`
     */
    visible?: boolean;
    /**
     * Wait for the selected element to not be found in the DOM or to be hidden,
     * i.e. have `display: none` or `visibility: hidden` CSS properties.
     *
     * @defaultValue `false`
     */
    hidden?: boolean;
    /**
     * Maximum time to wait in milliseconds. Pass `0` to disable timeout.
     *
     * The default value can be changed by using {@link Page.setDefaultTimeout}
     *
     * @defaultValue `30_000` (30 seconds)
     */
    timeout?: number;
    /**
     * A signal object that allows you to cancel a waitForSelector call.
     */
    signal?: AbortSignal;
}
/**
 * @internal
 */
export interface PageBinding {
    name: string;
    pptrFunction: Function;
}
/**
 * @internal
 */
export interface IsolatedWorldChart {
    [key: string]: IsolatedWorld;
    [MAIN_WORLD]: IsolatedWorld;
    [PUPPETEER_WORLD]: IsolatedWorld;
}
/**
 * @internal
 */
export declare class IsolatedWorld extends Realm {
    #private;
    get _bindings(): Map<string, Binding>;
    constructor(frameOrWorker: CDPFrame | WebWorker, timeoutSettings: TimeoutSettings);
    get environment(): CDPFrame | WebWorker;
    frameUpdated(): void;
    get client(): CDPSession;
    clearContext(): void;
    setContext(context: ExecutionContext): void;
    hasContext(): boolean;
    evaluateHandle<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, ...args: Params): Promise<HandleFor<Awaited<ReturnType<Func>>>>;
    evaluate<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, ...args: Params): Promise<Awaited<ReturnType<Func>>>;
    _addBindingToContext(context: ExecutionContext, name: string): Promise<void>;
    adoptBackendNode(backendNodeId?: Protocol.DOM.BackendNodeId): Promise<JSHandle<Node>>;
    adoptHandle<T extends JSHandle<Node>>(handle: T): Promise<T>;
    transferHandle<T extends JSHandle<Node>>(handle: T): Promise<T>;
    [Symbol.dispose](): void;
}
//# sourceMappingURL=IsolatedWorld.d.ts.map