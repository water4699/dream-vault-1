import { useMemo } from "react";
import { useWalletClient, usePublicClient } from "wagmi";
import { BrowserProvider, JsonRpcSigner, JsonRpcProvider } from "ethers";

async function walletClientToSigner(walletClient: any): Promise<JsonRpcSigner> {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };

  // Handle different transport types
  let provider: BrowserProvider;
  if (transport && typeof transport === "object" && "request" in transport) {
    // EIP1193 provider
    provider = new BrowserProvider(transport as any, network);
  } else {
    // Fallback to window.ethereum
    if (typeof window !== "undefined" && (window as any).ethereum) {
      provider = new BrowserProvider((window as any).ethereum, network);
    } else {
      throw new Error("No provider available");
    }
  }
  
  const signer = await provider.getSigner(account.address);
  return signer;
}

function publicClientToProvider(publicClient: any): JsonRpcProvider | undefined {
  if (!publicClient) return undefined;
  
  const { chain, transport } = publicClient;
  if (!chain) return undefined;

  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };

  // Handle http transport
  if (transport && typeof transport === "object") {
    if ("url" in transport && typeof transport.url === "string") {
      return new JsonRpcProvider(transport.url, network, { staticNetwork: true });
    }
    // Try to get URL from transport config
    if ("value" in transport && transport.value && "url" in transport.value) {
      return new JsonRpcProvider(transport.value.url, network, { staticNetwork: true });
    }
  }
  
  // Fallback: use chain RPC URL
  if (chain.rpcUrls && chain.rpcUrls.default && chain.rpcUrls.default.http && chain.rpcUrls.default.http[0]) {
    return new JsonRpcProvider(chain.rpcUrls.default.http[0], network, { staticNetwork: true });
  }
  
  return undefined;
}

export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  // Note: This returns a Promise, handle it in the component
  return walletClient ? walletClientToSigner(walletClient) : undefined;
}

export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = usePublicClient({ chainId });
  return useMemo(
    () => publicClientToProvider(publicClient),
    [publicClient]
  );
}

