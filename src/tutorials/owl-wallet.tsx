import { trpc } from "@owlprotocol/core-trpc/react-query";
import {
  getDefaultConfig,
  useOwlTrpcContext,
  OwlWalletButton,
} from "@owlprotocol/ui-components";
import { Chain } from "viem";
import { WagmiProvider } from "wagmi";

export const OwlWalletTest = () => {
  const projectId = import.meta.env.VITE_PROJECT_ID;

  if (!projectId || projectId === "PROJECT_ID")
    throw new Error("VITE_PROJECT_ID must be defined!");

  const trpcContext = useOwlTrpcContext();
  const [hedwigTestnetChain] = trpc.network.get.useSuspenseQuery({
    chainId: 150150,
  });

  const chains = [hedwigTestnetChain] as readonly [Chain];

  const config = getDefaultConfig({
    chains,
    projectId,
    ...trpcContext,
  });

  return (
    <WagmiProvider config={config}>
      <OwlWalletButton projectId={projectId} />
    </WagmiProvider>
  );
};
