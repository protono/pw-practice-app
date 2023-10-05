import { test } from '../test-options'
import { PageManager } from './page-objects/pageManager'
import { faker } from '@faker-js/faker'
test.beforeEach(async ({ page }) => {
    await page.goto('')
})
test.describe('content', () => {
    test('navigation @smoke', async ({ page }) => {
        console.log(process.env.SOMEURL)
        const pm = new PageManager(page)
        await pm.goto().formLayoutsPage()
        await pm.goto().toastrPage()
    })
    test('parametrized methods', async ({ page }) => {
        const pm = new PageManager(page)
        const email = faker.internet.email
        const fullname = faker.person.fullName
        const password = faker.internet.password
        await pm.goto().formLayoutsPage()
        await pm.formLayouts.usingTheGrid_signIn(email(), password(), 'Option 2')
        await pm.formLayouts.usingTheGrid_signIn(email(), password(), 'Option 1')
        await pm.formLayouts.inlineForm_submit(fullname(), email(), true)
    })
    test('datepicker @smoke', async ({ page }) => {
        const pm = new PageManager(page)
        await pm.goto().datepickerPage()
        await pm.datepicker.common_daysFromNow(3)
        await pm.datepicker.withRange_daysFromNow(3, 4)
    })
})
