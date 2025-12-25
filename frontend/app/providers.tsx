"use client";

import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "@/config/wagmi";
import { InMemoryStorageProvider } from "@/hooks/useInMemoryStorage";

import "@rainbow-me/rainbowkit/styles.css";

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export function Providers({ children }: Props) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <InMemoryStorageProvider>{children}</InMemoryStorageProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

