"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";

// Input sanitization utility
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId, useWalletClient } from "wagmi";
import { ethers } from "ethers";
import { useFhevm } from "@/fhevm/useFhevm";
import { useInMemoryStorage } from "@/hooks/useInMemoryStorage";
import { useEthersSigner, useEthersProvider } from "@/hooks/useEthersSigner";
import { useDreamJournal } from "@/hooks/useDreamJournal";
import { errorNotDeployed } from "./ErrorNotDeployed";

export const DreamJournalDemo = () => {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showDecrypted, setShowDecrypted] = useState<Record<string, boolean>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [ethersSigner, setEthersSigner] = useState<ethers.JsonRpcSigner | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { storage: fhevmDecryptionSignatureStorage } = useInMemoryStorage();
  
  const ethersProvider = useEthersProvider({ chainId });

  // Memoize network check to avoid recalculation
  const isCorrectNetwork = useMemo(() =>
    chainId === 31337 || chainId === 11155111,
    [chainId]
  );
  
  // Get EIP1193 provider - for local Hardhat, use RPC URL string directly
  // For other networks, use walletClient transport or window.ethereum
  const eip1193Provider = useMemo(() => {
    if (chainId === 31337) {
      // For local Hardhat, use RPC URL string
      return "http://localhost:8545";
    }
    
    // For other networks, try to get from walletClient
    if (walletClient?.transport) {
      const transport = walletClient.transport as any;
      // Try to extract EIP1193 provider from transport
      if (transport.value && typeof transport.value.request === "function") {
        return transport.value;
      }
      if (typeof transport.request === "function") {
        return transport;
      }
    }
    
    // Fallback to window.ethereum
    if (typeof window !== "undefined" && (window as any).ethereum) {
      return (window as any).ethereum;
    }
    
    return undefined;
  }, [chainId, walletClient]);

  // Convert walletClient to ethers signer
  useEffect(() => {
    if (walletClient) {
      const { account, chain, transport } = walletClient;
      const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
      };

      try {
        // Create provider from transport
        const provider = new ethers.BrowserProvider(transport as any, network);
        provider.getSigner(account.address)
          .then(setEthersSigner)
          .catch((err) => {
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
  }, [walletClient]);

  // FHEVM instance
  const {
    instance: fhevmInstance,
    status: fhevmStatus,
    error: fhevmError,
  } = useFhevm({
    provider: eip1193Provider,
    chainId,
    initialMockChains: { 31337: "http://localhost:8545" },
    enabled: isConnected && !!eip1193Provider,
  });

  // Clean up debug logging for production

  // Same chain/signer refs
  const sameChainRef = useRef((id: number | undefined) => id === chainId);
  const currentSignerAddressRef = useRef<string | undefined>(undefined);
  
  // Update signer address ref when signer changes
  useEffect(() => {
    if (ethersSigner) {
      ethersSigner.getAddress().then((addr) => {
        currentSignerAddressRef.current = addr.toLowerCase();
      }).catch(() => {
        currentSignerAddressRef.current = undefined;
      });
    } else {
      currentSignerAddressRef.current = undefined;
    }
  }, [ethersSigner]);
  
  const sameSignerRef = useRef(async (signer: ethers.JsonRpcSigner | undefined) => {
    if (!signer) {
      return !currentSignerAddressRef.current; // Both undefined
    }
    if (!currentSignerAddressRef.current) {
      return false; // Current signer is undefined but provided signer is not
    }
    try {
      const signerAddress = (await signer.getAddress()).toLowerCase();
      return signerAddress === currentSignerAddressRef.current;
    } catch {
      return false;
    }
  });

  // Dream journal hook
  const {
    contractAddress,
    dreams,
    isLoading,
    isCreating,
    message,
    canCreate,
    canLoadDreams,
    isDeployed,
    createDream,
    loadDreams,
    decryptDream,
  } = useDreamJournal({
    instance: fhevmInstance,
    fhevmDecryptionSignatureStorage,
    eip1193Provider,
    chainId,
    ethersSigner: ethersSigner || undefined,
    ethersReadonlyProvider: ethersProvider || undefined,
    sameChain: sameChainRef,
    sameSigner: sameSignerRef,
  });

  // Memoize validation checks
  const isValidInput = useMemo(() =>
    title.trim().length > 0 &&
    title.trim().length <= 200 &&
    content.trim().length > 0 &&
    content.trim().length <= 10000,
    [title, content]
  );

  const handleCreateDreamRef = useRef(false);
  
  const handleCreateDream = useCallback(() => {
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
      isCreating,
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
    setTimeout(() => {
      handleCreateDreamRef.current = false;
    }, 5000);
  }, [title, content, createDream, fhevmInstance, fhevmStatus, ethersSigner, contractAddress, canCreate, isCreating]);
  
  // Clear form when dream is created successfully and show success message
  useEffect(() => {
    if (message && message.includes("Dream created successfully")) {
      setTitle("");
      setContent("");
      setSuccessMessage(message);
      setError(null);
      // Auto-clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  }, [message]);

  // Clear error messages when user starts typing
  useEffect(() => {
    if (error && (title.length > 0 || content.length > 0)) {
      setError(null);
    }
  }, [title, content, error]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [canCreate, isValidInput, isCreating, handleCreateDream]);

  const handleDecryptDream = useCallback(
    (dreamId: bigint) => {
      const dream = dreams.find((d) => d.id === dreamId);
      if (dream?.decryptedContent) {
        // Toggle display
        setShowDecrypted((prev) => ({
          ...prev,
          [dreamId.toString()]: !prev[dreamId.toString()],
        }));
      } else {
        // Decrypt
        decryptDream(dreamId);
        setShowDecrypted((prev) => ({
          ...prev,
          [dreamId.toString()]: true,
        }));
      }
    },
    [dreams, decryptDream]
  );

  if (!isConnected) {
    return (
      <div className="mx-auto w-full max-w-2xl mt-10">
        <div className="glass-card rounded-2xl p-10 text-center border border-white/10">
          <h2 className="text-4xl font-bold mb-6 text-white text-glow">
            🌙 Welcome to Dream Journal
          </h2>
          <p className="text-purple-200/80 text-lg mb-10 leading-relaxed">
            Connect your wallet to enter your private dream sanctuary. 
            All your thoughts are fully homomorphically encrypted on-chain, 
            ensuring they remain yours and yours alone.
          </p>
          <div className="flex justify-center transform hover:scale-105 transition-transform duration-300">
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

  // Display FHEVM error if present
  if (fhevmError && fhevmStatus === "error") {
    return (
      <div className="mx-auto w-full max-w-2xl mt-10">
        <div className="bg-red-950/30 backdrop-blur-md border border-red-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-red-400">
            FHEVM Initialization Error
          </h2>
          <p className="text-red-300/80 mb-6">
            {fhevmError.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-xl transition-colors shadow-lg shadow-red-900/20"
          >
            Reload Sanctuary
          </button>
        </div>
      </div>
    );
  }

  // Network validation is handled above in isCorrectNetwork memo
  
  if (!isCorrectNetwork && chainId !== undefined) {
    return (
      <div className="mx-auto w-full max-w-2xl mt-10">
        <div className="bg-amber-950/30 backdrop-blur-md border border-amber-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-amber-400">
            Wrong Realm Detected
          </h2>
          <p className="text-amber-200/80 mb-6">
            Please switch to <strong>Hardhat Local</strong> (31337) or <strong>Sepolia</strong> (11155111).
          </p>
          <div className="flex justify-start">
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

  if (isDeployed === false) {
    return errorNotDeployed(chainId);
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Info */}
      <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-white tracking-wide">Sanctuary Status</h2>
          <div className="flex flex-wrap gap-3 text-xs font-medium">
            <span className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded-md border border-purple-500/20">
              User: {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            {dreams.length > 0 && (
              <span className="px-2 py-1 bg-indigo-500/10 text-indigo-300 rounded-md border border-indigo-500/20">
                Total Dreams: {dreams.length}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {message && (
            <span className="text-sm font-medium text-purple-300 animate-pulse">{message}</span>
          )}
          <ConnectButton />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Create Dream Form - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl p-6 sticky top-8">
            <h3 className="text-xl font-bold mb-6 text-white border-b border-white/5 pb-4">
              New Dream Entry
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-purple-300/60 uppercase tracking-widest mb-2 ml-1">
                  Dream Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(sanitizeInput(e.target.value))}
                  placeholder="The Flying Castle..."
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all outline-none text-white placeholder:text-white/20"
                  disabled={isCreating}
                  maxLength={200}
                />
                <div className="mt-2 text-[10px] text-right text-white/40 font-mono">
                  {title.length}/200
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-300/60 uppercase tracking-widest mb-2 ml-1">
                  Dream Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(sanitizeInput(e.target.value))}
                  placeholder="It started in a valley of shadows..."
                  rows={6}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all outline-none text-white placeholder:text-white/20 resize-none"
                  disabled={isCreating}
                  maxLength={10000}
                />
                <div className="mt-2 flex justify-between items-center text-[10px] font-mono">
                  <span className="text-purple-300/40 italic">FHE Encrypted Locally</span>
                  <span className="text-white/40">{content.length}/10,000</span>
                </div>
              </div>

              <button
                onClick={handleCreateDream}
                disabled={!canCreate || !isValidInput}
                className="group relative w-full px-6 py-4 bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-bold rounded-xl shadow-xl shadow-purple-950/40 hover:shadow-purple-500/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10">
                  {isCreating ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Encrypting...
                    </span>
                  ) : "Commit to Blockchain"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Dreams List - Right Column */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-card rounded-2xl p-6 min-h-[500px]">
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Dream Archive
              </h3>
              <button
                onClick={() => {
                  setIsRefreshing(true);
                  loadDreams().finally(() => setIsRefreshing(false));
                }}
                disabled={!canLoadDreams || isLoading || isRefreshing}
                className="p-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-all disabled:opacity-30"
                title="Refresh Archive"
              >
                <svg className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {dreams.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 border border-purple-500/20">
                  <span className="text-3xl text-purple-400">✨</span>
                </div>
                <p className="text-white/60 font-medium italic">Your archive is empty</p>
                <p className="text-white/30 text-sm mt-1">First dream is waiting to be captured</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {dreams.map((dream) => (
                  <div
                    key={dream.id.toString()}
                    className="group bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-purple-500/30 rounded-2xl p-5 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <div className="space-y-1">
                        <h4 className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors">
                          {dream.title}
                        </h4>
                        <div className="flex items-center gap-3 text-[11px] text-white/40 font-medium">
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {new Date(Number(dream.createdAt) * 1000).toLocaleDateString()}
                          </span>
                          <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                          <span className="uppercase tracking-widest text-purple-400/60">ID: {dream.id.toString()}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDecryptDream(dream.id)}
                        disabled={dream.isDecrypting || isLoading}
                        className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 ${
                          dream.decryptedContent && showDecrypted[dream.id.toString()]
                          ? "bg-white/10 text-white border border-white/20"
                          : "bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30"
                        }`}
                      >
                        {dream.isDecrypting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 border-2 border-purple-300/30 border-t-purple-300 rounded-full animate-spin"></div>
                            Decrypting
                          </div>
                        ) : dream.decryptedContent && showDecrypted[dream.id.toString()] ? "Hide Content" : "Decrypt View"}
                      </button>
                    </div>
                    
                    {dream.decryptedContent && showDecrypted[dream.id.toString()] && (
                      <div className="mt-4 p-5 bg-purple-950/20 rounded-xl border border-purple-500/10 animate-in fade-in zoom-in-95 duration-500">
                        <div className="text-xs font-bold text-purple-400/60 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                          Decrypted Thought
                        </div>
                        <p className="text-purple-100/90 leading-relaxed whitespace-pre-wrap selection:bg-purple-500/30">
                          {dream.decryptedContent}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
