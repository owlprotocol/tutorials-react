import { trpc } from "@owlprotocol/core-trpc/react-query";
import { API_REST_BASE_URL } from "@owlprotocol/envvars";
import {
  getOwlWallet,
  useOwlSimpleSmartAccount,
  useOwlTrpcContext,
} from "@owlprotocol/ui-components";
import {
  ConnectButton,
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
  throw new Error("PROJECT_ID must be defined!");

export const OwlWalletTestInner = () => {
  const { sendTransaction, data: txHash } = useSendTransaction();

  const connectors = useConnectors();

  useOwlSimpleSmartAccount({
    owlApiRestBaseUrl: API_REST_BASE_URL,
  });

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

      <p>{!!txHash && `Transaction Hash: ${txHash}`}</p>

      <br />

      <button onClick={() => connectors.forEach((c) => c.disconnect())}>
        Disconnect All
      </button>

      <br />
      <ConnectButton />
    </>
  );
};

export const OwlWalletTest = () => {
  const { setOpenSignInDialog, owlJwt, signedIn, isLoaded, owlSignOut } =
    useOwlTrpcContext();

  const [hedwigTestnetChain] = trpc.network.get.useSuspenseQuery({
    chainId: 1337,
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
