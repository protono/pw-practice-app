import { Page } from '@playwright/test'

export class Sidebar {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }
    async open(contentName: string) {
        switch (contentName) {
            case 'Form Layouts': {
                await this.expand('Forms')
                await this.page.getByText('Form Layouts').click()
                break
            }
            case 'Toastr': {
                await this.expand('Modal & Overlays')
                await this.page.getByText('Toastr').click()
                break
            }
            case ('Header'): {
                break
            }
            case ('Tooltip'): {
                await this.expand('Modal & Overlays')
                await this.page.getByText('Tooltip').click()
                break
            }
            case ('Smart Table'): {
                await this.expand('Tables & Data')
                await this.page.getByText('Smart Table').click()
                break
            }
            case ('Datepicker'): {
                await this.expand('Forms')
                await this.page.getByText('Datepicker').click()
                break
            }
            case ('IoT Dashboard'): {
                await this.page.getByText('IoT Dashboard').click()
                break
            }
        }
    }
    private async expand(title: string) {
        const target = this.page.getByTitle(title)
        const state = await target.getAttribute('aria-expanded')
        state == 'true' ? {} : await target.click()
    }
}