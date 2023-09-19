/**
 * Copyright 2022 Google Inc. All rights reserved.
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
/// <reference types="node" />
import { ChildProcess } from 'child_process';
import * as Bidi from 'chromium-bidi/lib/cjs/protocol/protocol.js';
import { Browser, BrowserCloseCallback, BrowserContextOptions } from '../../api/Browser.js';
import { Page } from '../../api/Page.js';
import { Target } from '../../api/Target.js';
import { Viewport } from '../PuppeteerViewport.js';
import { BidiBrowserContext } from './BrowserContext.js';
import { Connection } from './Connection.js';
import { BidiTarget } from './Target.js';
/**
 * @internal
 */
export declare class BidiBrowser extends Browser {
    #private;
    static readonly subscribeModules: string[];
    static readonly subscribeCdpEvents: Bidi.Cdp.EventNames[];
    static create(opts: Options): Promise<BidiBrowser>;
    constructor(opts: Options & {
        browserName: string;
        browserVersion: string;
    });
    get connection(): Connection;
    wsEndpoint(): string;
    close(): Promise<void>;
    isConnected(): boolean;
    process(): ChildProcess | null;
    createIncognitoBrowserContext(_options?: BrowserContextOptions): Promise<BidiBrowserContext>;
    version(): Promise<string>;
    /**
     * Returns an array of all open browser contexts. In a newly created browser, this will
     * return a single instance of {@link BidiBrowserContext}.
     */
    browserContexts(): BidiBrowserContext[];
    _closeContext(browserContext: BidiBrowserContext): Promise<void>;
    /**
     * Returns the default browser context. The default browser context cannot be closed.
     */
    defaultBrowserContext(): BidiBrowserContext;
    newPage(): Promise<Page>;
    targets(): Target[];
    _getTargetById(id: string): BidiTarget;
    target(): Target;
}
interface Options {
    process?: ChildProcess;
    closeCallback?: BrowserCloseCallback;
    connection: Connection;
    defaultViewport: Viewport | null;
    ignoreHTTPSErrors?: boolean;
}
export {};
//# sourceMappingURL=Browser.d.ts.map