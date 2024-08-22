import { OwlProvider } from "@owlprotocol/ui-components";
import { API_TRPC_BASE_URL } from "@owlprotocol/envvars/browser";

import "./App.css";
import { OwlWalletTest } from "./tutorials/owl-wallet.js";

export const App = () => {
  return (
    <>
      <h1>Owl React Tutorials</h1>

      <OwlProvider apiTrpcBaseUrl={API_TRPC_BASE_URL}>
        <OwlWalletTest />
        {/* Add tutorial snippets below */}
      </OwlProvider>
    </>
  );
};
