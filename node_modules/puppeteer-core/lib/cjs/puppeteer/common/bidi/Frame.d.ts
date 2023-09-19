/**
 * Copyright 2023 Google Inc. All rights reserved.
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
import { Frame } from '../../api/Frame.js';
import { CDPSession } from '../Connection.js';
import { PuppeteerLifeCycleEvent } from '../LifecycleWatcher.js';
import { TimeoutSettings } from '../TimeoutSettings.js';
import { Awaitable } from '../types.js';
import { BrowsingContext } from './BrowsingContext.js';
import { HTTPResponse } from './HTTPResponse.js';
import { BidiPage } from './Page.js';
import { Sandbox, SandboxChart } from './Sandbox.js';
/**
 * Puppeteer's Frame class could be viewed as a BiDi BrowsingContext implementation
 * @internal
 */
export declare class BidiFrame extends Frame {
    #private;
    sandboxes: SandboxChart;
    _id: string;
    constructor(page: BidiPage, context: BrowsingContext, timeoutSettings: TimeoutSettings, parentId?: string | null);
    get client(): CDPSession;
    mainRealm(): Sandbox;
    isolatedRealm(): Sandbox;
    page(): BidiPage;
    url(): string;
    parentFrame(): BidiFrame | null;
    childFrames(): BidiFrame[];
    goto(url: string, options?: {
        referer?: string;
        referrerPolicy?: string;
        timeout?: number;
        waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
    }): Promise<HTTPResponse | null>;
    setContent(html: string, options: {
        timeout?: number;
        waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
    }): Promise<void>;
    context(): BrowsingContext;
    waitForNavigation(options?: {
        timeout?: number;
        waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
    }): Promise<HTTPResponse | null>;
    get detached(): boolean;
    [Symbol.dispose](): void;
    exposeFunction<Args extends unknown[], Ret>(name: string, apply: (...args: Args) => Awaitable<Ret>): Promise<void>;
}
//# sourceMappingURL=Frame.d.ts.map