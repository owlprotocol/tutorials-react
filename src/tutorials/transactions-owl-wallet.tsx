import { trpc } from "@owlprotocol/core-trpc/react-query";
import {
  OwlConnectButton,
  useOwlSimpleSmartAccount,
} from "@owlprotocol/ui-components";
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

export const TransactionsOwlWalletTestInner = () => {
  const { sendTransaction, data: txHash } = useSendTransaction();

  const connectors = useConnectors();

  useOwlSimpleSmartAccount({ projectId });

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
      {!!txHash && <p>Transaction Hash: {txHash}</p>}
      <button onClick={() => connectors.forEach((c) => c.disconnect())}>
        Disconnect All
      </button>
      <br />
      <br />
      <OwlConnectButton projectId={projectId} />
    </>
  );
};

export const TransactionsOwlWalletTest = () => {
  const [hedwigTestnetChain] = trpc.network.get.useSuspenseQuery({
    chainId: 150150,
  });

  const chains = [hedwigTestnetChain] as readonly [Chain];

  const config = createConfig({
    chains,
    transports: {
      [hedwigTestnetChain.id]: http(hedwigTestnetChain.rpcDefault),
    },
  });

  return (
    <WagmiProvider config={config}>
      <TransactionsOwlWalletTest />
    </WagmiProvider>
  );
};
