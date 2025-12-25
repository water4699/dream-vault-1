"use client";

import { ethers } from "ethers";
import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FhevmInstance } from "@/fhevm/fhevmTypes";
import { FhevmDecryptionSignature } from "@/fhevm/FhevmDecryptionSignature";
import { GenericStringStorage } from "@/fhevm/GenericStringStorage";
import { DreamJournalAddresses } from "@/abi/DreamJournalAddresses";
import { DreamJournalABI } from "@/abi/DreamJournalABI";

type DreamInfoType = {
  abi: typeof DreamJournalABI.abi;
  address?: `0x${string}`;
  chainId?: number;
  chainName?: string;
};

export type Dream = {
  id: bigint;
  title: string;
  owner: string;
  createdAt: bigint;
  decryptedContent?: string;
  isDecrypting?: boolean;
};

/**
 * Resolves DreamJournal contract metadata for the given EVM `chainId`.
 */
function getDreamJournalByChainId(
  chainId: number | undefined
): DreamInfoType {
  if (!chainId) {
    return { abi: DreamJournalABI.abi };
  }

  const entry =
    DreamJournalAddresses[chainId.toString() as keyof typeof DreamJournalAddresses];

  if (!("address" in entry) || entry.address === ethers.ZeroAddress) {
    return { abi: DreamJournalABI.abi, chainId };
  }

  return {
    address: entry?.address as `0x${string}` | undefined,
    chainId: entry?.chainId ?? chainId,
    chainName: entry?.chainName,
    abi: DreamJournalABI.abi,
  };
}

export const useDreamJournal = (parameters: {
  instance: FhevmInstance | undefined;
  fhevmDecryptionSignatureStorage: GenericStringStorage;
  eip1193Provider: ethers.Eip1193Provider | undefined;
  chainId: number | undefined;
  ethersSigner: ethers.JsonRpcSigner | undefined;
  ethersReadonlyProvider: ethers.ContractRunner | undefined;
  sameChain: RefObject<(chainId: number | undefined) => boolean>;
  sameSigner: RefObject<
    (ethersSigner: ethers.JsonRpcSigner | undefined) => boolean | Promise<boolean>
  >;
}) => {
  const {
    instance,
    fhevmDecryptionSignatureStorage,
    chainId,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain,
    sameSigner,
  } = parameters;

  // States
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  
  const dreamJournalRef = useRef<DreamInfoType | undefined>(undefined);
  const isLoadingRef = useRef<boolean>(false);
  const isCreatingRef = useRef<boolean>(false);

  // Contract info
  const dreamJournal = useMemo(() => {
    const c = getDreamJournalByChainId(chainId);
    dreamJournalRef.current = c;
    if (!c.address) {
      setMessage(`DreamJournal deployment not found for chainId=${chainId}.`);
    }
    return c;
  }, [chainId]);

  const isDeployed = useMemo(() => {
    if (!dreamJournal) {
      return undefined;
    }
    return Boolean(dreamJournal.address) && dreamJournal.address !== ethers.ZeroAddress;
  }, [dreamJournal]);

  const canCreate = useMemo(() => {
    // Allow creating even if instance is not ready - it will be checked in createDream
    return Boolean(dreamJournal.address && ethersSigner && !isCreating && !isLoading);
  }, [dreamJournal.address, ethersSigner, isCreating, isLoading]);

  const canLoadDreams = useMemo(() => {
    return dreamJournal.address && ethersReadonlyProvider && ethersSigner && !isLoading;
  }, [dreamJournal.address, ethersReadonlyProvider, ethersSigner, isLoading]);

  // Load user's dreams
  const loadDreams = useCallback(() => {
    if (isLoadingRef.current) {
      return;
    }

    if (
      !dreamJournalRef.current ||
      !dreamJournalRef.current?.chainId ||
      !dreamJournalRef.current?.address ||
      !ethersReadonlyProvider ||
      !ethersSigner
    ) {
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

    const contract = new ethers.Contract(
      thisContractAddress,
      dreamJournalRef.current.abi,
      thisEthersReadonlyProvider
    );

    const run = async () => {
      try {
        const userAddress = await thisEthersSigner.getAddress();
        const dreamIds = await contract.getDreamIds(userAddress);
        
        if (
          !sameChain.current(thisChainId) ||
          thisContractAddress !== dreamJournalRef.current?.address
        ) {
          return;
        }

        const dreamList: Dream[] = [];
        
        for (let i = 0; i < dreamIds.length; i++) {
          const id = dreamIds[i];
          const [owner, title, createdAt] = await contract.getDreamMeta(id);
          
          dreamList.push({
            id: BigInt(id),
            title,
            owner,
            createdAt: BigInt(createdAt),
          });
        }

        if (
          sameChain.current(thisChainId) &&
          thisContractAddress === dreamJournalRef.current?.address
        ) {
          setDreams(dreamList);
          setMessage(`Loaded ${dreamList.length} dream(s)`);
        }
      } catch (e) {
        setMessage("Failed to load dreams: " + e);
        if (
          sameChain.current(thisChainId) &&
          thisContractAddress === dreamJournalRef.current?.address
        ) {
          setDreams([]);
        }
      } finally {
        isLoadingRef.current = false;
        setIsLoading(false);
      }
    };

    run();
  }, [ethersReadonlyProvider, ethersSigner, sameChain]);

  // Auto load dreams - use ref to prevent infinite loop
  const canLoadDreamsRef = useRef(false);
  const lastLoadRef = useRef<string>("");
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    canLoadDreamsRef.current = canLoadDreams;
  }, [canLoadDreams]);

  useEffect(() => {
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
      loadTimeoutRef.current = setTimeout(() => {
        if (!isLoadingRef.current) {
          loadDreams();
        }
        loadTimeoutRef.current = null;
      }, 300); // Increased debounce time
    }

    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }
    };
  }, [dreamJournal.address, chainId, ethersReadonlyProvider, ethersSigner, canLoadDreams, loadDreams]);

  // Create new dream
  const createDream = useCallback(
    (title: string, content: string) => {
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
          hasSigner: !!ethersSigner,
        });
        isCreatingRef.current = false;
        setIsCreating(false);
        return;
      }

      const thisChainId = chainId;
      const thisContractAddress = dreamJournal.address;
      const thisEthersSigner = ethersSigner;
      const thisContract = new ethers.Contract(
        thisContractAddress,
        dreamJournal.abi,
        thisEthersSigner
      );

      isCreatingRef.current = true;
      setIsCreating(true);
      setMessage("Encrypting dream content...");

      const run = async () => {
        // Let browser repaint before encryption (CPU-intensive)
        await new Promise((resolve) => setTimeout(resolve, 100));

        const isStale = () =>
          thisContractAddress !== dreamJournalRef.current?.address ||
          !sameChain.current(thisChainId) ||
          !sameSigner.current(thisEthersSigner);

        try {
          // Convert string to bytes
          const contentBytes = ethers.toUtf8Bytes(content);

          // Encrypt each byte
          const encryptedInput = instance.createEncryptedInput(
            thisContractAddress,
            thisEthersSigner.address
          );

          for (let i = 0; i < contentBytes.length; i++) {
            encryptedInput.add8(contentBytes[i]);
          }

          // Encrypt (CPU-intensive)
          console.log("[createDream] Starting encryption...");
          console.log("[createDream] Encryption context:", {
            contractAddress: thisContractAddress,
            userAddress: thisEthersSigner.address,
            chainId: thisChainId,
            isMock: false, // Sepolia uses real relayer
          });
          
          let encrypted;
          try {
            encrypted = await encryptedInput.encrypt();
            console.log("[createDream] Encryption completed, handles:", encrypted.handles.length);
          } catch (encryptError: any) {
            const errorMsg = encryptError?.message || String(encryptError);
            console.error("[createDream] Encryption failed:", {
              error: errorMsg,
              name: encryptError?.name,
              stack: encryptError?.stack,
            });
            
            // Provide user-friendly error message
            if (errorMsg.includes("Relayer") || errorMsg.includes("Bad JSON")) {
              throw new Error(
                `FHEVM Relayer error: ${errorMsg}\n\n` +
                `This may be a temporary issue with the FHEVM Relayer service on Sepolia.\n` +
                `Please try again in a few moments, or switch to Hardhat Local network for testing.`
              );
            }
            throw encryptError;
          }
          console.log("[createDream] Handles type check:", {
            isArray: Array.isArray(encrypted.handles),
            firstHandleType: typeof encrypted.handles[0],
            firstHandleValue: encrypted.handles[0],
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
              thisChainId,
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
              signerAddress,
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
          const firstHandlePreview = typeof firstHandle === 'string' 
            ? firstHandle.substring(0, 20) + "..." 
            : String(firstHandle || 'undefined').substring(0, 30);

          console.log("[createDream] Prepared handles array:", {
            arrayLength: handlesArray.length,
            firstHandle: firstHandlePreview,
            firstHandleType: typeof firstHandle,
            hasInputProof: !!encrypted.inputProof,
            inputProofLength: encrypted.inputProof?.length || 0,
          });

          // Call contract
          console.log("[createDream] Calling createDream contract method...", {
            title,
            encryptedBytes: handlesArray.length,
            hasInputProof: !!encrypted.inputProof,
            contractAddress: thisContractAddress,
          });

          const tx: ethers.TransactionResponse = await thisContract.createDream(
            title,
            handlesArray,
            encrypted.inputProof
          );
          
          console.log("[createDream] Transaction sent:", tx.hash);
          console.log("[createDream] Transaction details:", {
            hash: tx.hash,
            to: tx.to,
            from: tx.from,
            value: tx.value?.toString(),
          });
          setMessage(`Wait for tx:${tx.hash}...`);

          const receipt = await tx.wait();

          setMessage(`Dream created! status=${receipt?.status}`);
          console.log("[createDream] Dream created successfully!", { txHash: tx.hash, status: receipt?.status });

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
        } catch (e: any) {
          const errorMsg = e?.message || "Failed to create dream";
          setMessage(`Create dream failed: ${errorMsg}`);
          console.error("[createDream] Error:", e);
          console.error("[createDream] Error details:", {
            name: e?.name,
            message: errorMsg,
            code: e?.code,
            data: e?.data,
            reason: e?.reason,
            stack: e?.stack,
          });
          
          // Show alert for user-friendly error message
          if (errorMsg.includes("user rejected") || errorMsg.includes("User denied") || errorMsg.includes("rejected") || errorMsg.includes("User rejected")) {
            alert("Transaction was cancelled. Please try again when ready.");
          } else if (errorMsg.includes("insufficient funds") || errorMsg.includes("insufficient balance")) {
            alert("Insufficient funds. Please add ETH to your wallet.");
          } else if (errorMsg.includes("Relayer") || errorMsg.includes("Bad JSON")) {
            alert(
              "FHEVM Relayer Error\n\n" +
              "The FHEVM Relayer service on Sepolia may be temporarily unavailable or experiencing issues.\n\n" +
              "Suggestions:\n" +
              "1. Wait a few moments and try again\n" +
              "2. Switch to Hardhat Local network for local testing\n" +
              "3. Check the browser console (F12) for more details\n\n" +
              `Error: ${errorMsg}`
            );
          } else if (errorMsg.includes("network") || errorMsg.includes("Network") || errorMsg.includes("ECONNREFUSED")) {
            alert(`Network error: ${errorMsg}\n\nPlease check:\n1. Hardhat node is running (npx hardhat node)\n2. Wallet is connected to Hardhat Local network (Chain ID: 31337)`);
          } else {
            alert(`Failed to create dream: ${errorMsg}\n\nCheck the browser console (F12) for more details.`);
          }
        } finally {
          isCreatingRef.current = false;
          setIsCreating(false);
        }
      };

      run();
    },
    [
      dreamJournal.address,
      dreamJournal.abi,
      instance,
      chainId,
      ethersSigner,
      loadDreams,
      sameChain,
      sameSigner,
    ]
  );

  // Decrypt dream content
  const decryptDream = useCallback(
    (dreamId: bigint) => {
      if (isLoadingRef.current) {
        return;
      }

      if (!dreamJournal.address || !instance || !ethersSigner || !ethersReadonlyProvider) {
        return;
      }

      // Check if already decrypted
      const dream = dreams.find((d) => d.id === dreamId);
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
      setDreams((prev) =>
        prev.map((d) => (d.id === dreamId ? { ...d, isDecrypting: true } : d))
      );
      setMessage(`Decrypting dream #${dreamId}...`);

      const run = async () => {
        const isStale = async () => {
          const addressMatch = thisContractAddress === dreamJournalRef.current?.address;
          const chainMatch = sameChain.current(thisChainId);
          const signerCheck = sameSigner.current(thisEthersSigner);
          const signerMatch = typeof signerCheck === 'boolean' ? signerCheck : await signerCheck;
          return !addressMatch || !chainMatch || !signerMatch;
        };

        try {
          const contract = new ethers.Contract(
            thisContractAddress,
            dreamJournalRef.current!.abi,
            thisEthersReadonlyProvider
          );

          // Get content length
          const length = await contract.getDreamContentLength(dreamId);
          
          if (await isStale()) {
            return;
          }

          // Get decryption signature
          const sig: FhevmDecryptionSignature | null =
            await FhevmDecryptionSignature.loadOrSign(
              instance,
              [thisContractAddress as `0x${string}`],
              thisEthersSigner,
              fhevmDecryptionSignatureStorage
            );

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
          const decryptedBytes: number[] = [];
          
          // Get all encrypted bytes first
          const encryptedBytes: string[] = [];
          for (let i = 0; i < Number(length); i++) {
            if (await isStale()) {
              return;
            }
            const encByte = await contract.getDreamContentByte(dreamId, i);
            // Convert to bytes32 format (handle)
            const handle = typeof encByte === "string" ? encByte : ethers.hexlify(encByte);
            encryptedBytes.push(handle);
          }

          if (await isStale()) {
            setMessage("Ignore decryption");
            return;
          }

          // Prepare handle-contract pairs for batch decryption
          const handleContractPairs = encryptedBytes.map((handle) => ({
            handle,
            contractAddress: thisContractAddress,
          }));

          setMessage("Decrypting content...");

          // Decrypt all bytes at once (more efficient)
          const decryptedResult = await instance.userDecrypt(
            handleContractPairs,
            sig.privateKey,
            sig.publicKey,
            sig.signature,
            sig.contractAddresses,
            sig.userAddress,
            sig.startTimestamp,
            sig.durationDays
          );

          if (await isStale()) {
            setMessage("Ignore decryption");
            return;
          }

          // Extract decrypted values
          for (let i = 0; i < encryptedBytes.length; i++) {
            const handle = encryptedBytes[i];
            const decryptedValue = decryptedResult[handle];
            if (decryptedValue !== undefined) {
              decryptedBytes.push(Number(decryptedValue));
            } else {
              // Fallback: decrypt individually if batch fails
              console.warn(`Failed to decrypt byte ${i}, trying individually...`);
              const individualResult = await instance.userDecrypt(
                [{ handle, contractAddress: thisContractAddress }],
                sig.privateKey,
                sig.publicKey,
                sig.signature,
                sig.contractAddresses,
                sig.userAddress,
                sig.startTimestamp,
                sig.durationDays
              );
              decryptedBytes.push(Number(individualResult[handle] || 0));
            }
          }

          if (await isStale()) {
            setMessage("Ignore decryption");
            return;
          }

          // Convert bytes to string
          const decryptedContent = ethers.toUtf8String(new Uint8Array(decryptedBytes));

          // Update dream with decrypted content
          setDreams((prev) =>
            prev.map((d) =>
              d.id === dreamId
                ? { ...d, decryptedContent, isDecrypting: false }
                : { ...d, isDecrypting: false }
            )
          );

          setMessage("Decryption completed!");
        } catch (e: any) {
          const errorMsg = e?.message || "Failed to decrypt dream";
          setMessage(`Decryption failed: ${errorMsg}`);
          setDreams((prev) =>
            prev.map((d) => (d.id === dreamId ? { ...d, isDecrypting: false } : d))
          );
        } finally {
          isLoadingRef.current = false;
          setIsLoading(false);
        }
      };

      run();
    },
    [
      dreamJournal.address,
      dreams,
      instance,
      chainId,
      ethersSigner,
      ethersReadonlyProvider,
      fhevmDecryptionSignatureStorage,
      sameChain,
      sameSigner,
    ]
  );

  const refreshDreams = useCallback(() => {
    return loadDreams();
  }, [loadDreams]);

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
    decryptDream,
  };
};

