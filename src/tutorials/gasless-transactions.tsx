import {
  useSendTransaction,
  useConnectors,
  createConfig,
  WagmiProvider,
} from "wagmi";
import { type Chain, http, zeroAddress } from "viem";
import { useOwlSimpleSmartAccount } from "@owlprotocol/ui-components";
import { API_REST_BASE_URL } from "@owlprotocol/envvars/browser";
import { trpc } from "@owlprotocol/core-trpc/react-query";
import {
  connectorsForWallets,
  RainbowKitProvider,
  ConnectButton,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";

import "@rainbow-me/rainbowkit/styles.css";

const GaslessTransactionInnerComponent = () => {
  const { sendTransaction, data: txHash } = useSendTransaction();
  const currConnectors = useConnectors();

  useOwlSimpleSmartAccount({
    owlApiRestBaseUrl: API_REST_BASE_URL,
  });

  return (
    <>
      <ConnectButton />

      <button
        onClick={() =>
          // A dummy transaction. Note that no ether is sent.
          sendTransaction({
            to: zeroAddress,
            value: 0n,
            data: "0x",
          })
        }
      >
        Send test transaction
      </button>

      <p>{!!txHash && `Transaction Hash: ${txHash}`}</p>

      {/* Need to disconnect all connectors since we are connecting to two connectors, the main connector and the smart account connector */}
      <button onClick={() => currConnectors.forEach((c) => c.disconnect())}>
        Disconnect All
      </button>

      <br />
    </>
  );
};

export const GaslessTransactionComponent = () => {
  // Get Hedwig Testnet chain data
  const [owlChain] = trpc.network.get.useSuspenseQuery({ chainId: 150150 });
  const chains = [owlChain] as readonly [Chain];

  const connectors = connectorsForWallets(
    [
      {
        groupName: "Recommended",
        wallets: [metaMaskWallet],
      },
    ],
    { projectId: "owlProtocol", appName: "Owl React Tutorials" }
  );

  const config = createConfig({
    chains,
    connectors,
    transports: { [owlChain.id]: http(owlChain.rpcUrls.default.http[0]) },
  });

  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider theme={darkTheme()}>
        <GaslessTransactionInnerComponent />
      </RainbowKitProvider>
    </WagmiProvider>
  );
};
