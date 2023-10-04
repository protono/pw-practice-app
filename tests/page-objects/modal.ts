import { Locator, Page } from '@playwright/test'
class Modal {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

}
export class FormLayouts extends Modal {
    constructor(page: Page) {
        super(page)
    }
    /**
     * 
     * @param email 
     * @param password 
     * @param option 
     */
    async usingTheGrid_signIn(email: string, password: string, option: string) {
        const card = this.page.locator('nb-card').filter({ hasText: 'Using the Grid' })
        await card.getByPlaceholder('Email').fill(email)
        await card.getByPlaceholder('Password').fill(password)
        await card.getByLabel(option).check({ force: true })
        await card.getByRole('button').click()
    }
    /**
     * 
     * @param fullName 
     * @param email 
     * @param checked 
     */
    async inlineForm_submit(fullName: string, email: string, checked: boolean) {
        const card = this.page.locator('nb-card').filter({ hasText: 'Inline Form' })
        await card.getByPlaceholder('Jane Doe').fill(fullName)
        await card.getByPlaceholder('Email').fill(email)
        checked ? await card.getByText('Remember me').check() : {}
        await card.getByRole('button').click()
    }
}