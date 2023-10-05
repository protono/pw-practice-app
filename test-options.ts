import { test as base } from '@playwright/test'
import { PageManager } from './tests/page-objects/pageManager'

export type TestOptions = {
    someOption: string
    formLayoutsPage: string
    pm: PageManager
}
export const test = base.extend<TestOptions>({
    someOption: ['some option', { option: true }],
    // formLayoutsPage: [
    formLayoutsPage:
        async ({ page }, use) => {
            await page.goto('')
            await page.getByTitle('Forms').click()
            await page.getByText('Form Layouts').click()
            await use('')
            //
        },
    // }, { auto: true }
    // ]
    pm:
        async ({ page }, use) => {
            const pm = new PageManager(page)
            await use(pm)
            //
        }
})