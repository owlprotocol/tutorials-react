import { OwlProvider } from "@owlprotocol/ui-components";

import "./App.css";
import "@owlprotocol/ui-components/style.css";

export const App = () => {
  return (
    <>
      <h1>Owl React Tutorials</h1>

      <OwlProvider>
        {/* Add tutorial snippets below */}
        {/*<OwlWalletTest />*/}
      </OwlProvider>
    </>
  );
};
