import { OwlProvider } from "@owlprotocol/ui-components";
import "./App.css";
import {
  API_TRPC_BASE_URL,
  CLERK_PUBLISHABLE_KEY,
} from "@owlprotocol/envvars/browser";

export const App = () => {
  return (
    <>
      <h1>Owl React Tutorials</h1>

      <OwlProvider
        apiTrpcBaseUrl={API_TRPC_BASE_URL}
        clerkPublishableKey={CLERK_PUBLISHABLE_KEY}
      >
        {/* Add tutorial snippets below */}
      </OwlProvider>
    </>
  );
};
