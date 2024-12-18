'use client'
import { createConfig, WagmiProvider, http} from 'wagmi';
import { mainnet, base } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { coinbaseWallet, injected } from 'wagmi/connectors'

const config = createConfig({
  chains: [mainnet, base],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
  connectors: [
    coinbaseWallet({ 
      appName: 'Fast DeFi', 
      appLogoUrl: 'https://fast-defi.com/images/fdt-circle.png'
    }),
    injected()
  ],
});

const queryClient = new QueryClient()

export function Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}