import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5175/",
  },
  env: {
    API_ENDPOINT: process.env.VITE_API_ENDPOINT,
  },
});
