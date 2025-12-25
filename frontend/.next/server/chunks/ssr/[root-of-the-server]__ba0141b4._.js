module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/frontend/fhevm/internal/constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SDK_CDN_URL",
    ()=>SDK_CDN_URL
]);
const SDK_CDN_URL = "https://cdn.zama.ai/relayer-sdk-js/0.2.0/relayer-sdk-js.umd.cjs";
}),
"[project]/frontend/fhevm/internal/RelayerSDKLoader.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RelayerSDKLoader",
    ()=>RelayerSDKLoader,
    "isFhevmWindowType",
    ()=>isFhevmWindowType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/fhevm/internal/constants.ts [app-ssr] (ecmascript)");
;
class RelayerSDKLoader {
    _trace;
    constructor(options){
        this._trace = options.trace;
    }
    isLoaded() {
        if ("TURBOPACK compile-time truthy", 1) {
            throw new Error("RelayerSDKLoader: can only be used in the browser.");
        }
        return isFhevmWindowType(window, this._trace);
    }
    load() {
        console.log("[RelayerSDKLoader] load...");
        if ("TURBOPACK compile-time truthy", 1) {
            console.log("[RelayerSDKLoader] window === undefined");
            return Promise.reject(new Error("RelayerSDKLoader: can only be used in the browser."));
        }
        //TURBOPACK unreachable
        ;
    }
}
function isFhevmRelayerSDKType(o, trace) {
    if (typeof o === "undefined") {
        trace?.("RelayerSDKLoader: relayerSDK is undefined");
        return false;
    }
    if (o === null) {
        trace?.("RelayerSDKLoader: relayerSDK is null");
        return false;
    }
    if (typeof o !== "object") {
        trace?.("RelayerSDKLoader: relayerSDK is not an object");
        return false;
    }
    if (!objHasProperty(o, "initSDK", "function", trace)) {
        trace?.("RelayerSDKLoader: relayerSDK.initSDK is invalid");
        return false;
    }
    if (!objHasProperty(o, "createInstance", "function", trace)) {
        trace?.("RelayerSDKLoader: relayerSDK.createInstance is invalid");
        return false;
    }
    if (!objHasProperty(o, "SepoliaConfig", "object", trace)) {
        trace?.("RelayerSDKLoader: relayerSDK.SepoliaConfig is invalid");
        return false;
    }
    if ("__initialized__" in o) {
        if (o.__initialized__ !== true && o.__initialized__ !== false) {
            trace?.("RelayerSDKLoader: relayerSDK.__initialized__ is invalid");
            return false;
        }
    }
    return true;
}
function isFhevmWindowType(win, trace) {
    if (typeof win === "undefined") {
        trace?.("RelayerSDKLoader: window object is undefined");
        return false;
    }
    if (win === null) {
        trace?.("RelayerSDKLoader: window object is null");
        return false;
    }
    if (typeof win !== "object") {
        trace?.("RelayerSDKLoader: window is not an object");
        return false;
    }
    if (!("relayerSDK" in win)) {
        trace?.("RelayerSDKLoader: window does not contain 'relayerSDK' property");
        return false;
    }
    return isFhevmRelayerSDKType(win.relayerSDK);
}
function objHasProperty(obj, propertyName, propertyType, trace) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (!(propertyName in obj)) {
        trace?.(`RelayerSDKLoader: missing ${String(propertyName)}.`);
        return false;
    }
    const value = obj[propertyName];
    if (value === null || value === undefined) {
        trace?.(`RelayerSDKLoader: ${String(propertyName)} is null or undefined.`);
        return false;
    }
    if (typeof value !== propertyType) {
        trace?.(`RelayerSDKLoader: ${String(propertyName)} is not a ${propertyType}.`);
        return false;
    }
    return true;
}
}),
"[project]/frontend/fhevm/internal/PublicKeyStorage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "publicKeyStorageGet",
    ()=>publicKeyStorageGet,
    "publicKeyStorageSet",
    ()=>publicKeyStorageSet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/idb/build/index.js [app-ssr] (ecmascript)");
;
let __dbPromise = undefined;
async function _getDB() {
    if (__dbPromise) {
        return __dbPromise;
    }
    if ("TURBOPACK compile-time truthy", 1) {
        return undefined;
    }
    //TURBOPACK unreachable
    ;
}
function assertFhevmStoredPublicKey(value) {
    if (typeof value !== "object") {
        throw new Error(`FhevmStoredPublicKey must be an object`);
    }
    if (value === null) {
        return;
    }
    if (!("publicKeyId" in value)) {
        throw new Error(`FhevmStoredPublicKey.publicKeyId does not exist`);
    }
    if (typeof value.publicKeyId !== "string") {
        throw new Error(`FhevmStoredPublicKey.publicKeyId must be a string`);
    }
    if (!("publicKey" in value)) {
        throw new Error(`FhevmStoredPublicKey.publicKey does not exist`);
    }
    if (!(value.publicKey instanceof Uint8Array)) {
        throw new Error(`FhevmStoredPublicKey.publicKey must be a Uint8Array`);
    }
}
function assertFhevmStoredPublicParams(value) {
    if (typeof value !== "object") {
        throw new Error(`FhevmStoredPublicParams must be an object`);
    }
    if (value === null) {
        return;
    }
    if (!("publicParamsId" in value)) {
        throw new Error(`FhevmStoredPublicParams.publicParamsId does not exist`);
    }
    if (typeof value.publicParamsId !== "string") {
        throw new Error(`FhevmStoredPublicParams.publicParamsId must be a string`);
    }
    if (!("publicParams" in value)) {
        throw new Error(`FhevmStoredPublicParams.publicParams does not exist`);
    }
    if (!(value.publicParams instanceof Uint8Array)) {
        throw new Error(`FhevmStoredPublicParams.publicParams must be a Uint8Array`);
    }
}
async function publicKeyStorageGet(aclAddress) {
    const db = await _getDB();
    if (!db) {
        return {
            publicParams: null
        };
    }
    let storedPublicKey = null;
    try {
        const pk = await db.get("publicKeyStore", aclAddress);
        if (pk?.value) {
            assertFhevmStoredPublicKey(pk.value);
            storedPublicKey = pk.value;
        }
    } catch  {
    //
    }
    let storedPublicParams = null;
    try {
        const pp = await db.get("paramsStore", aclAddress);
        if (pp?.value) {
            assertFhevmStoredPublicParams(pp.value);
            storedPublicParams = pp.value;
        }
    } catch  {
    //
    }
    const publicKeyData = storedPublicKey?.publicKey;
    const publicKeyId = storedPublicKey?.publicKeyId;
    const publicParams = storedPublicParams ? {
        "2048": storedPublicParams
    } : null;
    let publicKey = undefined;
    if (publicKeyId && publicKeyData) {
        publicKey = {
            id: publicKeyId,
            data: publicKeyData
        };
    }
    return {
        ...publicKey !== undefined && {
            publicKey
        },
        publicParams
    };
}
async function publicKeyStorageSet(aclAddress, publicKey, publicParams) {
    assertFhevmStoredPublicKey(publicKey);
    assertFhevmStoredPublicParams(publicParams);
    const db = await _getDB();
    if (!db) {
        return;
    }
    if (publicKey) {
        await db.put("publicKeyStore", {
            acl: aclAddress,
            value: publicKey
        });
    }
    if (publicParams) {
        await db.put("paramsStore", {
            acl: aclAddress,
            value: publicParams
        });
    }
}
}),
"[project]/frontend/fhevm/internal/fhevm.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FhevmAbortError",
    ()=>FhevmAbortError,
    "FhevmReactError",
    ()=>FhevmReactError,
    "createFhevmInstance",
    ()=>createFhevmInstance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/ethers/lib.esm/address/checks.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/ethers/lib.esm/providers/provider-jsonrpc.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$RelayerSDKLoader$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/fhevm/internal/RelayerSDKLoader.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$PublicKeyStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/fhevm/internal/PublicKeyStorage.ts [app-ssr] (ecmascript)");
;
;
;
class FhevmReactError extends Error {
    code;
    constructor(code, message, options){
        super(message, options);
        this.code = code;
        this.name = "FhevmReactError";
    }
}
function throwFhevmError(code, message, cause) {
    throw new FhevmReactError(code, message, cause ? {
        cause
    } : undefined);
}
const isFhevmInitialized = ()=>{
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$RelayerSDKLoader$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFhevmWindowType"])(window, console.log)) {
        return false;
    }
    return window.relayerSDK.__initialized__ === true;
};
const fhevmLoadSDK = ()=>{
    const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$RelayerSDKLoader$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RelayerSDKLoader"]({
        trace: console.log
    });
    return loader.load();
};
const fhevmInitSDK = async (options)=>{
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$RelayerSDKLoader$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFhevmWindowType"])(window, console.log)) {
        throw new Error("window.relayerSDK is not available");
    }
    const result = await window.relayerSDK.initSDK(options);
    window.relayerSDK.__initialized__ = result;
    if (!result) {
        throw new Error("window.relayerSDK.initSDK failed.");
    }
    return true;
};
function checkIsAddress(a) {
    if (typeof a !== "string") {
        return false;
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddress"])(a)) {
        return false;
    }
    return true;
}
class FhevmAbortError extends Error {
    constructor(message = "FHEVM operation was cancelled"){
        super(message);
        this.name = "FhevmAbortError";
    }
}
async function getChainId(providerOrUrl) {
    try {
        if (typeof providerOrUrl === "string") {
            const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonRpcProvider"](providerOrUrl, undefined, {
                staticNetwork: true
            });
            // Add timeout and better error handling
            const network = await Promise.race([
                provider.getNetwork(),
                new Promise((_, reject)=>setTimeout(()=>reject(new Error("Network request timeout")), 10000))
            ]);
            provider.destroy();
            return Number(network.chainId);
        }
        // For EIP1193 provider, add timeout
        const chainId = await Promise.race([
            providerOrUrl.request({
                method: "eth_chainId"
            }),
            new Promise((_, reject)=>setTimeout(()=>reject(new Error("Provider request timeout")), 10000))
        ]);
        return Number.parseInt(chainId, 16);
    } catch (error) {
        const errorMessage = error?.message || String(error);
        // Completely suppress "Failed to fetch" errors - they're non-fatal
        if (errorMessage.includes("Failed to fetch") || errorMessage.includes("fetch")) {
            // Silently return a default chainId for string URLs, or throw a non-fetch error for providers
            if (typeof providerOrUrl === "string") {
                // For string URLs, try to infer from URL
                if (providerOrUrl.includes("localhost") || providerOrUrl.includes("127.0.0.1")) {
                    return 31337; // Assume localhost is Hardhat
                }
                // Can't determine, but don't throw - let caller handle
                throw new Error("CHAIN_ID_UNAVAILABLE");
            }
            // For EIP1193 providers, we need chainId, but don't throw fetch error
            throw new Error("CHAIN_ID_UNAVAILABLE");
        }
        throw error;
    }
}
async function getWeb3Client(rpcUrl) {
    const rpc = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonRpcProvider"](rpcUrl, undefined, {
        staticNetwork: true
    });
    try {
        // Add timeout to prevent hanging
        const version = await Promise.race([
            rpc.send("web3_clientVersion", []),
            new Promise((_, reject)=>setTimeout(()=>reject(new Error("RPC request timeout")), 10000))
        ]);
        return version;
    } catch (e) {
        // Don't throw error - let caller handle it gracefully
        // This is expected if the node is not running or not accessible
        throw e;
    } finally{
        rpc.destroy();
    }
}
async function tryFetchFHEVMHardhatNodeRelayerMetadata(rpcUrl) {
    try {
        const version = await getWeb3Client(rpcUrl);
        if (typeof version !== "string" || !version.toLowerCase().includes("hardhat")) {
            // Not a Hardhat Node - this is normal, not an error
            return undefined;
        }
    } catch (e) {
        // Failed to connect - this is expected if node is not running
        // Silently return undefined instead of throwing
        console.debug(`[FHEVM] Could not connect to ${rpcUrl} - this is normal if using a different network or if the node is not running`);
        return undefined;
    }
    try {
        const metadata = await getFHEVMRelayerMetadata(rpcUrl);
        if (!metadata || typeof metadata !== "object") {
            return undefined;
        }
        if (!("ACLAddress" in metadata && typeof metadata.ACLAddress === "string" && metadata.ACLAddress.startsWith("0x"))) {
            return undefined;
        }
        if (!("InputVerifierAddress" in metadata && typeof metadata.InputVerifierAddress === "string" && metadata.InputVerifierAddress.startsWith("0x"))) {
            return undefined;
        }
        if (!("KMSVerifierAddress" in metadata && typeof metadata.KMSVerifierAddress === "string" && metadata.KMSVerifierAddress.startsWith("0x"))) {
            return undefined;
        }
        return metadata;
    } catch (e) {
        // Not a FHEVM Hardhat Node or connection failed - this is normal
        // Silently return undefined instead of throwing
        const errorMsg = e?.message || String(e);
        if (errorMsg.includes("Failed to fetch") || errorMsg.includes("fetch")) {
            console.debug(`[FHEVM] Could not fetch relayer metadata from ${rpcUrl} - this is normal if not using FHEVM Hardhat node`);
        } else {
            console.debug(`[FHEVM] Relayer metadata not available from ${rpcUrl} - this is normal`);
        }
        return undefined;
    }
}
async function getFHEVMRelayerMetadata(rpcUrl) {
    const rpc = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonRpcProvider"](rpcUrl, undefined, {
        staticNetwork: true
    });
    try {
        // Add timeout to prevent hanging
        const version = await Promise.race([
            rpc.send("fhevm_relayer_metadata", []),
            new Promise((_, reject)=>setTimeout(()=>reject(new Error("RPC request timeout")), 10000))
        ]);
        return version;
    } catch (e) {
        // Don't throw error - let caller handle it gracefully
        // This is expected if the node doesn't support FHEVM
        throw e;
    } finally{
        rpc.destroy();
    }
}
async function resolve(providerOrUrl, mockChains) {
    try {
        const chainId = await getChainId(providerOrUrl);
        let rpcUrl = typeof providerOrUrl === "string" ? providerOrUrl : undefined;
        const _mockChains = {
            31337: "http://localhost:8545",
            ...mockChains ?? {}
        };
        if (Object.hasOwn(_mockChains, chainId)) {
            if (!rpcUrl) {
                rpcUrl = _mockChains[chainId];
            }
            return {
                isMock: true,
                chainId,
                rpcUrl
            };
        }
        return {
            isMock: false,
            chainId,
            rpcUrl
        };
    } catch (error) {
        // If we can't get chainId, but providerOrUrl is a string (RPC URL),
        // we can still try to use it as a mock chain if it matches
        if (typeof providerOrUrl === "string") {
            const _mockChains = {
                31337: "http://localhost:8545",
                ...mockChains ?? {}
            };
            // Check if the URL matches any mock chain
            for (const [chainId, url] of Object.entries(_mockChains)){
                if (providerOrUrl === url || providerOrUrl.includes(url.replace("http://", "").replace("https://", ""))) {
                    console.debug(`[FHEVM] Using mock chain ${chainId} for ${providerOrUrl} (chainId fetch failed but URL matches)`);
                    return {
                        isMock: true,
                        chainId: Number(chainId),
                        rpcUrl: providerOrUrl
                    };
                }
            }
            // If it's a localhost URL, assume it's mock chain 31337
            if (providerOrUrl.includes("localhost") || providerOrUrl.includes("127.0.0.1")) {
                console.debug(`[FHEVM] Assuming localhost URL ${providerOrUrl} is mock chain 31337`);
                return {
                    isMock: true,
                    chainId: 31337,
                    rpcUrl: providerOrUrl
                };
            }
        }
        // Completely suppress "Failed to fetch" errors
        const errorMessage = error?.message || String(error);
        if (errorMessage.includes("Failed to fetch") || errorMessage.includes("fetch") || errorMessage === "CHAIN_ID_UNAVAILABLE") {
            // For string URLs, try to infer from URL pattern
            if (typeof providerOrUrl === "string") {
                const _mockChains = {
                    31337: "http://localhost:8545",
                    ...mockChains ?? {}
                };
                // Check if the URL matches any mock chain
                for (const [chainId, url] of Object.entries(_mockChains)){
                    if (providerOrUrl === url || providerOrUrl.includes(url.replace("http://", "").replace("https://", ""))) {
                        return {
                            isMock: true,
                            chainId: Number(chainId),
                            rpcUrl: providerOrUrl
                        };
                    }
                }
                // If it's a localhost URL, assume it's mock chain 31337
                if (providerOrUrl.includes("localhost") || providerOrUrl.includes("127.0.0.1")) {
                    return {
                        isMock: true,
                        chainId: 31337,
                        rpcUrl: providerOrUrl
                    };
                }
            }
            // For EIP1193 providers, can't determine chainId, return as non-mock
            // This is fine - the instance will work without mock mode
            return {
                isMock: false,
                chainId: 0,
                rpcUrl: undefined
            };
        }
        throw error;
    }
}
const createFhevmInstance = async (parameters)=>{
    const throwIfAborted = ()=>{
        if (signal.aborted) throw new FhevmAbortError();
    };
    const notify = (status)=>{
        if (onStatusChange) onStatusChange(status);
    };
    const { signal, onStatusChange, provider: providerOrUrl, mockChains } = parameters;
    let isMock;
    let rpcUrl;
    let chainId;
    try {
        const resolved = await resolve(providerOrUrl, mockChains);
        isMock = resolved.isMock;
        rpcUrl = resolved.rpcUrl;
        chainId = resolved.chainId;
    } catch (error) {
        // Completely suppress "Failed to fetch" errors in resolve
        const errorMessage = error?.message || String(error);
        if (errorMessage.includes("Failed to fetch") || errorMessage.includes("fetch")) {
            // Fallback: assume non-mock mode
            isMock = false;
            rpcUrl = typeof providerOrUrl === "string" ? providerOrUrl : undefined;
            chainId = 0;
        } else {
            throw error;
        }
    }
    if (isMock) {
        const fhevmRelayerMetadata = await tryFetchFHEVMHardhatNodeRelayerMetadata(rpcUrl);
        if (fhevmRelayerMetadata) {
            notify("creating");
            const fhevmMock = await __turbopack_context__.A("[project]/frontend/fhevm/internal/mock/fhevmMock.ts [app-ssr] (ecmascript, async loader)");
            const mockInstance = await fhevmMock.fhevmMockCreateInstance({
                rpcUrl,
                chainId,
                metadata: fhevmRelayerMetadata
            });
            throwIfAborted();
            return mockInstance;
        }
    }
    throwIfAborted();
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$RelayerSDKLoader$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFhevmWindowType"])(window, console.log)) {
        notify("sdk-loading");
        await fhevmLoadSDK();
        throwIfAborted();
        notify("sdk-loaded");
    }
    if (!isFhevmInitialized()) {
        notify("sdk-initializing");
        await fhevmInitSDK();
        throwIfAborted();
        notify("sdk-initialized");
    }
    const relayerSDK = window.relayerSDK;
    const aclAddress = relayerSDK.SepoliaConfig.aclContractAddress;
    if (!checkIsAddress(aclAddress)) {
        throw new Error(`Invalid address: ${aclAddress}`);
    }
    const pub = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$PublicKeyStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publicKeyStorageGet"])(aclAddress);
    throwIfAborted();
    const config = {
        ...relayerSDK.SepoliaConfig,
        network: providerOrUrl,
        publicKey: pub.publicKey,
        publicParams: pub.publicParams
    };
    notify("creating");
    const instance = await relayerSDK.createInstance(config);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$PublicKeyStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publicKeyStorageSet"])(aclAddress, instance.getPublicKey(), instance.getPublicParams(2048));
    throwIfAborted();
    return instance;
};
}),
"[project]/frontend/fhevm/useFhevm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFhevm",
    ()=>useFhevm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$fhevm$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/fhevm/internal/fhevm.ts [app-ssr] (ecmascript)");
;
;
function _assert(condition, message) {
    if (!condition) {
        const m = message ? `Assertion failed: ${message}` : `Assertion failed.`;
        console.error(m);
        throw new Error(m);
    }
}
function useFhevm(parameters) {
    const { provider, chainId, initialMockChains, enabled = true } = parameters;
    const [instance, _setInstance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [status, _setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [error, _setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [_isRunning, _setIsRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(enabled);
    const [_providerChanged, _setProviderChanged] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const _abortControllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const _providerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(provider);
    const _chainIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(chainId);
    const _mockChainsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(initialMockChains);
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (_abortControllerRef.current) {
            _providerRef.current = undefined;
            _chainIdRef.current = undefined;
            _abortControllerRef.current.abort();
            _abortControllerRef.current = null;
        }
        _providerRef.current = provider;
        _chainIdRef.current = chainId;
        _setInstance(undefined);
        _setError(undefined);
        _setStatus("idle");
        if (provider !== undefined) {
            _setProviderChanged((prev)=>prev + 1);
        }
    }, [
        provider,
        chainId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        refresh();
    }, [
        refresh
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        _setIsRunning(enabled);
    }, [
        enabled
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (_isRunning === false) {
            // Suppress cancelled log - this is normal behavior
            if (_abortControllerRef.current) {
                _abortControllerRef.current.abort();
                _abortControllerRef.current = null;
            }
            _setInstance(undefined);
            _setError(undefined);
            _setStatus("idle");
            return;
        }
        if (_isRunning === true) {
            if (_providerRef.current === undefined) {
                _setInstance(undefined);
                _setError(undefined);
                _setStatus("idle");
                return;
            }
            if (!_abortControllerRef.current) {
                _abortControllerRef.current = new AbortController();
            }
            _assert(!_abortControllerRef.current.signal.aborted, "!controllerRef.current.signal.aborted");
            _setStatus("loading");
            _setError(undefined);
            const thisSignal = _abortControllerRef.current.signal;
            const thisProvider = _providerRef.current;
            const thisRpcUrlsByChainId = _mockChainsRef.current;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$internal$2f$fhevm$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createFhevmInstance"])({
                signal: thisSignal,
                provider: thisProvider,
                mockChains: thisRpcUrlsByChainId,
                onStatusChange: (s)=>console.log(`[useFhevm] createFhevmInstance status changed: ${s}`)
            }).then((i)=>{
                console.log(`[useFhevm] createFhevmInstance created!`);
                if (thisSignal.aborted) return;
                _assert(thisProvider === _providerRef.current, "thisProvider === _providerRef.current");
                _setInstance(i);
                _setError(undefined);
                _setStatus("ready");
            }).catch((e)=>{
                if (thisSignal.aborted) {
                    return;
                }
                _assert(thisProvider === _providerRef.current, "thisProvider === _providerRef.current");
                // Completely suppress "Failed to fetch" errors - they're non-fatal
                const errorMessage = e?.message || String(e);
                if (errorMessage.includes("Failed to fetch") || errorMessage.includes("fetch")) {
                    // Silently ignore - this is expected when RPC is not available
                    // The instance will work in non-mock mode or retry later
                    _setInstance(undefined);
                    _setError(undefined);
                    _setStatus("idle");
                    return;
                }
                // Only log and set error for non-fetch errors
                console.error(`[useFhevm] Error creating FHEVM instance:`, e);
                const enhancedError = new Error(errorMessage);
                enhancedError.name = e.name || "FHEVMInitializationError";
                if (e.stack) {
                    enhancedError.stack = e.stack;
                }
                _setInstance(undefined);
                _setError(enhancedError);
                _setStatus("error");
            });
        }
    }, [
        _isRunning,
        _providerChanged
    ]);
    return {
        instance,
        refresh,
        error,
        status
    };
}
}),
"[project]/frontend/hooks/useEthersSigner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEthersProvider",
    ()=>useEthersProvider,
    "useEthersSigner",
    ()=>useEthersSigner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/wagmi/dist/esm/hooks/useWalletClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/wagmi/dist/esm/hooks/usePublicClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$browser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/ethers/lib.esm/providers/provider-browser.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/ethers/lib.esm/providers/provider-jsonrpc.js [app-ssr] (ecmascript)");
;
;
;
async function walletClientToSigner(walletClient) {
    const { account, chain, transport } = walletClient;
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address
    };
    // Handle different transport types
    let provider;
    if (transport && typeof transport === "object" && "request" in transport) {
        // EIP1193 provider
        provider = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$browser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BrowserProvider"](transport, network);
    } else {
        // Fallback to window.ethereum
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            throw new Error("No provider available");
        }
    }
    const signer = await provider.getSigner(account.address);
    return signer;
}
function publicClientToProvider(publicClient) {
    if (!publicClient) return undefined;
    const { chain, transport } = publicClient;
    if (!chain) return undefined;
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address
    };
    // Handle http transport
    if (transport && typeof transport === "object") {
        if ("url" in transport && typeof transport.url === "string") {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonRpcProvider"](transport.url, network, {
                staticNetwork: true
            });
        }
        // Try to get URL from transport config
        if ("value" in transport && transport.value && "url" in transport.value) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonRpcProvider"](transport.value.url, network, {
                staticNetwork: true
            });
        }
    }
    // Fallback: use chain RPC URL
    if (chain.rpcUrls && chain.rpcUrls.default && chain.rpcUrls.default.http && chain.rpcUrls.default.http[0]) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonRpcProvider"](chain.rpcUrls.default.http[0], network, {
            staticNetwork: true
        });
    }
    return undefined;
}
function useEthersSigner({ chainId } = {}) {
    const { data: walletClient } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWalletClient"])({
        chainId
    });
    // Note: This returns a Promise, handle it in the component
    return walletClient ? walletClientToSigner(walletClient) : undefined;
}
function useEthersProvider({ chainId } = {}) {
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$usePublicClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicClient"])({
        chainId
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>publicClientToProvider(publicClient), [
        publicClient
    ]);
}
}),
"[project]/frontend/fhevm/FhevmDecryptionSignature.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FhevmDecryptionSignature",
    ()=>FhevmDecryptionSignature
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/ethers/lib.esm/ethers.js [app-ssr] (ecmascript) <export * as ethers>");
;
function _timestampNow() {
    return Math.floor(Date.now() / 1000);
}
class FhevmDecryptionSignatureStorageKey {
    #contractAddresses;
    #userAddress;
    #publicKey;
    #key;
    constructor(instance, contractAddresses, userAddress, publicKey){
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].isAddress(userAddress)) {
            throw new TypeError(`Invalid address ${userAddress}`);
        }
        const sortedContractAddresses = contractAddresses.sort();
        const emptyEIP712 = instance.createEIP712(publicKey ?? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].ZeroAddress, sortedContractAddresses, 0, 0);
        try {
            const hash = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].TypedDataEncoder.hash(emptyEIP712.domain, {
                UserDecryptRequestVerification: emptyEIP712.types.UserDecryptRequestVerification
            }, emptyEIP712.message);
            this.#contractAddresses = sortedContractAddresses;
            this.#userAddress = userAddress;
            this.#key = `${userAddress}:${hash}`;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    get contractAddresses() {
        return this.#contractAddresses;
    }
    get userAddress() {
        return this.#userAddress;
    }
    get publicKey() {
        return this.#publicKey;
    }
    get key() {
        return this.#key;
    }
}
class FhevmDecryptionSignature {
    #publicKey;
    #privateKey;
    #signature;
    #startTimestamp;
    #durationDays;
    #userAddress;
    #contractAddresses;
    #eip712;
    constructor(parameters){
        if (!FhevmDecryptionSignature.checkIs(parameters)) {
            throw new TypeError("Invalid FhevmDecryptionSignatureType");
        }
        this.#publicKey = parameters.publicKey;
        this.#privateKey = parameters.privateKey;
        this.#signature = parameters.signature;
        this.#startTimestamp = parameters.startTimestamp;
        this.#durationDays = parameters.durationDays;
        this.#userAddress = parameters.userAddress;
        this.#contractAddresses = parameters.contractAddresses;
        this.#eip712 = parameters.eip712;
    }
    get privateKey() {
        return this.#privateKey;
    }
    get publicKey() {
        return this.#publicKey;
    }
    get signature() {
        return this.#signature;
    }
    get contractAddresses() {
        return this.#contractAddresses;
    }
    get startTimestamp() {
        return this.#startTimestamp;
    }
    get durationDays() {
        return this.#durationDays;
    }
    get userAddress() {
        return this.#userAddress;
    }
    static checkIs(s) {
        if (!s || typeof s !== "object") {
            return false;
        }
        if (!("publicKey" in s && typeof s.publicKey === "string")) {
            return false;
        }
        if (!("privateKey" in s && typeof s.privateKey === "string")) {
            return false;
        }
        if (!("signature" in s && typeof s.signature === "string")) {
            return false;
        }
        if (!("startTimestamp" in s && typeof s.startTimestamp === "number")) {
            return false;
        }
        if (!("durationDays" in s && typeof s.durationDays === "number")) {
            return false;
        }
        if (!("contractAddresses" in s && Array.isArray(s.contractAddresses))) {
            return false;
        }
        for(let i = 0; i < s.contractAddresses.length; ++i){
            if (typeof s.contractAddresses[i] !== "string") return false;
            if (!s.contractAddresses[i].startsWith("0x")) return false;
        }
        if (!("userAddress" in s && typeof s.userAddress === "string" && s.userAddress.startsWith("0x"))) {
            return false;
        }
        if (!("eip712" in s && typeof s.eip712 === "object" && s.eip712 !== null)) {
            return false;
        }
        if (!("domain" in s.eip712 && typeof s.eip712.domain === "object")) {
            return false;
        }
        if (!("primaryType" in s.eip712 && typeof s.eip712.primaryType === "string")) {
            return false;
        }
        if (!("message" in s.eip712)) {
            return false;
        }
        if (!("types" in s.eip712 && typeof s.eip712.types === "object" && s.eip712.types !== null)) {
            return false;
        }
        return true;
    }
    toJSON() {
        return {
            publicKey: this.#publicKey,
            privateKey: this.#privateKey,
            signature: this.#signature,
            startTimestamp: this.#startTimestamp,
            durationDays: this.#durationDays,
            userAddress: this.#userAddress,
            contractAddresses: this.#contractAddresses,
            eip712: this.#eip712
        };
    }
    static fromJSON(json) {
        const data = typeof json === "string" ? JSON.parse(json) : json;
        return new FhevmDecryptionSignature(data);
    }
    equals(s) {
        return s.signature === this.#signature;
    }
    isValid() {
        return _timestampNow() < this.#startTimestamp + this.#durationDays * 24 * 60 * 60;
    }
    async saveToGenericStringStorage(storage, instance, withPublicKey) {
        try {
            const value = JSON.stringify(this);
            const storageKey = new FhevmDecryptionSignatureStorageKey(instance, this.#contractAddresses, this.#userAddress, withPublicKey ? this.#publicKey : undefined);
            await storage.setItem(storageKey.key, value);
            console.log(`signature saved! contracts=${this.#contractAddresses.length}`);
        } catch  {
            console.error(`FhevmDecryptionSignature.saveToGenericStringStorage() failed!`);
        }
    }
    static async loadFromGenericStringStorage(storage, instance, contractAddresses, userAddress, publicKey) {
        try {
            const storageKey = new FhevmDecryptionSignatureStorageKey(instance, contractAddresses, userAddress, publicKey);
            const result = await storage.getItem(storageKey.key);
            if (!result) {
                console.warn(`Could not load signature! key=${storageKey.key}`);
                return null;
            }
            try {
                const kps = FhevmDecryptionSignature.fromJSON(result);
                if (!kps.isValid()) {
                    return null;
                }
                return kps;
            } catch  {
                return null;
            }
        } catch  {
            console.error(`FhevmDecryptionSignature.loadFromGenericStringStorage() failed!`);
            return null;
        }
    }
    static async new(instance, contractAddresses, publicKey, privateKey, signer) {
        try {
            const userAddress = await signer.getAddress();
            const startTimestamp = _timestampNow();
            const durationDays = 365;
            const eip712 = instance.createEIP712(publicKey, contractAddresses, startTimestamp, durationDays);
            const signature = await signer.signTypedData(eip712.domain, {
                UserDecryptRequestVerification: eip712.types.UserDecryptRequestVerification
            }, eip712.message);
            return new FhevmDecryptionSignature({
                publicKey,
                privateKey,
                contractAddresses: contractAddresses,
                startTimestamp,
                durationDays,
                signature,
                eip712: eip712,
                userAddress
            });
        } catch  {
            return null;
        }
    }
    static async loadOrSign(instance, contractAddresses, signer, storage, keyPair) {
        const userAddress = await signer.getAddress();
        const cached = await FhevmDecryptionSignature.loadFromGenericStringStorage(storage, instance, contractAddresses, userAddress, keyPair?.publicKey);
        if (cached) {
            return cached;
        }
        const { publicKey, privateKey } = keyPair ?? instance.generateKeypair();
        const sig = await FhevmDecryptionSignature.new(instance, contractAddresses, publicKey, privateKey, signer);
        if (!sig) {
            return null;
        }
        await sig.saveToGenericStringStorage(storage, instance, Boolean(keyPair?.publicKey));
        return sig;
    }
}
}),
"[project]/frontend/abi/DreamJournalAddresses.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
  This file is auto-generated.
  Command: 'npm run genabi'
*/ __turbopack_context__.s([
    "DreamJournalAddresses",
    ()=>DreamJournalAddresses
]);
const DreamJournalAddresses = {
    "11155111": {
        address: "0x0000000000000000000000000000000000000000",
        chainId: 11155111,
        chainName: "sepolia"
    },
    "31337": {
        address: "0xC5273AbFb36550090095B1EDec019216AD21BE6c",
        chainId: 31337,
        chainName: "hardhat"
    }
};
}),
"[project]/frontend/abi/DreamJournalABI.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
  This file is auto-generated.
  Command: 'npm run genabi'
*/ __turbopack_context__.s([
    "DreamJournalABI",
    ()=>DreamJournalABI
]);
const DreamJournalABI = {
    "abi": [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "accessor",
                    "type": "address"
                }
            ],
            "name": "DreamAccessed",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "length",
                    "type": "uint256"
                }
            ],
            "name": "DreamContentLength",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint64",
                    "name": "createdAt",
                    "type": "uint64"
                }
            ],
            "name": "DreamCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "decryptor",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint64",
                    "name": "timestamp",
                    "type": "uint64"
                }
            ],
            "name": "DreamDecrypted",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "internalType": "externalEuint8[]",
                    "name": "encContent",
                    "type": "bytes32[]"
                },
                {
                    "internalType": "bytes",
                    "name": "inputProof",
                    "type": "bytes"
                }
            ],
            "name": "createDream",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "dreamExists",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "exists",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "getDreamContentByte",
            "outputs": [
                {
                    "internalType": "euint8",
                    "name": "encByte",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getDreamContentLength",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "length",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                }
            ],
            "name": "getDreamCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "count",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                }
            ],
            "name": "getDreamIds",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getDreamMeta",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "internalType": "uint64",
                    "name": "createdAt",
                    "type": "uint64"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getTotalDreamCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "count",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "protocolId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "recordContentAccess",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "recordDecryption",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
};
}),
"[project]/frontend/hooks/useDreamJournal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDreamJournal",
    ()=>useDreamJournal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/ethers/lib.esm/ethers.js [app-ssr] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$FhevmDecryptionSignature$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/fhevm/FhevmDecryptionSignature.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$abi$2f$DreamJournalAddresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/abi/DreamJournalAddresses.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$abi$2f$DreamJournalABI$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/abi/DreamJournalABI.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
/**
 * Resolves DreamJournal contract metadata for the given EVM `chainId`.
 */ function getDreamJournalByChainId(chainId) {
    if (!chainId) {
        return {
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$abi$2f$DreamJournalABI$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DreamJournalABI"].abi
        };
    }
    const entry = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$abi$2f$DreamJournalAddresses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DreamJournalAddresses"][chainId.toString()];
    if (!("address" in entry) || entry.address === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].ZeroAddress) {
        return {
            abi: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$abi$2f$DreamJournalABI$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DreamJournalABI"].abi,
            chainId
        };
    }
    return {
        address: entry?.address,
        chainId: entry?.chainId ?? chainId,
        chainName: entry?.chainName,
        abi: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$abi$2f$DreamJournalABI$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DreamJournalABI"].abi
    };
}
const useDreamJournal = (parameters)=>{
    const { instance, fhevmDecryptionSignatureStorage, chainId, ethersSigner, ethersReadonlyProvider, sameChain, sameSigner } = parameters;
    // States
    const [dreams, setDreams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCreating, setIsCreating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const dreamJournalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const isLoadingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isCreatingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Contract info
    const dreamJournal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const c = getDreamJournalByChainId(chainId);
        dreamJournalRef.current = c;
        if (!c.address) {
            setMessage(`DreamJournal deployment not found for chainId=${chainId}.`);
        }
        return c;
    }, [
        chainId
    ]);
    const isDeployed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!dreamJournal) {
            return undefined;
        }
        return Boolean(dreamJournal.address) && dreamJournal.address !== __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].ZeroAddress;
    }, [
        dreamJournal
    ]);
    const canCreate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        // Allow creating even if instance is not ready - it will be checked in createDream
        return Boolean(dreamJournal.address && ethersSigner && !isCreating && !isLoading);
    }, [
        dreamJournal.address,
        ethersSigner,
        isCreating,
        isLoading
    ]);
    const canLoadDreams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return dreamJournal.address && ethersReadonlyProvider && ethersSigner && !isLoading;
    }, [
        dreamJournal.address,
        ethersReadonlyProvider,
        ethersSigner,
        isLoading
    ]);
    // Load user's dreams
    const loadDreams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (isLoadingRef.current) {
            return;
        }
        if (!dreamJournalRef.current || !dreamJournalRef.current?.chainId || !dreamJournalRef.current?.address || !ethersReadonlyProvider || !ethersSigner) {
            setDreams([]);
            return;
        }
        isLoadingRef.current = true;
        setIsLoading(true);
        setMessage("Loading dreams...");
        const thisChainId = dreamJournalRef.current.chainId;
        const thisContractAddress = dreamJournalRef.current.address;
        const thisEthersReadonlyProvider = ethersReadonlyProvider;
        const thisEthersSigner = ethersSigner;
        const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(thisContractAddress, dreamJournalRef.current.abi, thisEthersReadonlyProvider);
        const run = async ()=>{
            try {
                const userAddress = await thisEthersSigner.getAddress();
                const dreamIds = await contract.getDreamIds(userAddress);
                if (!sameChain.current(thisChainId) || thisContractAddress !== dreamJournalRef.current?.address) {
                    return;
                }
                const dreamList = [];
                for(let i = 0; i < dreamIds.length; i++){
                    const id = dreamIds[i];
                    const [owner, title, createdAt] = await contract.getDreamMeta(id);
                    dreamList.push({
                        id: BigInt(id),
                        title,
                        owner,
                        createdAt: BigInt(createdAt)
                    });
                }
                if (sameChain.current(thisChainId) && thisContractAddress === dreamJournalRef.current?.address) {
                    setDreams(dreamList);
                    setMessage(`Loaded ${dreamList.length} dream(s)`);
                }
            } catch (e) {
                setMessage("Failed to load dreams: " + e);
                if (sameChain.current(thisChainId) && thisContractAddress === dreamJournalRef.current?.address) {
                    setDreams([]);
                }
            } finally{
                isLoadingRef.current = false;
                setIsLoading(false);
            }
        };
        run();
    }, [
        ethersReadonlyProvider,
        ethersSigner,
        sameChain
    ]);
    // Auto load dreams - use ref to prevent infinite loop
    const canLoadDreamsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastLoadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])("");
    const loadTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        canLoadDreamsRef.current = canLoadDreams;
    }, [
        canLoadDreams
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Clear any pending timeout
        if (loadTimeoutRef.current) {
            clearTimeout(loadTimeoutRef.current);
            loadTimeoutRef.current = null;
        }
        // Create a unique key for this load attempt
        const address = dreamJournal.address || "";
        const loadKey = `${address}-${chainId}-${!!ethersReadonlyProvider}-${!!ethersSigner}`;
        // Only load if conditions changed and we haven't loaded for this key
        if (canLoadDreams && loadKey !== lastLoadRef.current && !isLoadingRef.current) {
            lastLoadRef.current = loadKey;
            // Use setTimeout to debounce and prevent rapid calls
            loadTimeoutRef.current = setTimeout(()=>{
                if (!isLoadingRef.current) {
                    loadDreams();
                }
                loadTimeoutRef.current = null;
            }, 300); // Increased debounce time
        }
        return ()=>{
            if (loadTimeoutRef.current) {
                clearTimeout(loadTimeoutRef.current);
                loadTimeoutRef.current = null;
            }
        };
    }, [
        dreamJournal.address,
        chainId,
        ethersReadonlyProvider,
        ethersSigner,
        canLoadDreams,
        loadDreams
    ]);
    // Create new dream
    const createDream = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((title, content)=>{
        if (isCreatingRef.current || isLoadingRef.current) {
            console.log("[createDream] Already creating or loading, ignoring duplicate call");
            return;
        }
        if (!dreamJournal.address || !ethersSigner || !title || !content) {
            setMessage("Please fill in both title and content");
            return;
        }
        // Check instance only when actually creating
        if (!instance) {
            const errorMsg = "FHEVM instance is not ready. Please wait for initialization...";
            setMessage(errorMsg);
            console.error("[createDream] FHEVM instance not available:", {
                hasInstance: !!instance,
                chainId,
                contractAddress: dreamJournal.address,
                hasSigner: !!ethersSigner
            });
            isCreatingRef.current = false;
            setIsCreating(false);
            return;
        }
        const thisChainId = chainId;
        const thisContractAddress = dreamJournal.address;
        const thisEthersSigner = ethersSigner;
        const thisContract = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(thisContractAddress, dreamJournal.abi, thisEthersSigner);
        isCreatingRef.current = true;
        setIsCreating(true);
        setMessage("Encrypting dream content...");
        const run = async ()=>{
            // Let browser repaint before encryption (CPU-intensive)
            await new Promise((resolve)=>setTimeout(resolve, 100));
            const isStale = ()=>thisContractAddress !== dreamJournalRef.current?.address || !sameChain.current(thisChainId) || !sameSigner.current(thisEthersSigner);
            try {
                // Convert string to bytes
                const contentBytes = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].toUtf8Bytes(content);
                // Encrypt each byte
                const encryptedInput = instance.createEncryptedInput(thisContractAddress, thisEthersSigner.address);
                for(let i = 0; i < contentBytes.length; i++){
                    encryptedInput.add8(contentBytes[i]);
                }
                // Encrypt (CPU-intensive)
                console.log("[createDream] Starting encryption...");
                console.log("[createDream] Encryption context:", {
                    contractAddress: thisContractAddress,
                    userAddress: thisEthersSigner.address,
                    chainId: thisChainId,
                    isMock: false
                });
                let encrypted;
                try {
                    encrypted = await encryptedInput.encrypt();
                    console.log("[createDream] Encryption completed, handles:", encrypted.handles.length);
                } catch (encryptError) {
                    const errorMsg = encryptError?.message || String(encryptError);
                    console.error("[createDream] Encryption failed:", {
                        error: errorMsg,
                        name: encryptError?.name,
                        stack: encryptError?.stack
                    });
                    // Provide user-friendly error message
                    if (errorMsg.includes("Relayer") || errorMsg.includes("Bad JSON")) {
                        throw new Error(`FHEVM Relayer error: ${errorMsg}\n\n` + `This may be a temporary issue with the FHEVM Relayer service on Sepolia.\n` + `Please try again in a few moments, or switch to Hardhat Local network for testing.`);
                    }
                    throw encryptError;
                }
                console.log("[createDream] Handles type check:", {
                    isArray: Array.isArray(encrypted.handles),
                    firstHandleType: typeof encrypted.handles[0],
                    firstHandleValue: encrypted.handles[0]
                });
                // Check if stale after encryption
                const staleCheck = await isStale();
                console.log("[createDream] Stale check after encryption:", staleCheck);
                if (staleCheck) {
                    const signerCheck = sameSigner.current(thisEthersSigner);
                    const signerMatch = typeof signerCheck === 'boolean' ? signerCheck : await signerCheck;
                    console.log("[createDream] Stale after encryption, aborting. Details:", {
                        contractAddressMatch: thisContractAddress === dreamJournalRef.current?.address,
                        chainMatch: sameChain.current(thisChainId),
                        signerMatch: signerMatch,
                        currentAddress: dreamJournalRef.current?.address,
                        thisAddress: thisContractAddress,
                        currentChainId: dreamJournalRef.current?.chainId,
                        thisChainId
                    });
                    setMessage("Ignore dream creation - state changed");
                    isCreatingRef.current = false;
                    setIsCreating(false);
                    return;
                }
                console.log("[createDream] Not stale, proceeding with transaction submission...");
                setMessage("Submitting dream to blockchain...");
                console.log("[createDream] Preparing transaction...");
                try {
                    const signerAddress = await thisEthersSigner.getAddress();
                    console.log("[createDream] Contract instance:", {
                        address: thisContractAddress,
                        hasContract: !!thisContract,
                        signerAddress
                    });
                } catch (addrError) {
                    console.error("[createDream] Error getting signer address:", addrError);
                    throw new Error("Failed to get signer address");
                }
                // ABI shows externalEuint8[] is compiled as bytes32[]
                // So we pass handles directly as bytes32[] array, not as struct array
                // The handles are already in the correct format (hex strings)
                const handlesArray = encrypted.handles;
                // Safe logging
                const firstHandle = handlesArray[0];
                const firstHandlePreview = typeof firstHandle === 'string' ? firstHandle.substring(0, 20) + "..." : String(firstHandle || 'undefined').substring(0, 30);
                console.log("[createDream] Prepared handles array:", {
                    arrayLength: handlesArray.length,
                    firstHandle: firstHandlePreview,
                    firstHandleType: typeof firstHandle,
                    hasInputProof: !!encrypted.inputProof,
                    inputProofLength: encrypted.inputProof?.length || 0
                });
                // Call contract
                console.log("[createDream] Calling createDream contract method...", {
                    title,
                    encryptedBytes: handlesArray.length,
                    hasInputProof: !!encrypted.inputProof,
                    contractAddress: thisContractAddress
                });
                const tx = await thisContract.createDream(title, handlesArray, encrypted.inputProof);
                console.log("[createDream] Transaction sent:", tx.hash);
                console.log("[createDream] Transaction details:", {
                    hash: tx.hash,
                    to: tx.to,
                    from: tx.from,
                    value: tx.value?.toString()
                });
                setMessage(`Wait for tx:${tx.hash}...`);
                const receipt = await tx.wait();
                setMessage(`Dream created! status=${receipt?.status}`);
                console.log("[createDream] Dream created successfully!", {
                    txHash: tx.hash,
                    status: receipt?.status
                });
                if (await isStale()) {
                    setMessage("Ignore dream creation");
                    isCreatingRef.current = false;
                    setIsCreating(false);
                    return;
                }
                // Reload dreams
                loadDreams();
                // Signal success to component
                setMessage(`Dream created successfully! Transaction: ${tx.hash.slice(0, 10)}...`);
            } catch (e) {
                const errorMsg = e?.message || "Failed to create dream";
                setMessage(`Create dream failed: ${errorMsg}`);
                console.error("[createDream] Error:", e);
                console.error("[createDream] Error details:", {
                    name: e?.name,
                    message: errorMsg,
                    code: e?.code,
                    data: e?.data,
                    reason: e?.reason,
                    stack: e?.stack
                });
                // Show alert for user-friendly error message
                if (errorMsg.includes("user rejected") || errorMsg.includes("User denied") || errorMsg.includes("rejected") || errorMsg.includes("User rejected")) {
                    alert("Transaction was cancelled. Please try again when ready.");
                } else if (errorMsg.includes("insufficient funds") || errorMsg.includes("insufficient balance")) {
                    alert("Insufficient funds. Please add ETH to your wallet.");
                } else if (errorMsg.includes("Relayer") || errorMsg.includes("Bad JSON")) {
                    alert("FHEVM Relayer Error\n\n" + "The FHEVM Relayer service on Sepolia may be temporarily unavailable or experiencing issues.\n\n" + "Suggestions:\n" + "1. Wait a few moments and try again\n" + "2. Switch to Hardhat Local network for local testing\n" + "3. Check the browser console (F12) for more details\n\n" + `Error: ${errorMsg}`);
                } else if (errorMsg.includes("network") || errorMsg.includes("Network") || errorMsg.includes("ECONNREFUSED")) {
                    alert(`Network error: ${errorMsg}\n\nPlease check:\n1. Hardhat node is running (npx hardhat node)\n2. Wallet is connected to Hardhat Local network (Chain ID: 31337)`);
                } else {
                    alert(`Failed to create dream: ${errorMsg}\n\nCheck the browser console (F12) for more details.`);
                }
            } finally{
                isCreatingRef.current = false;
                setIsCreating(false);
            }
        };
        run();
    }, [
        dreamJournal.address,
        dreamJournal.abi,
        instance,
        chainId,
        ethersSigner,
        loadDreams,
        sameChain,
        sameSigner
    ]);
    // Decrypt dream content
    const decryptDream = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((dreamId)=>{
        if (isLoadingRef.current) {
            return;
        }
        if (!dreamJournal.address || !instance || !ethersSigner || !ethersReadonlyProvider) {
            return;
        }
        // Check if already decrypted
        const dream = dreams.find((d)=>d.id === dreamId);
        if (dream?.decryptedContent) {
            return;
        }
        const thisChainId = chainId;
        const thisContractAddress = dreamJournal.address;
        const thisEthersSigner = ethersSigner;
        const thisEthersReadonlyProvider = ethersReadonlyProvider;
        isLoadingRef.current = true;
        setIsLoading(true);
        // Update dream state to show decrypting
        setDreams((prev)=>prev.map((d)=>d.id === dreamId ? {
                    ...d,
                    isDecrypting: true
                } : d));
        setMessage(`Decrypting dream #${dreamId}...`);
        const run = async ()=>{
            const isStale = async ()=>{
                const addressMatch = thisContractAddress === dreamJournalRef.current?.address;
                const chainMatch = sameChain.current(thisChainId);
                const signerCheck = sameSigner.current(thisEthersSigner);
                const signerMatch = typeof signerCheck === 'boolean' ? signerCheck : await signerCheck;
                return !addressMatch || !chainMatch || !signerMatch;
            };
            try {
                const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(thisContractAddress, dreamJournalRef.current.abi, thisEthersReadonlyProvider);
                // Get content length
                const length = await contract.getDreamContentLength(dreamId);
                if (await isStale()) {
                    return;
                }
                // Get decryption signature
                const sig = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$FhevmDecryptionSignature$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FhevmDecryptionSignature"].loadOrSign(instance, [
                    thisContractAddress
                ], thisEthersSigner, fhevmDecryptionSignatureStorage);
                if (!sig) {
                    setMessage("Unable to build FHEVM decryption signature");
                    return;
                }
                if (await isStale()) {
                    setMessage("Ignore decryption");
                    return;
                }
                setMessage("Decrypting content...");
                // Decrypt each byte
                const decryptedBytes = [];
                // Get all encrypted bytes first
                const encryptedBytes = [];
                for(let i = 0; i < Number(length); i++){
                    if (await isStale()) {
                        return;
                    }
                    const encByte = await contract.getDreamContentByte(dreamId, i);
                    // Convert to bytes32 format (handle)
                    const handle = typeof encByte === "string" ? encByte : __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].hexlify(encByte);
                    encryptedBytes.push(handle);
                }
                if (await isStale()) {
                    setMessage("Ignore decryption");
                    return;
                }
                // Prepare handle-contract pairs for batch decryption
                const handleContractPairs = encryptedBytes.map((handle)=>({
                        handle,
                        contractAddress: thisContractAddress
                    }));
                setMessage("Decrypting content...");
                // Decrypt all bytes at once (more efficient)
                const decryptedResult = await instance.userDecrypt(handleContractPairs, sig.privateKey, sig.publicKey, sig.signature, sig.contractAddresses, sig.userAddress, sig.startTimestamp, sig.durationDays);
                if (await isStale()) {
                    setMessage("Ignore decryption");
                    return;
                }
                // Extract decrypted values
                for(let i = 0; i < encryptedBytes.length; i++){
                    const handle = encryptedBytes[i];
                    const decryptedValue = decryptedResult[handle];
                    if (decryptedValue !== undefined) {
                        decryptedBytes.push(Number(decryptedValue));
                    } else {
                        // Fallback: decrypt individually if batch fails
                        console.warn(`Failed to decrypt byte ${i}, trying individually...`);
                        const individualResult = await instance.userDecrypt([
                            {
                                handle,
                                contractAddress: thisContractAddress
                            }
                        ], sig.privateKey, sig.publicKey, sig.signature, sig.contractAddresses, sig.userAddress, sig.startTimestamp, sig.durationDays);
                        decryptedBytes.push(Number(individualResult[handle] || 0));
                    }
                }
                if (await isStale()) {
                    setMessage("Ignore decryption");
                    return;
                }
                // Convert bytes to string
                const decryptedContent = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].toUtf8String(new Uint8Array(decryptedBytes));
                // Update dream with decrypted content
                setDreams((prev)=>prev.map((d)=>d.id === dreamId ? {
                            ...d,
                            decryptedContent,
                            isDecrypting: false
                        } : {
                            ...d,
                            isDecrypting: false
                        }));
                setMessage("Decryption completed!");
            } catch (e) {
                const errorMsg = e?.message || "Failed to decrypt dream";
                setMessage(`Decryption failed: ${errorMsg}`);
                setDreams((prev)=>prev.map((d)=>d.id === dreamId ? {
                            ...d,
                            isDecrypting: false
                        } : d));
            } finally{
                isLoadingRef.current = false;
                setIsLoading(false);
            }
        };
        run();
    }, [
        dreamJournal.address,
        dreams,
        instance,
        chainId,
        ethersSigner,
        ethersReadonlyProvider,
        fhevmDecryptionSignatureStorage,
        sameChain,
        sameSigner
    ]);
    const refreshDreams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        return loadDreams();
    }, [
        loadDreams
    ]);
    return {
        contractAddress: dreamJournal.address,
        dreams,
        isLoading,
        isCreating,
        message,
        canCreate,
        canLoadDreams,
        isDeployed,
        createDream,
        loadDreams,
        refreshDreams,
        decryptDream
    };
};
}),
"[project]/frontend/components/ErrorNotDeployed.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "errorNotDeployed",
    ()=>errorNotDeployed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function errorNotDeployed(chainId) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid w-full gap-4 mx-auto font-semibold bg-none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "col-span-full mx-20",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-4xl leading-relaxed",
                    children: [
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono bg-red-500",
                            children: "Error"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                            lineNumber: 7,
                            columnNumber: 11
                        }, this),
                        ":",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono bg-white",
                            children: "DreamJournal.sol"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                            lineNumber: 8,
                            columnNumber: 11
                        }, this),
                        " Contract Not Deployed on",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono bg-white",
                            children: [
                                "chainId=",
                                chainId
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                            lineNumber: 10,
                            columnNumber: 11
                        }, this),
                        " ",
                        chainId === 11155111 ? "(Sepolia)" : "",
                        " or Deployment Address Missing."
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                    lineNumber: 5,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xl leading-relaxed mt-8",
                    children: [
                        "It appears that the",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono bg-white",
                            children: "DreamJournal.sol"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                            lineNumber: 16,
                            columnNumber: 11
                        }, this),
                        " contract has either not been deployed yet, or the deployment address is missing from the ABI directory",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono bg-white",
                            children: "frontend/abi"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this),
                        ". To deploy ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono bg-white",
                            children: "DreamJournal.sol"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                            lineNumber: 20,
                            columnNumber: 18
                        }, this),
                        " on Sepolia, run the following command:"
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-mono text-2xl leading-relaxed bg-black text-white p-4 mt-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "opacity-50 italic text-red-500",
                            children: "#from pro16 directory"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        "npx hardhat deploy --network",
                        " ",
                        chainId === 11155111 ? "sepolia" : "your-network-name"
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xl leading-relaxed mt-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: "Recommended:"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this),
                        " Switch to the local",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono bg-white",
                            children: "Hardhat Node"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this),
                        " using the Rainbow wallet browser extension."
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-semibold text-blue-800 mb-2",
                            children: "To use local Hardhat network:"
                        }, void 0, false, {
                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                            className: "list-decimal list-inside space-y-2 text-blue-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: [
                                        "Make sure Hardhat node is running: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                            className: "bg-blue-100 px-2 py-1 rounded",
                                            children: "npx hardhat node"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                                            lineNumber: 39,
                                            columnNumber: 52
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                                    lineNumber: 39,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: [
                                        "In Rainbow wallet, add custom network:",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "list-disc list-inside ml-4 mt-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: [
                                                        "Network Name: ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                            className: "bg-blue-100 px-1 rounded",
                                                            children: "Hardhat Local"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                                                            lineNumber: 42,
                                                            columnNumber: 35
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                                                    lineNumber: 42,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: [
                                                        "RPC URL: ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                            className: "bg-blue-100 px-1 rounded",
                                                            children: "http://localhost:8545"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                                                            lineNumber: 43,
                                                            columnNumber: 30
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                                                    lineNumber: 43,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: [
                                                        "Chain ID: ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                            className: "bg-blue-100 px-1 rounded",
                                                            children: "31337"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                                                            lineNumber: 44,
                                                            columnNumber: 31
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                                                    lineNumber: 44,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: [
                                                        "Currency Symbol: ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                            className: "bg-blue-100 px-1 rounded",
                                                            children: "ETH"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                                                            lineNumber: 45,
                                                            columnNumber: 38
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                                                    lineNumber: 45,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                                            lineNumber: 41,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "Switch to Hardhat Local network in Rainbow wallet"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                                    lineNumber: 48,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "Refresh this page"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
            lineNumber: 4,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/components/ErrorNotDeployed.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[project]/frontend/components/DreamJournalDemo.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DreamJournalDemo",
    ()=>DreamJournalDemo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@rainbow-me/rainbowkit/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/wagmi/dist/esm/hooks/useChainId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/wagmi/dist/esm/hooks/useWalletClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/ethers/lib.esm/ethers.js [app-ssr] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$useFhevm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/fhevm/useFhevm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$hooks$2f$useInMemoryStorage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/hooks/useInMemoryStorage.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$hooks$2f$useEthersSigner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/hooks/useEthersSigner.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$hooks$2f$useDreamJournal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/hooks/useDreamJournal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$ErrorNotDeployed$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/ErrorNotDeployed.tsx [app-ssr] (ecmascript)");
"use client";
;
;
// Input sanitization utility
const sanitizeInput = (input)=>{
    return input.replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};
;
;
;
;
;
;
;
;
const DreamJournalDemo = ()=>{
    const { isConnected, address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAccount"])();
    const chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChainId"])();
    const { data: walletClient } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWalletClient"])();
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showDecrypted, setShowDecrypted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [isRefreshing, setIsRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [ethersSigner, setEthersSigner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [successMessage, setSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const { storage: fhevmDecryptionSignatureStorage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$hooks$2f$useInMemoryStorage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInMemoryStorage"])();
    const ethersProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$hooks$2f$useEthersSigner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEthersProvider"])({
        chainId
    });
    // Memoize network check to avoid recalculation
    const isCorrectNetwork = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>chainId === 31337 || chainId === 11155111, [
        chainId
    ]);
    // Get EIP1193 provider - for local Hardhat, use RPC URL string directly
    // For other networks, use walletClient transport or window.ethereum
    const eip1193Provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (chainId === 31337) {
            // For local Hardhat, use RPC URL string
            return "http://localhost:8545";
        }
        // For other networks, try to get from walletClient
        if (walletClient?.transport) {
            const transport = walletClient.transport;
            // Try to extract EIP1193 provider from transport
            if (transport.value && typeof transport.value.request === "function") {
                return transport.value;
            }
            if (typeof transport.request === "function") {
                return transport;
            }
        }
        // Fallback to window.ethereum
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return undefined;
    }, [
        chainId,
        walletClient
    ]);
    // Convert walletClient to ethers signer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (walletClient) {
            const { account, chain, transport } = walletClient;
            const network = {
                chainId: chain.id,
                name: chain.name,
                ensAddress: chain.contracts?.ensRegistry?.address
            };
            try {
                // Create provider from transport
                const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(transport, network);
                provider.getSigner(account.address).then(setEthersSigner).catch((err)=>{
                    console.error("Failed to get signer:", err);
                    setEthersSigner(undefined);
                });
            } catch (err) {
                console.error("Failed to create provider:", err);
                setEthersSigner(undefined);
            }
        } else {
            setEthersSigner(undefined);
        }
    }, [
        walletClient
    ]);
    // FHEVM instance
    const { instance: fhevmInstance, status: fhevmStatus, error: fhevmError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$fhevm$2f$useFhevm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFhevm"])({
        provider: eip1193Provider,
        chainId,
        initialMockChains: {
            31337: "http://localhost:8545"
        },
        enabled: isConnected && !!eip1193Provider
    });
    // Clean up debug logging for production
    // Same chain/signer refs
    const sameChainRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])((id)=>id === chainId);
    const currentSignerAddressRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    // Update signer address ref when signer changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (ethersSigner) {
            ethersSigner.getAddress().then((addr)=>{
                currentSignerAddressRef.current = addr.toLowerCase();
            }).catch(()=>{
                currentSignerAddressRef.current = undefined;
            });
        } else {
            currentSignerAddressRef.current = undefined;
        }
    }, [
        ethersSigner
    ]);
    const sameSignerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(async (signer)=>{
        if (!signer) {
            return !currentSignerAddressRef.current; // Both undefined
        }
        if (!currentSignerAddressRef.current) {
            return false; // Current signer is undefined but provided signer is not
        }
        try {
            const signerAddress = (await signer.getAddress()).toLowerCase();
            return signerAddress === currentSignerAddressRef.current;
        } catch  {
            return false;
        }
    });
    // Dream journal hook
    const { contractAddress, dreams, isLoading, isCreating, message, canCreate, canLoadDreams, isDeployed, createDream, loadDreams, decryptDream } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$hooks$2f$useDreamJournal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDreamJournal"])({
        instance: fhevmInstance,
        fhevmDecryptionSignatureStorage,
        eip1193Provider,
        chainId,
        ethersSigner: ethersSigner || undefined,
        ethersReadonlyProvider: ethersProvider || undefined,
        sameChain: sameChainRef,
        sameSigner: sameSignerRef
    });
    // Memoize validation checks
    const isValidInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>title.trim().length > 0 && title.trim().length <= 200 && content.trim().length > 0 && content.trim().length <= 10000, [
        title,
        content
    ]);
    const handleCreateDreamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const handleCreateDream = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        // Prevent duplicate calls - use ref to track
        if (handleCreateDreamRef.current) {
            console.log("[handleCreateDream] Already processing (ref=true), ignoring duplicate call");
            return;
        }
        if (isCreating) {
            console.log("[handleCreateDream] isCreating=true, ignoring duplicate call");
            return;
        }
        // Input validation
        if (!title.trim()) {
            alert("Please enter a title for your dream");
            return;
        }
        if (!content.trim()) {
            alert("Please enter the content of your dream");
            return;
        }
        if (title.trim().length > 200) {
            alert("Title must be 200 characters or less");
            return;
        }
        if (content.trim().length > 10000) {
            alert("Dream content must be 10,000 characters or less");
            return;
        }
        // Check if FHEVM instance is ready before creating
        if (!fhevmInstance) {
            alert("Zama FHEVM instance is not ready. Please wait a moment and try again.\n\nIf this persists, check:\n1. Wallet is connected\n2. Network is Hardhat Local (Chain ID: 31337) or Sepolia (Chain ID: 11155111)\n3. Hardhat node is running (for local development)\n4. FHEVM libraries are properly loaded");
            return;
        }
        handleCreateDreamRef.current = true;
        console.log("[handleCreateDream] Creating dream with:", {
            title: title.trim(),
            contentLength: content.trim().length,
            hasInstance: !!fhevmInstance,
            fhevmStatus,
            hasSigner: !!ethersSigner,
            contractAddress,
            canCreate,
            isCreating
        });
        try {
            setError(null);
            // Call createDream
            createDream(title.trim(), content.trim());
        } catch (err) {
            console.error("[handleCreateDream] Error creating dream:", err);
            setError(err instanceof Error ? err.message : "Failed to create dream");
        }
        // Reset the ref after a delay to allow retry if needed
        setTimeout(()=>{
            handleCreateDreamRef.current = false;
        }, 5000);
    }, [
        title,
        content,
        createDream,
        fhevmInstance,
        fhevmStatus,
        ethersSigner,
        contractAddress,
        canCreate,
        isCreating
    ]);
    // Clear form when dream is created successfully and show success message
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (message && message.includes("Dream created successfully")) {
            setTitle("");
            setContent("");
            setSuccessMessage(message);
            setError(null);
            // Auto-clear success message after 5 seconds
            setTimeout(()=>setSuccessMessage(null), 5000);
        }
    }, [
        message
    ]);
    // Clear error messages when user starts typing
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (error && (title.length > 0 || content.length > 0)) {
            setError(null);
        }
    }, [
        title,
        content,
        error
    ]);
    // Keyboard shortcuts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            // Ctrl/Cmd + Enter to submit dream
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && canCreate && isValidInput && !isCreating) {
                e.preventDefault();
                handleCreateDream();
            }
            // Escape to clear form
            if (e.key === 'Escape' && !isCreating) {
                setTitle("");
                setContent("");
                setError(null);
                setSuccessMessage(null);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return ()=>document.removeEventListener('keydown', handleKeyDown);
    }, [
        canCreate,
        isValidInput,
        isCreating,
        handleCreateDream
    ]);
    const handleDecryptDream = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((dreamId)=>{
        const dream = dreams.find((d)=>d.id === dreamId);
        if (dream?.decryptedContent) {
            // Toggle display
            setShowDecrypted((prev)=>({
                    ...prev,
                    [dreamId.toString()]: !prev[dreamId.toString()]
                }));
        } else {
            // Decrypt
            decryptDream(dreamId);
            setShowDecrypted((prev)=>({
                    ...prev,
                    [dreamId.toString()]: true
                }));
        }
    }, [
        dreams,
        decryptDream
    ]);
    if (!isConnected) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto w-full max-w-2xl mt-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-card rounded-2xl p-10 text-center border border-white/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-4xl font-bold mb-6 text-white text-glow",
                        children: "🌙 Welcome to Dream Journal"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                        lineNumber: 313,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-purple-200/80 text-lg mb-10 leading-relaxed",
                        children: "Connect your wallet to enter your private dream sanctuary. All your thoughts are fully homomorphically encrypted on-chain, ensuring they remain yours and yours alone."
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                        lineNumber: 316,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center transform hover:scale-105 transition-transform duration-300",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ConnectButton"], {}, void 0, false, {
                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                            lineNumber: 322,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                        lineNumber: 321,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                lineNumber: 312,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
            lineNumber: 311,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    // Display FHEVM error if present
    if (fhevmError && fhevmStatus === "error") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto w-full max-w-2xl mt-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-950/30 backdrop-blur-md border border-red-500/30 rounded-2xl p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold mb-4 text-red-400",
                        children: "FHEVM Initialization Error"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                        lineNumber: 334,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-red-300/80 mb-6",
                        children: fhevmError.message
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                        lineNumber: 337,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>window.location.reload(),
                        className: "px-6 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-xl transition-colors shadow-lg shadow-red-900/20",
                        children: "Reload Sanctuary"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                        lineNumber: 340,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                lineNumber: 333,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
            lineNumber: 332,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    // Network validation is handled above in isCorrectNetwork memo
    if (!isCorrectNetwork && chainId !== undefined) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto w-full max-w-2xl mt-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-amber-950/30 backdrop-blur-md border border-amber-500/30 rounded-2xl p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold mb-4 text-amber-400",
                        children: "Wrong Realm Detected"
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                        lineNumber: 357,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-amber-200/80 mb-6",
                        children: [
                            "Please switch to ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Hardhat Local"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                lineNumber: 361,
                                columnNumber: 30
                            }, ("TURBOPACK compile-time value", void 0)),
                            " (31337) or ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Sepolia"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                lineNumber: 361,
                                columnNumber: 72
                            }, ("TURBOPACK compile-time value", void 0)),
                            " (11155111)."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                        lineNumber: 360,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-start",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ConnectButton"], {}, void 0, false, {
                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                            lineNumber: 364,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                        lineNumber: 363,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                lineNumber: 356,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
            lineNumber: 355,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (isDeployed === false) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$ErrorNotDeployed$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["errorNotDeployed"])(chainId);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-card rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold text-white tracking-wide",
                                children: "Sanctuary Status"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                lineNumber: 380,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-3 text-xs font-medium",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-2 py-1 bg-purple-500/10 text-purple-300 rounded-md border border-purple-500/20",
                                        children: [
                                            "User: ",
                                            address?.slice(0, 6),
                                            "...",
                                            address?.slice(-4)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                        lineNumber: 382,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    dreams.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-2 py-1 bg-indigo-500/10 text-indigo-300 rounded-md border border-indigo-500/20",
                                        children: [
                                            "Total Dreams: ",
                                            dreams.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                        lineNumber: 386,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                lineNumber: 381,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                        lineNumber: 379,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium text-purple-300 animate-pulse",
                                children: message
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                lineNumber: 394,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$rainbow$2d$me$2f$rainbowkit$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ConnectButton"], {}, void 0, false, {
                                fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                lineNumber: 396,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                        lineNumber: 392,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                lineNumber: 378,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-5 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 space-y-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass-card rounded-2xl p-6 sticky top-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold mb-6 text-white border-b border-white/5 pb-4",
                                    children: "New Dream Entry"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                    lineNumber: 405,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-xs font-bold text-purple-300/60 uppercase tracking-widest mb-2 ml-1",
                                                    children: "Dream Title"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                    lineNumber: 410,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: title,
                                                    onChange: (e)=>setTitle(sanitizeInput(e.target.value)),
                                                    placeholder: "The Flying Castle...",
                                                    className: "w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all outline-none text-white placeholder:text-white/20",
                                                    disabled: isCreating,
                                                    maxLength: 200
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                    lineNumber: 413,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 text-[10px] text-right text-white/40 font-mono",
                                                    children: [
                                                        title.length,
                                                        "/200"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                    lineNumber: 422,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                            lineNumber: 409,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-xs font-bold text-purple-300/60 uppercase tracking-widest mb-2 ml-1",
                                                    children: "Dream Content"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                    lineNumber: 428,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    value: content,
                                                    onChange: (e)=>setContent(sanitizeInput(e.target.value)),
                                                    placeholder: "It started in a valley of shadows...",
                                                    rows: 6,
                                                    className: "w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all outline-none text-white placeholder:text-white/20 resize-none",
                                                    disabled: isCreating,
                                                    maxLength: 10000
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                    lineNumber: 431,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 flex justify-between items-center text-[10px] font-mono",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-purple-300/40 italic",
                                                            children: "FHE Encrypted Locally"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                            lineNumber: 441,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/40",
                                                            children: [
                                                                content.length,
                                                                "/10,000"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                            lineNumber: 442,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                    lineNumber: 440,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                            lineNumber: 427,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleCreateDream,
                                            disabled: !canCreate || !isValidInput,
                                            className: "group relative w-full px-6 py-4 bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-bold rounded-xl shadow-xl shadow-purple-950/40 hover:shadow-purple-500/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                    lineNumber: 451,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "relative z-10",
                                                    children: isCreating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center justify-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                                lineNumber: 455,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            "Encrypting..."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                        lineNumber: 454,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)) : "Commit to Blockchain"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                    lineNumber: 452,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                            lineNumber: 446,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                    lineNumber: 408,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                            lineNumber: 404,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                        lineNumber: 403,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-3 space-y-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass-card rounded-2xl p-6 min-h-[500px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center mb-8 border-b border-white/5 pb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold text-white tracking-tight",
                                            children: "Dream Archive"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                            lineNumber: 469,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setIsRefreshing(true);
                                                loadDreams().finally(()=>setIsRefreshing(false));
                                            },
                                            disabled: !canLoadDreams || isLoading || isRefreshing,
                                            className: "p-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-all disabled:opacity-30",
                                            title: "Refresh Archive",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: `w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`,
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                    lineNumber: 482,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                lineNumber: 481,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                            lineNumber: 472,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                    lineNumber: 468,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                dreams.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center justify-center py-20 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 border border-purple-500/20",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-3xl text-purple-400",
                                                children: "✨"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                lineNumber: 490,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                            lineNumber: 489,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/60 font-medium italic",
                                            children: "Your archive is empty"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                            lineNumber: 492,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/30 text-sm mt-1",
                                            children: "First dream is waiting to be captured"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                            lineNumber: 493,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                    lineNumber: 488,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-4",
                                    children: dreams.map((dream)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "group bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-purple-500/30 rounded-2xl p-5 transition-all duration-300",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-bold text-white text-lg group-hover:text-purple-300 transition-colors",
                                                                    children: dream.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                                    lineNumber: 504,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-3 text-[11px] text-white/40 font-medium",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "flex items-center gap-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                    className: "w-3 h-3",
                                                                                    fill: "none",
                                                                                    viewBox: "0 0 24 24",
                                                                                    stroke: "currentColor",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                        strokeLinecap: "round",
                                                                                        strokeLinejoin: "round",
                                                                                        strokeWidth: 2,
                                                                                        d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                                                        lineNumber: 510,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                                                    lineNumber: 509,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                new Date(Number(dream.createdAt) * 1000).toLocaleDateString()
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                                            lineNumber: 508,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "w-1 h-1 bg-white/20 rounded-full"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                                            lineNumber: 514,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "uppercase tracking-widest text-purple-400/60",
                                                                            children: [
                                                                                "ID: ",
                                                                                dream.id.toString()
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                                            lineNumber: 515,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                                    lineNumber: 507,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                            lineNumber: 503,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleDecryptDream(dream.id),
                                                            disabled: dream.isDecrypting || isLoading,
                                                            className: `px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 ${dream.decryptedContent && showDecrypted[dream.id.toString()] ? "bg-white/10 text-white border border-white/20" : "bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30"}`,
                                                            children: dream.isDecrypting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-3 h-3 border-2 border-purple-300/30 border-t-purple-300 rounded-full animate-spin"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                                        lineNumber: 529,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    "Decrypting"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                                lineNumber: 528,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)) : dream.decryptedContent && showDecrypted[dream.id.toString()] ? "Hide Content" : "Decrypt View"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                            lineNumber: 518,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                    lineNumber: 502,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                dream.decryptedContent && showDecrypted[dream.id.toString()] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 p-5 bg-purple-950/20 rounded-xl border border-purple-500/10 animate-in fade-in zoom-in-95 duration-500",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs font-bold text-purple-400/60 uppercase tracking-widest mb-3 flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                                    lineNumber: 539,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                "Decrypted Thought"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                            lineNumber: 538,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-purple-100/90 leading-relaxed whitespace-pre-wrap selection:bg-purple-500/30",
                                                            children: dream.decryptedContent
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                            lineNumber: 542,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                                    lineNumber: 537,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, dream.id.toString(), true, {
                                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                            lineNumber: 498,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                                    lineNumber: 496,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                            lineNumber: 467,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                        lineNumber: 466,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
                lineNumber: 401,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/DreamJournalDemo.tsx",
        lineNumber: 376,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ba0141b4._.js.map