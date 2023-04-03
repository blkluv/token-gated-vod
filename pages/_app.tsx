import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Toaster } from "react-hot-toast";
import {
  createReactClient,
  LivepeerConfig,
  studioProvider,
} from "@livepeer/react";
import "lit-share-modal-v3/dist/ShareModal.css";
import { LitProvider } from "../hooks/useLit";

export default function App({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains([mainnet], [publicProvider()]);

  const { connectors } = getDefaultWallets({
    appName: "Livepeer VOD Tokengated app",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  const client = createReactClient({
    provider: studioProvider({
      apiKey: "2cedff44-a68e-4149-9345-e2b25b1cdbd2",
    }),
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize="compact"
        chains={chains}
        theme={darkTheme({
          accentColor: "#F3BA2F",
        })}
      >
        <LitProvider>
          <LivepeerConfig client={client}>
            <Component {...pageProps} />
          </LivepeerConfig>
        </LitProvider>

        <Toaster />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
