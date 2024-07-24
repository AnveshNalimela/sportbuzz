import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173/",
  },
  env: {
    API_ENDPOINT: "https://wd301-capstone-api.pupilfirst.school", // or your actual API endpoint
  },
});
