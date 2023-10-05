import { defineConfig, devices } from '@playwright/test'
import type { TestOptions } from './test-options'

require('dotenv').config()

export default defineConfig<TestOptions>({
  // global section
  fullyParallel: true,
  retries: 1,
  reporter: 'html',
  // runtime
  use: {
    baseURL: process.env.ENV === 'prod' ? 'https://www.akveo.com/ngx-admin/pages/dashboard' : 'http://localhost:4200',
    trace: 'on-first-retry',
    testIdAttribute: 'testid',
    video: 'off',
    someOption: 'Option X'
  },

  // project section
  projects: [
    {
      name: 'cr',
      retries: 0
    },
    {
      name: 'ff',
      timeout: 60000,
      // runtime
      use: { browserName: 'firefox' },
    }
  ],
})
