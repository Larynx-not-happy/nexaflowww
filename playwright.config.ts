import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 120000,
  workers: 1,
  use: {
    launchOptions: {
      executablePath: process.env["CHROMIUM_PATH"] || "/bin/chromium",
      args: ["--no-sandbox"],
    },
    headless: true,
  },
  reporter: [["list"], ["json", { outputFile: "test-results/website.json" }]],
});
