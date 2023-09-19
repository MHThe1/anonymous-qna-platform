"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmulationManager = void 0;
const assert_js_1 = require("../util/assert.js");
const decorators_js_1 = require("../util/decorators.js");
const ErrorLike_js_1 = require("../util/ErrorLike.js");
const Connection_js_1 = require("./Connection.js");
const util_js_1 = require("./util.js");
class EmulatedState {
    #state;
    #clientProvider;
    #updater;
    constructor(initialState, clientProvider, updater) {
        this.#state = initialState;
        this.#clientProvider = clientProvider;
        this.#updater = updater;
    }
    async setState(state) {
        this.#state = state;
        await this.sync();
    }
    async sync() {
        await Promise.all(this.#clientProvider.clients().map(client => {
            return this.#updater(client, this.#state);
        }));
    }
}
/**
 * @internal
 */
let EmulationManager = (() => {
    let _instanceExtraInitializers = [];
    let _private_applyViewport_decorators;
    let _private_applyViewport_descriptor;
    let _private_emulateIdleState_decorators;
    let _private_emulateIdleState_descriptor;
    let _private_emulateTimezone_decorators;
    let _private_emulateTimezone_descriptor;
    let _private_emulateVisionDeficiency_decorators;
    let _private_emulateVisionDeficiency_descriptor;
    let _private_emulateCpuThrottling_decorators;
    let _private_emulateCpuThrottling_descriptor;
    let _private_emulateMediaFeatures_decorators;
    let _private_emulateMediaFeatures_descriptor;
    let _private_emulateMediaType_decorators;
    let _private_emulateMediaType_descriptor;
    let _private_setGeolocation_decorators;
    let _private_setGeolocation_descriptor;
    let _private_setDefaultBackgroundColor_decorators;
    let _private_setDefaultBackgroundColor_descriptor;
    let _private_setJavaScriptEnabled_decorators;
    let _private_setJavaScriptEnabled_descriptor;
    return class EmulationManager {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _private_applyViewport_decorators = [decorators_js_1.invokeAtMostOnceForArguments];
            _private_emulateIdleState_decorators = [decorators_js_1.invokeAtMostOnceForArguments];
            _private_emulateTimezone_decorators = [decorators_js_1.invokeAtMostOnceForArguments];
            _private_emulateVisionDeficiency_decorators = [decorators_js_1.invokeAtMostOnceForArguments];
            _private_emulateCpuThrottling_decorators = [decorators_js_1.invokeAtMostOnceForArguments];
            _private_emulateMediaFeatures_decorators = [decorators_js_1.invokeAtMostOnceForArguments];
            _private_emulateMediaType_decorators = [decorators_js_1.invokeAtMostOnceForArguments];
            _private_setGeolocation_decorators = [decorators_js_1.invokeAtMostOnceForArguments];
            _private_setDefaultBackgroundColor_decorators = [decorators_js_1.invokeAtMostOnceForArguments];
            _private_setJavaScriptEnabled_decorators = [decorators_js_1.invokeAtMostOnceForArguments];
            __esDecorate(this, _private_applyViewport_descriptor = { value: __setFunctionName(async function (client, viewportState) {
                    if (!viewportState.viewport) {
                        return;
                    }
                    const { viewport } = viewportState;
                    const mobile = viewport.isMobile || false;
                    const width = viewport.width;
                    const height = viewport.height;
                    const deviceScaleFactor = viewport.deviceScaleFactor ?? 1;
                    const screenOrientation = viewport.isLandscape
                        ? { angle: 90, type: 'landscapePrimary' }
                        : { angle: 0, type: 'portraitPrimary' };
                    const hasTouch = viewport.hasTouch || false;
                    await Promise.all([
                        client.send('Emulation.setDeviceMetricsOverride', {
                            mobile,
                            width,
                            height,
                            deviceScaleFactor,
                            screenOrientation,
                        }),
                        client.send('Emulation.setTouchEmulationEnabled', {
                            enabled: hasTouch,
                        }),
                    ]);
                }, "#applyViewport") }, _private_applyViewport_decorators, { kind: "method", name: "#applyViewport", static: false, private: true, access: { has: obj => #applyViewport in obj, get: obj => obj.#applyViewport }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_emulateIdleState_descriptor = { value: __setFunctionName(async function (client, idleStateState) {
                    if (!idleStateState.active) {
                        return;
                    }
                    if (idleStateState.overrides) {
                        await client.send('Emulation.setIdleOverride', {
                            isUserActive: idleStateState.overrides.isUserActive,
                            isScreenUnlocked: idleStateState.overrides.isScreenUnlocked,
                        });
                    }
                    else {
                        await client.send('Emulation.clearIdleOverride');
                    }
                }, "#emulateIdleState") }, _private_emulateIdleState_decorators, { kind: "method", name: "#emulateIdleState", static: false, private: true, access: { has: obj => #emulateIdleState in obj, get: obj => obj.#emulateIdleState }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_emulateTimezone_descriptor = { value: __setFunctionName(async function (client, timezoneState) {
                    if (!timezoneState.active) {
                        return;
                    }
                    try {
                        await client.send('Emulation.setTimezoneOverride', {
                            timezoneId: timezoneState.timezoneId || '',
                        });
                    }
                    catch (error) {
                        if ((0, ErrorLike_js_1.isErrorLike)(error) && error.message.includes('Invalid timezone')) {
                            throw new Error(`Invalid timezone ID: ${timezoneState.timezoneId}`);
                        }
                        throw error;
                    }
                }, "#emulateTimezone") }, _private_emulateTimezone_decorators, { kind: "method", name: "#emulateTimezone", static: false, private: true, access: { has: obj => #emulateTimezone in obj, get: obj => obj.#emulateTimezone }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_emulateVisionDeficiency_descriptor = { value: __setFunctionName(async function (client, visionDeficiency) {
                    if (!visionDeficiency.active) {
                        return;
                    }
                    await client.send('Emulation.setEmulatedVisionDeficiency', {
                        type: visionDeficiency.visionDeficiency || 'none',
                    });
                }, "#emulateVisionDeficiency") }, _private_emulateVisionDeficiency_decorators, { kind: "method", name: "#emulateVisionDeficiency", static: false, private: true, access: { has: obj => #emulateVisionDeficiency in obj, get: obj => obj.#emulateVisionDeficiency }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_emulateCpuThrottling_descriptor = { value: __setFunctionName(async function (client, state) {
                    if (!state.active) {
                        return;
                    }
                    await client.send('Emulation.setCPUThrottlingRate', {
                        rate: state.factor ?? 1,
                    });
                }, "#emulateCpuThrottling") }, _private_emulateCpuThrottling_decorators, { kind: "method", name: "#emulateCpuThrottling", static: false, private: true, access: { has: obj => #emulateCpuThrottling in obj, get: obj => obj.#emulateCpuThrottling }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_emulateMediaFeatures_descriptor = { value: __setFunctionName(async function (client, state) {
                    if (!state.active) {
                        return;
                    }
                    await client.send('Emulation.setEmulatedMedia', {
                        features: state.mediaFeatures,
                    });
                }, "#emulateMediaFeatures") }, _private_emulateMediaFeatures_decorators, { kind: "method", name: "#emulateMediaFeatures", static: false, private: true, access: { has: obj => #emulateMediaFeatures in obj, get: obj => obj.#emulateMediaFeatures }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_emulateMediaType_descriptor = { value: __setFunctionName(async function (client, state) {
                    if (!state.active) {
                        return;
                    }
                    await client.send('Emulation.setEmulatedMedia', {
                        media: state.type || '',
                    });
                }, "#emulateMediaType") }, _private_emulateMediaType_decorators, { kind: "method", name: "#emulateMediaType", static: false, private: true, access: { has: obj => #emulateMediaType in obj, get: obj => obj.#emulateMediaType }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_setGeolocation_descriptor = { value: __setFunctionName(async function (client, state) {
                    if (!state.active) {
                        return;
                    }
                    await client.send('Emulation.setGeolocationOverride', state.geoLocation
                        ? {
                            longitude: state.geoLocation.longitude,
                            latitude: state.geoLocation.latitude,
                            accuracy: state.geoLocation.accuracy,
                        }
                        : undefined);
                }, "#setGeolocation") }, _private_setGeolocation_decorators, { kind: "method", name: "#setGeolocation", static: false, private: true, access: { has: obj => #setGeolocation in obj, get: obj => obj.#setGeolocation }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_setDefaultBackgroundColor_descriptor = { value: __setFunctionName(async function (client, state) {
                    if (!state.active) {
                        return;
                    }
                    await client.send('Emulation.setDefaultBackgroundColorOverride', {
                        color: state.color,
                    });
                }, "#setDefaultBackgroundColor") }, _private_setDefaultBackgroundColor_decorators, { kind: "method", name: "#setDefaultBackgroundColor", static: false, private: true, access: { has: obj => #setDefaultBackgroundColor in obj, get: obj => obj.#setDefaultBackgroundColor }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_setJavaScriptEnabled_descriptor = { value: __setFunctionName(async function (client, state) {
                    if (!state.active) {
                        return;
                    }
                    await client.send('Emulation.setScriptExecutionDisabled', {
                        value: !state.javaScriptEnabled,
                    });
                }, "#setJavaScriptEnabled") }, _private_setJavaScriptEnabled_decorators, { kind: "method", name: "#setJavaScriptEnabled", static: false, private: true, access: { has: obj => #setJavaScriptEnabled in obj, get: obj => obj.#setJavaScriptEnabled }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #client = (__runInitializers(this, _instanceExtraInitializers), void 0);
        #emulatingMobile = false;
        #hasTouch = false;
        #viewportState = new EmulatedState({
            active: false,
        }, this, this.#applyViewport);
        #idleOverridesState = {
            active: false,
        };
        #timezoneState = {
            active: false,
        };
        #visionDeficiencyState = {
            active: false,
        };
        #cpuThrottlingState = {
            active: false,
        };
        #mediaFeaturesState = {
            active: false,
        };
        #mediaTypeState = {
            active: false,
        };
        #geoLocationState = {
            active: false,
        };
        #defaultBackgroundColorState = {
            active: false,
        };
        #javascriptEnabledState = {
            javaScriptEnabled: true,
            active: false,
        };
        #secondaryClients = new Set();
        constructor(client) {
            this.#client = client;
        }
        updateClient(client) {
            this.#client = client;
            this.#secondaryClients.delete(client);
        }
        async registerSpeculativeSession(client) {
            this.#secondaryClients.add(client);
            client.once(Connection_js_1.CDPSessionEmittedEvents.Disconnected, () => {
                return this.#secondaryClients.delete(client);
            });
            // We don't await here because we want to register all state changes before
            // the target is unpaused.
            void this.#viewportState.sync().catch(util_js_1.debugError);
            void this.#syncIdleState().catch(util_js_1.debugError);
            void this.#syncTimezoneState().catch(util_js_1.debugError);
            void this.#syncVisionDeficiencyState().catch(util_js_1.debugError);
            void this.#syncCpuThrottlingState().catch(util_js_1.debugError);
            void this.#syncMediaFeaturesState().catch(util_js_1.debugError);
            void this.#syncMediaTypeState().catch(util_js_1.debugError);
            void this.#syncGeoLocationState().catch(util_js_1.debugError);
            void this.#syncDefaultBackgroundColorState().catch(util_js_1.debugError);
            void this.#syncJavaScriptEnabledState().catch(util_js_1.debugError);
        }
        get javascriptEnabled() {
            return this.#javascriptEnabledState.javaScriptEnabled;
        }
        clients() {
            return [this.#client, ...Array.from(this.#secondaryClients)];
        }
        async emulateViewport(viewport) {
            await this.#viewportState.setState({
                viewport,
                active: true,
            });
            const mobile = viewport.isMobile || false;
            const hasTouch = viewport.hasTouch || false;
            const reloadNeeded = this.#emulatingMobile !== mobile || this.#hasTouch !== hasTouch;
            this.#emulatingMobile = mobile;
            this.#hasTouch = hasTouch;
            return reloadNeeded;
        }
        get #applyViewport() { return _private_applyViewport_descriptor.value; }
        async emulateIdleState(overrides) {
            this.#idleOverridesState = {
                active: true,
                overrides,
            };
            await this.#syncIdleState();
        }
        async #syncIdleState() {
            await Promise.all([
                this.#emulateIdleState(this.#client, this.#idleOverridesState),
                ...Array.from(this.#secondaryClients).map(client => {
                    return this.#emulateIdleState(client, this.#idleOverridesState);
                }),
            ]);
        }
        get #emulateIdleState() { return _private_emulateIdleState_descriptor.value; }
        get #emulateTimezone() { return _private_emulateTimezone_descriptor.value; }
        async #syncTimezoneState() {
            await Promise.all([
                this.#emulateTimezone(this.#client, this.#timezoneState),
                ...Array.from(this.#secondaryClients).map(client => {
                    return this.#emulateTimezone(client, this.#timezoneState);
                }),
            ]);
        }
        async emulateTimezone(timezoneId) {
            this.#timezoneState = {
                timezoneId,
                active: true,
            };
            await this.#syncTimezoneState();
        }
        get #emulateVisionDeficiency() { return _private_emulateVisionDeficiency_descriptor.value; }
        async #syncVisionDeficiencyState() {
            await Promise.all([
                this.#emulateVisionDeficiency(this.#client, this.#visionDeficiencyState),
                ...Array.from(this.#secondaryClients).map(client => {
                    return this.#emulateVisionDeficiency(client, this.#visionDeficiencyState);
                }),
            ]);
        }
        async emulateVisionDeficiency(type) {
            const visionDeficiencies = new Set([
                'none',
                'achromatopsia',
                'blurredVision',
                'deuteranopia',
                'protanopia',
                'tritanopia',
            ]);
            (0, assert_js_1.assert)(!type || visionDeficiencies.has(type), `Unsupported vision deficiency: ${type}`);
            this.#visionDeficiencyState = {
                active: true,
                visionDeficiency: type,
            };
            await this.#syncVisionDeficiencyState();
        }
        get #emulateCpuThrottling() { return _private_emulateCpuThrottling_descriptor.value; }
        async #syncCpuThrottlingState() {
            await Promise.all([
                this.#emulateCpuThrottling(this.#client, this.#cpuThrottlingState),
                ...Array.from(this.#secondaryClients).map(client => {
                    return this.#emulateCpuThrottling(client, this.#cpuThrottlingState);
                }),
            ]);
        }
        async emulateCPUThrottling(factor) {
            (0, assert_js_1.assert)(factor === null || factor >= 1, 'Throttling rate should be greater or equal to 1');
            this.#cpuThrottlingState = {
                active: true,
                factor: factor ?? undefined,
            };
            await this.#syncCpuThrottlingState();
        }
        get #emulateMediaFeatures() { return _private_emulateMediaFeatures_descriptor.value; }
        async #syncMediaFeaturesState() {
            await Promise.all([
                this.#emulateMediaFeatures(this.#client, this.#mediaFeaturesState),
                ...Array.from(this.#secondaryClients).map(client => {
                    return this.#emulateMediaFeatures(client, this.#mediaFeaturesState);
                }),
            ]);
        }
        async emulateMediaFeatures(features) {
            if (Array.isArray(features)) {
                for (const mediaFeature of features) {
                    const name = mediaFeature.name;
                    (0, assert_js_1.assert)(/^(?:prefers-(?:color-scheme|reduced-motion)|color-gamut)$/.test(name), 'Unsupported media feature: ' + name);
                }
            }
            this.#mediaFeaturesState = {
                active: true,
                mediaFeatures: features,
            };
            await this.#syncMediaFeaturesState();
        }
        get #emulateMediaType() { return _private_emulateMediaType_descriptor.value; }
        async #syncMediaTypeState() {
            await Promise.all([
                this.#emulateMediaType(this.#client, this.#mediaTypeState),
                ...Array.from(this.#secondaryClients).map(client => {
                    return this.#emulateMediaType(client, this.#mediaTypeState);
                }),
            ]);
        }
        async emulateMediaType(type) {
            (0, assert_js_1.assert)(type === 'screen' ||
                type === 'print' ||
                (type ?? undefined) === undefined, 'Unsupported media type: ' + type);
            this.#mediaTypeState = {
                type,
                active: true,
            };
            await this.#syncMediaTypeState();
        }
        get #setGeolocation() { return _private_setGeolocation_descriptor.value; }
        async #syncGeoLocationState() {
            await Promise.all([
                this.#setGeolocation(this.#client, this.#geoLocationState),
                ...Array.from(this.#secondaryClients).map(client => {
                    return this.#setGeolocation(client, this.#geoLocationState);
                }),
            ]);
        }
        async setGeolocation(options) {
            const { longitude, latitude, accuracy = 0 } = options;
            if (longitude < -180 || longitude > 180) {
                throw new Error(`Invalid longitude "${longitude}": precondition -180 <= LONGITUDE <= 180 failed.`);
            }
            if (latitude < -90 || latitude > 90) {
                throw new Error(`Invalid latitude "${latitude}": precondition -90 <= LATITUDE <= 90 failed.`);
            }
            if (accuracy < 0) {
                throw new Error(`Invalid accuracy "${accuracy}": precondition 0 <= ACCURACY failed.`);
            }
            this.#geoLocationState = {
                active: true,
                geoLocation: {
                    longitude,
                    latitude,
                    accuracy,
                },
            };
            await this.#syncGeoLocationState();
        }
        get #setDefaultBackgroundColor() { return _private_setDefaultBackgroundColor_descriptor.value; }
        async #syncDefaultBackgroundColorState() {
            await Promise.all([
                this.#setDefaultBackgroundColor(this.#client, this.#defaultBackgroundColorState),
                ...Array.from(this.#secondaryClients).map(client => {
                    return this.#setDefaultBackgroundColor(client, this.#defaultBackgroundColorState);
                }),
            ]);
        }
        /**
         * Resets default white background
         */
        async resetDefaultBackgroundColor() {
            this.#defaultBackgroundColorState = {
                active: true,
                color: undefined,
            };
            await this.#syncDefaultBackgroundColorState();
        }
        /**
         * Hides default white background
         */
        async setTransparentBackgroundColor() {
            this.#defaultBackgroundColorState = {
                active: true,
                color: { r: 0, g: 0, b: 0, a: 0 },
            };
            await this.#syncDefaultBackgroundColorState();
        }
        get #setJavaScriptEnabled() { return _private_setJavaScriptEnabled_descriptor.value; }
        async #syncJavaScriptEnabledState() {
            await Promise.all([
                this.#setJavaScriptEnabled(this.#client, this.#javascriptEnabledState),
                ...Array.from(this.#secondaryClients).map(client => {
                    return this.#setJavaScriptEnabled(client, this.#javascriptEnabledState);
                }),
            ]);
        }
        async setJavaScriptEnabled(enabled) {
            this.#javascriptEnabledState = {
                active: true,
                javaScriptEnabled: enabled,
            };
            await this.#syncJavaScriptEnabledState();
        }
    };
})();
exports.EmulationManager = EmulationManager;
//# sourceMappingURL=EmulationManager.js.map