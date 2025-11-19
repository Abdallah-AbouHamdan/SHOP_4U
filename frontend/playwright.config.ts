import { defineConfig, devices } from '@playwright/test';
declare const process: any;

export default defineConfig({
  // tests folder
  testDir: './tests',

  fullyParallel: true,

  // Fail PR if test.only is left accidentally
  forbidOnly: !!process.env.CI,

  // Retry on CI
  retries: process.env.CI ? 2 : 0,

  // 2 workers max on CI (stable)
  workers: process.env.CI ? 2 : undefined,

  reporter: 'html',

  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Start Vite dev server before tests run
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
