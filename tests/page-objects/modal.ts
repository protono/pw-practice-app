import { Page } from '@playwright/test'
import { Helper } from './helper'
export class FormLayouts extends Helper {
    // readonly page: Page
    constructor(page: Page) {
        // this.page = page
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

export class Datepicker extends Helper {
    // readonly page: Page
    constructor(page: Page) {
        // this.page = page
        super(page)
    }
    async common_daysFromNow(numDays: number) {
        const card = this.page.locator('nb-card').filter({ hasText: 'Common Datepicker' })
        await card.getByPlaceholder('Form Picker').click()
        await this.pickDate(numDays)
    }
    async withRange_daysFromNow(numDaysFrom: number, numDaysTo: number) {
        const card = this.page.locator('nb-card').filter({ hasText: 'Datepicker With Range' })
        await card.getByPlaceholder('Range Picker').click()
        await this.pickDate(numDaysFrom)
        await this.pickDate(numDaysTo)
    }
    private incrDate(numDays: number): Date {
        let date = new Date()
        date.setDate(date.getDate() + numDays)
        return date
    }
    private async pickDate(numDays: number) {
        const date = this.incrDate(numDays)
        const picker = this.page.locator('nb-calendar-day-picker')
        const target = picker.locator('.day-cell.ng-star-inserted').getByText(date.getDate().toString(), { exact: true })
        await target.click()
    }
}