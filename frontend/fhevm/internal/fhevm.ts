import { isAddress, Eip1193Provider, JsonRpcProvider } from "ethers";
import type {
  FhevmInitSDKOptions,
  FhevmInitSDKType,
  FhevmLoadSDKType,
  FhevmWindowType,
} from "./fhevmTypes";
import { isFhevmWindowType, RelayerSDKLoader } from "./RelayerSDKLoader";
import { publicKeyStorageGet, publicKeyStorageSet } from "./PublicKeyStorage";
import { FhevmInstance, FhevmInstanceConfig } from "../fhevmTypes";

export class FhevmReactError extends Error {
  code: string;
  constructor(code: string, message?: string, options?: ErrorOptions) {
    super(message, options);
    this.code = code;
    this.name = "FhevmReactError";
  }
}

function throwFhevmError(
  code: string,
  message?: string,
  cause?: unknown
): never {
  throw new FhevmReactError(code, message, cause ? { cause } : undefined);
}

const isFhevmInitialized = (): boolean => {
  if (!isFhevmWindowType(window, console.log)) {
    return false;
  }
  return window.relayerSDK.__initialized__ === true;
};

const fhevmLoadSDK: FhevmLoadSDKType = () => {
  const loader = new RelayerSDKLoader({ trace: console.log });
  return loader.load();
};

const fhevmInitSDK: FhevmInitSDKType = async (
  options?: FhevmInitSDKOptions
) => {
  if (!isFhevmWindowType(window, console.log)) {
    throw new Error("window.relayerSDK is not available");
  }
  const result = await window.relayerSDK.initSDK(options);
  window.relayerSDK.__initialized__ = result;
  if (!result) {
    throw new Error("window.relayerSDK.initSDK failed.");
  }
  return true;
};

function checkIsAddress(a: unknown): a is `0x${string}` {
  if (typeof a !== "string") {
    return false;
  }
  if (!isAddress(a)) {
    return false;
  }
  return true;
}

export class FhevmAbortError extends Error {
  constructor(message = "FHEVM operation was cancelled") {
    super(message);
    this.name = "FhevmAbortError";
  }
}

type FhevmRelayerStatusType =
  | "sdk-loading"
  | "sdk-loaded"
  | "sdk-initializing"
  | "sdk-initialized"
  | "creating";

async function getChainId(
  providerOrUrl: Eip1193Provider | string
): Promise<number> {
  try {
    if (typeof providerOrUrl === "string") {
      const provider = new JsonRpcProvider(providerOrUrl, undefined, {
        staticNetwork: true,
      });
      // Add timeout and better error handling
      const network = await Promise.race([
        provider.getNetwork(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Network request timeout")), 10000)
        ),
      ]);
      provider.destroy();
      return Number(network.chainId);
    }
    // For EIP1193 provider, add timeout
    const chainId = await Promise.race([
      providerOrUrl.request({ method: "eth_chainId" }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Provider request timeout")), 10000)
      ),
    ]);
    return Number.parseInt(chainId as string, 16);
  } catch (error: any) {
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

async function getWeb3Client(rpcUrl: string) {
  const rpc = new JsonRpcProvider(rpcUrl, undefined, {
    staticNetwork: true,
  });
  try {
    // Add timeout to prevent hanging
    const version = await Promise.race([
      rpc.send("web3_clientVersion", []),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("RPC request timeout")), 10000)
      ),
    ]);
    return version;
  } catch (e: any) {
    // Don't throw error - let caller handle it gracefully
    // This is expected if the node is not running or not accessible
    throw e;
  } finally {
    rpc.destroy();
  }
}

async function tryFetchFHEVMHardhatNodeRelayerMetadata(rpcUrl: string): Promise<
  | {
      ACLAddress: `0x${string}`;
      InputVerifierAddress: `0x${string}`;
      KMSVerifierAddress: `0x${string}`;
    }
  | undefined
> {
  try {
    const version = await getWeb3Client(rpcUrl);
    if (
      typeof version !== "string" ||
      !version.toLowerCase().includes("hardhat")
    ) {
      // Not a Hardhat Node - this is normal, not an error
      return undefined;
    }
  } catch (e: any) {
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
    if (
      !(
        "ACLAddress" in metadata &&
        typeof metadata.ACLAddress === "string" &&
        metadata.ACLAddress.startsWith("0x")
      )
    ) {
      return undefined;
    }
    if (
      !(
        "InputVerifierAddress" in metadata &&
        typeof metadata.InputVerifierAddress === "string" &&
        metadata.InputVerifierAddress.startsWith("0x")
      )
    ) {
      return undefined;
    }
    if (
      !(
        "KMSVerifierAddress" in metadata &&
        typeof metadata.KMSVerifierAddress === "string" &&
        metadata.KMSVerifierAddress.startsWith("0x")
      )
    ) {
      return undefined;
    }
    return metadata;
  } catch (e: any) {
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

async function getFHEVMRelayerMetadata(rpcUrl: string) {
  const rpc = new JsonRpcProvider(rpcUrl, undefined, {
    staticNetwork: true,
  });
  try {
    // Add timeout to prevent hanging
    const version = await Promise.race([
      rpc.send("fhevm_relayer_metadata", []),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("RPC request timeout")), 10000)
      ),
    ]);
    return version;
  } catch (e: any) {
    // Don't throw error - let caller handle it gracefully
    // This is expected if the node doesn't support FHEVM
    throw e;
  } finally {
    rpc.destroy();
  }
}

type MockResolveResult = { isMock: true; chainId: number; rpcUrl: string };
type GenericResolveResult = { isMock: false; chainId: number; rpcUrl?: string };
type ResolveResult = MockResolveResult | GenericResolveResult;

async function resolve(
  providerOrUrl: Eip1193Provider | string,
  mockChains?: Record<number, string>
): Promise<ResolveResult> {
  try {
    const chainId = await getChainId(providerOrUrl);
    let rpcUrl = typeof providerOrUrl === "string" ? providerOrUrl : undefined;

    const _mockChains: Record<number, string> = {
      31337: "http://localhost:8545",
      ...(mockChains ?? {}),
    };

    if (Object.hasOwn(_mockChains, chainId)) {
      if (!rpcUrl) {
        rpcUrl = _mockChains[chainId];
      }
      return { isMock: true, chainId, rpcUrl };
    }

    return { isMock: false, chainId, rpcUrl };
  } catch (error: any) {
    // If we can't get chainId, but providerOrUrl is a string (RPC URL),
    // we can still try to use it as a mock chain if it matches
    if (typeof providerOrUrl === "string") {
      const _mockChains: Record<number, string> = {
        31337: "http://localhost:8545",
        ...(mockChains ?? {}),
      };
      
      // Check if the URL matches any mock chain
      for (const [chainId, url] of Object.entries(_mockChains)) {
        if (providerOrUrl === url || providerOrUrl.includes(url.replace("http://", "").replace("https://", ""))) {
          console.debug(`[FHEVM] Using mock chain ${chainId} for ${providerOrUrl} (chainId fetch failed but URL matches)`);
          return { isMock: true, chainId: Number(chainId), rpcUrl: providerOrUrl };
        }
      }
      
      // If it's a localhost URL, assume it's mock chain 31337
      if (providerOrUrl.includes("localhost") || providerOrUrl.includes("127.0.0.1")) {
        console.debug(`[FHEVM] Assuming localhost URL ${providerOrUrl} is mock chain 31337`);
        return { isMock: true, chainId: 31337, rpcUrl: providerOrUrl };
      }
    }
    
    // Completely suppress "Failed to fetch" errors
    const errorMessage = error?.message || String(error);
    if (errorMessage.includes("Failed to fetch") || errorMessage.includes("fetch") || errorMessage === "CHAIN_ID_UNAVAILABLE") {
      // For string URLs, try to infer from URL pattern
      if (typeof providerOrUrl === "string") {
        const _mockChains: Record<number, string> = {
          31337: "http://localhost:8545",
          ...(mockChains ?? {}),
        };
        
        // Check if the URL matches any mock chain
        for (const [chainId, url] of Object.entries(_mockChains)) {
          if (providerOrUrl === url || providerOrUrl.includes(url.replace("http://", "").replace("https://", ""))) {
            return { isMock: true, chainId: Number(chainId), rpcUrl: providerOrUrl };
          }
        }
        
        // If it's a localhost URL, assume it's mock chain 31337
        if (providerOrUrl.includes("localhost") || providerOrUrl.includes("127.0.0.1")) {
          return { isMock: true, chainId: 31337, rpcUrl: providerOrUrl };
        }
      }
      
      // For EIP1193 providers, can't determine chainId, return as non-mock
      // This is fine - the instance will work without mock mode
      return { isMock: false, chainId: 0, rpcUrl: undefined };
    }
    throw error;
  }
}

export const createFhevmInstance = async (parameters: {
  provider: Eip1193Provider | string;
  mockChains?: Record<number, string>;
  signal: AbortSignal;
  onStatusChange?: (status: FhevmRelayerStatusType) => void;
}): Promise<FhevmInstance> => {
  const throwIfAborted = () => {
    if (signal.aborted) throw new FhevmAbortError();
  };

  const notify = (status: FhevmRelayerStatusType) => {
    if (onStatusChange) onStatusChange(status);
  };

  const {
    signal,
    onStatusChange,
    provider: providerOrUrl,
    mockChains,
  } = parameters;

  let isMock: boolean;
  let rpcUrl: string | undefined;
  let chainId: number;
  
  try {
    const resolved = await resolve(providerOrUrl, mockChains);
    isMock = resolved.isMock;
    rpcUrl = resolved.rpcUrl;
    chainId = resolved.chainId;
  } catch (error: any) {
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

  if (isMock && rpcUrl) {
    const fhevmRelayerMetadata =
      await tryFetchFHEVMHardhatNodeRelayerMetadata(rpcUrl);

    if (fhevmRelayerMetadata) {
      notify("creating");
      const fhevmMock = await import("./mock/fhevmMock");
      const mockInstance = await fhevmMock.fhevmMockCreateInstance({
        rpcUrl,
        chainId,
        metadata: fhevmRelayerMetadata,
      });

      throwIfAborted();
      return mockInstance;
    }
  }

  throwIfAborted();

  if (!isFhevmWindowType(window, console.log)) {
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

  const relayerSDK = (window as unknown as FhevmWindowType).relayerSDK;

  const aclAddress = relayerSDK.SepoliaConfig.aclContractAddress;
  if (!checkIsAddress(aclAddress)) {
    throw new Error(`Invalid address: ${aclAddress}`);
  }

  const pub = await publicKeyStorageGet(aclAddress);
  throwIfAborted();

  const config: FhevmInstanceConfig = {
    ...relayerSDK.SepoliaConfig,
    network: providerOrUrl,
    publicKey: pub.publicKey,
    publicParams: pub.publicParams,
  };

  notify("creating");

  const instance = await relayerSDK.createInstance(config);

  await publicKeyStorageSet(
    aclAddress,
    instance.getPublicKey(),
    instance.getPublicParams(2048)
  );

  throwIfAborted();

  return instance;
};

