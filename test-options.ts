import { test as base } from '@playwright/test'

export type TestOptions = {
    someOption: string
}
export const test = base.extend<TestOptions>({
    someOption: [null, { option: true }]
})