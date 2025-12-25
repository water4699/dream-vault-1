module.exports = [
"[project]/frontend/fhevm/internal/mock/fhevmMock.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

//////////////////////////////////////////////////////////////////////////
//
// WARNING!!
// ALWAY USE DYNAMICALLY IMPORT THIS FILE TO AVOID INCLUDING THE ENTIRE 
// FHEVM MOCK LIB IN THE FINAL PRODUCTION BUNDLE!!
//
//////////////////////////////////////////////////////////////////////////
__turbopack_context__.s([
    "fhevmMockCreateInstance",
    ()=>fhevmMockCreateInstance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/ethers/lib.esm/providers/provider-jsonrpc.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$fhevm$2f$mock$2d$utils$2f$_esm$2f$fhevm$2f$MockFhevmInstance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@fhevm/mock-utils/_esm/fhevm/MockFhevmInstance.js [app-ssr] (ecmascript)");
;
;
const fhevmMockCreateInstance = async (parameters)=>{
    const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonRpcProvider"](parameters.rpcUrl);
    const instance = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$fhevm$2f$mock$2d$utils$2f$_esm$2f$fhevm$2f$MockFhevmInstance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MockFhevmInstance"].create(provider, provider, {
        aclContractAddress: parameters.metadata.ACLAddress,
        chainId: parameters.chainId,
        gatewayChainId: 55815,
        inputVerifierContractAddress: parameters.metadata.InputVerifierAddress,
        kmsContractAddress: parameters.metadata.KMSVerifierAddress,
        verifyingContractAddressDecryption: "0x5ffdaAB0373E62E2ea2944776209aEf29E631A64",
        verifyingContractAddressInputVerification: "0x812b06e1CDCE800494b79fFE4f925A504a9A9810"
    });
    return instance;
};
}),
];

//# sourceMappingURL=frontend_fhevm_internal_mock_fhevmMock_ts_96296e9a._.js.map