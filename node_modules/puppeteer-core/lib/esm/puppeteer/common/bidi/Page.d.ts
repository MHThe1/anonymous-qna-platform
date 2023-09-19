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
/// <reference types="node" />
import type { Readable } from 'stream';
import Protocol from 'devtools-protocol';
import { GeolocationOptions, MediaFeature, NewDocumentScriptEvaluation, Page, ScreenshotOptions, WaitForOptions } from '../../api/Page.js';
import { Accessibility } from '../Accessibility.js';
import { CDPSession } from '../Connection.js';
import { Coverage } from '../Coverage.js';
import { PDFOptions } from '../PDFOptions.js';
import { Viewport } from '../PuppeteerViewport.js';
import { Tracing } from '../Tracing.js';
import { Awaitable } from '../types.js';
import { BidiBrowser } from './Browser.js';
import { BidiBrowserContext } from './BrowserContext.js';
import { BrowsingContext } from './BrowsingContext.js';
import { BidiFrame } from './Frame.js';
import { HTTPRequest } from './HTTPRequest.js';
import { HTTPResponse } from './HTTPResponse.js';
import { Keyboard, Mouse, Touchscreen } from './Input.js';
/**
 * @internal
 */
export declare class BidiPage extends Page {
    #private;
    _client(): CDPSession;
    constructor(browsingContext: BrowsingContext, browserContext: BidiBrowserContext);
    _setBrowserContext(browserContext: BidiBrowserContext): void;
    get accessibility(): Accessibility;
    get tracing(): Tracing;
    get coverage(): Coverage;
    get mouse(): Mouse;
    get touchscreen(): Touchscreen;
    get keyboard(): Keyboard;
    browser(): BidiBrowser;
    browserContext(): BidiBrowserContext;
    mainFrame(): BidiFrame;
    frames(): BidiFrame[];
    frame(frameId?: string): BidiFrame | null;
    childFrames(frameId: string): BidiFrame[];
    getNavigationResponse(id: string | null): HTTPResponse | null;
    isClosed(): boolean;
    close(): Promise<void>;
    reload(options?: WaitForOptions): Promise<HTTPResponse | null>;
    setDefaultNavigationTimeout(timeout: number): void;
    setDefaultTimeout(timeout: number): void;
    getDefaultTimeout(): number;
    isJavaScriptEnabled(): boolean;
    setGeolocation(options: GeolocationOptions): Promise<void>;
    setJavaScriptEnabled(enabled: boolean): Promise<void>;
    emulateMediaType(type?: string): Promise<void>;
    emulateCPUThrottling(factor: number | null): Promise<void>;
    emulateMediaFeatures(features?: MediaFeature[]): Promise<void>;
    emulateTimezone(timezoneId?: string): Promise<void>;
    emulateIdleState(overrides?: {
        isUserActive: boolean;
        isScreenUnlocked: boolean;
    }): Promise<void>;
    emulateVisionDeficiency(type?: Protocol.Emulation.SetEmulatedVisionDeficiencyRequest['type']): Promise<void>;
    setViewport(viewport: Viewport): Promise<void>;
    viewport(): Viewport | null;
    pdf(options?: PDFOptions): Promise<Buffer>;
    createPDFStream(options?: PDFOptions | undefined): Promise<Readable>;
    screenshot(options: ScreenshotOptions & {
        encoding: 'base64';
    }): Promise<string>;
    screenshot(options?: ScreenshotOptions & {
        encoding?: 'binary';
    }): never;
    waitForRequest(urlOrPredicate: string | ((req: HTTPRequest) => boolean | Promise<boolean>), options?: {
        timeout?: number;
    }): Promise<HTTPRequest>;
    waitForResponse(urlOrPredicate: string | ((res: HTTPResponse) => boolean | Promise<boolean>), options?: {
        timeout?: number;
    }): Promise<HTTPResponse>;
    waitForNetworkIdle(options?: {
        idleTime?: number;
        timeout?: number;
    }): Promise<void>;
    createCDPSession(): Promise<CDPSession>;
    bringToFront(): Promise<void>;
    evaluateOnNewDocument<Params extends unknown[], Func extends (...args: Params) => unknown = (...args: Params) => unknown>(pageFunction: Func | string, ...args: Params): Promise<NewDocumentScriptEvaluation>;
    removeScriptToEvaluateOnNewDocument(id: string): Promise<void>;
    exposeFunction<Args extends unknown[], Ret>(name: string, pptrFunction: ((...args: Args) => Awaitable<Ret>) | {
        default: (...args: Args) => Awaitable<Ret>;
    }): Promise<void>;
}
//# sourceMappingURL=Page.d.ts.map