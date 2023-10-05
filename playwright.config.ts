import { defineConfig, devices } from '@playwright/test'
import type { TestOptions } from './test-options'

require('dotenv').config()

export default defineConfig<TestOptions>({
  fullyParallel: true,
  retries: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.ENV === 'prod' ? 'https://www.akveo.com/ngx-admin/pages/dashboard' : 'http://localhost:4200',
    trace: 'on-first-retry',
    testIdAttribute: 'testid',
    video: 'off',
    someOption: 'Option X'
  },

  projects: [
    {
      name: 'chromium',
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
      },
    }
  ],
})
