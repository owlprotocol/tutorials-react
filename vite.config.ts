import { defineConfig } from "vite";
import ReactPlugin from "@vitejs/plugin-react-swc";

import { dotenvConfig } from "@owlprotocol/envvars";

dotenvConfig();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ReactPlugin()],
});
