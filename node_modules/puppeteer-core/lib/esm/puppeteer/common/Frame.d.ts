/**
 * Copyright 2017 Google Inc. All rights reserved.
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
import { Frame } from '../api/Frame.js';
import { HTTPResponse } from '../api/HTTPResponse.js';
import { Page, WaitTimeoutOptions } from '../api/Page.js';
import { CDPSession } from './Connection.js';
import { DeviceRequestPrompt } from './DeviceRequestPrompt.js';
import { FrameManager } from './FrameManager.js';
import { IsolatedWorld } from './IsolatedWorld.js';
import { PuppeteerLifeCycleEvent } from './LifecycleWatcher.js';
/**
 * We use symbols to prevent external parties listening to these events.
 * They are internal to Puppeteer.
 *
 * @internal
 */
export declare const FrameEmittedEvents: {
    FrameNavigated: symbol;
    FrameSwapped: symbol;
    LifecycleEvent: symbol;
    FrameNavigatedWithinDocument: symbol;
    FrameDetached: symbol;
    FrameSwappedByActivation: symbol;
};
/**
 * @internal
 */
export declare class CDPFrame extends Frame {
    #private;
    _frameManager: FrameManager;
    _id: string;
    _loaderId: string;
    _lifecycleEvents: Set<string>;
    _parentId?: string;
    constructor(frameManager: FrameManager, frameId: string, parentFrameId: string | undefined, client: CDPSession);
    /**
     * Updates the frame ID with the new ID. This happens when the main frame is
     * replaced by a different frame.
     */
    updateId(id: string): void;
    updateClient(client: CDPSession, keepWorlds?: boolean): void;
    page(): Page;
    isOOPFrame(): boolean;
    goto(url: string, options?: {
        referer?: string;
        referrerPolicy?: string;
        timeout?: number;
        waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
    }): Promise<HTTPResponse | null>;
    waitForNavigation(options?: {
        timeout?: number;
        waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
    }): Promise<HTTPResponse | null>;
    get client(): CDPSession;
    mainRealm(): IsolatedWorld;
    isolatedRealm(): IsolatedWorld;
    setContent(html: string, options?: {
        timeout?: number;
        waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
    }): Promise<void>;
    url(): string;
    parentFrame(): CDPFrame | null;
    childFrames(): CDPFrame[];
    waitForDevicePrompt(options?: WaitTimeoutOptions): Promise<DeviceRequestPrompt>;
    _navigated(framePayload: Protocol.Page.Frame): void;
    _navigatedWithinDocument(url: string): void;
    _onLifecycleEvent(loaderId: string, name: string): void;
    _onLoadingStopped(): void;
    _onLoadingStarted(): void;
    get detached(): boolean;
    [Symbol.dispose](): void;
}
//# sourceMappingURL=Frame.d.ts.map