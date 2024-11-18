'use client'
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider,darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { arbitrum, base, mainnet, optimism, polygon, zksync } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'FastDeFiTutorial',
  projectId: 'c3ec1ca5da4d9515628d909ef45635c8',
  chains: [ base, mainnet, optimism, polygon, arbitrum, zksync],
  ssr: true
});

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme()}>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
