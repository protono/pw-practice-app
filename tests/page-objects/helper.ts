import { Page } from '@playwright/test'

export class Helper {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }
    async pause(seconds: number) {
        await this.page.waitForTimeout(seconds * 1000)
    }
}