import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  use: { baseURL: 'http://127.0.0.1:4383', trace: 'retain-on-failure' },
  webServer: {
    command: 'python3 -m http.server 4383 --bind 127.0.0.1 --directory dist',
    url: 'http://127.0.0.1:4383',
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
