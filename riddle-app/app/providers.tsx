"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/clients/wagmi.client";
import client from "@/lib/clients/appolo.client";
import { ApolloProvider } from "@apollo/client";

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <ApolloProvider client={client}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </ApolloProvider>
  );
}