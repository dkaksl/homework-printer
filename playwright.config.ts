import { defineConfig } from '@playwright/test'

const PORT = 3123

export default defineConfig({
  testDir: './e2e',
  // Not *.spec.ts: CRA's lint config applies Jest rules to those, and these are Playwright tests.
  testMatch: '*.e2e.ts',
  timeout: 120000,
  fullyParallel: true,
  use: {
    baseURL: `http://localhost:${PORT}`,
    viewport: { width: 1600, height: 1000 }
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: {
    command: `BROWSER=none PORT=${PORT} npx react-scripts start`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 180000
  }
})
