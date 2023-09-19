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
import * as Bidi from 'chromium-bidi/lib/cjs/protocol/protocol.js';
import Protocol from 'devtools-protocol';
import { ElementHandle } from '../../api/ElementHandle.js';
import { JSHandle } from '../../api/JSHandle.js';
import { Realm } from './Realm.js';
import { Sandbox } from './Sandbox.js';
export declare class BidiJSHandle<T = unknown> extends JSHandle<T> {
    #private;
    constructor(sandbox: Sandbox, remoteValue: Bidi.Script.RemoteValue);
    context(): Realm;
    get realm(): Sandbox;
    get disposed(): boolean;
    jsonValue(): Promise<T>;
    asElement(): ElementHandle<Node> | null;
    dispose(): Promise<void>;
    get isPrimitiveValue(): boolean;
    toString(): string;
    get id(): string | undefined;
    remoteValue(): Bidi.Script.RemoteValue;
    remoteObject(): Protocol.Runtime.RemoteObject;
}
//# sourceMappingURL=JSHandle.d.ts.map