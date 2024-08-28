import { trpc } from "@owlprotocol/core-trpc/react-query";
import {
  getOwlWallet,
  OwlConnectButton,
  useOwlSimpleSmartAccount,
  useOwlTrpcContext,
} from "@owlprotocol/ui-components";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { Chain, http, zeroAddress } from "viem";
import {
  createConfig,
  useConnectors,
  useSendTransaction,
  WagmiProvider,
} from "wagmi";

const projectId = import.meta.env.VITE_PROJECT_ID;

if (!projectId || projectId === "PROJECT_ID")
  throw new Error("VITE_PROJECT_ID must be defined!");

export const OwlWalletTestInner = () => {
  const { sendTransaction, data: txHash } = useSendTransaction();

  const connectors = useConnectors();

  useOwlSimpleSmartAccount();

  return (
    <>
      <button
        onClick={() =>
          sendTransaction({
            to: zeroAddress,
            value: 0n,
            data: "0x",
          })
        }
      >
        Send test transaction
      </button>
      <br />
      <br />
      {!!txHash && (
        <>
          <p>Transaction Hash: {txHash}</p>
        </>
      )}
      <button onClick={() => connectors.forEach((c) => c.disconnect())}>
        Disconnect All
      </button>
      <br />
      <br />
      <OwlConnectButton projectId={projectId} />
    </>
  );
};

export const OwlWalletTest = () => {
  const { setOpenSignInDialog, owlJwt, signedIn, isLoaded, owlSignOut } =
    useOwlTrpcContext();

  const [hedwigTestnetChain] = trpc.network.get.useSuspenseQuery({
    chainId: 150150,
  });

  const chains = [hedwigTestnetChain] as readonly [Chain];

  const owlWallet = getOwlWallet({
    owlJwt,
    owlSignOut,
    signedIn,
    isLoaded,
    setOpenSignInDialog,
    projectId,
  });

  const connectors = connectorsForWallets(
    [
      {
        groupName: "Recommended",
        wallets: [owlWallet],
      },
    ],
    { projectId: "owlProtocol", appName: "Owl Protocol Storybook" }
  );

  const config = createConfig({
    chains,
    connectors,
    transports: {
      [hedwigTestnetChain.id]: http(hedwigTestnetChain.rpcDefault),
    },
  });

  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider>
        <OwlWalletTestInner />
      </RainbowKitProvider>
    </WagmiProvider>
  );
};
