import { Locator, Page } from '@playwright/test'

export class Sidebar {
    readonly page: Page
    readonly formLayouts: Locator
    readonly toastr: Locator
    readonly tooltip: Locator
    readonly smartTable: Locator
    readonly datePicker: Locator
    readonly iotDashboard: Locator
    constructor(page: Page) {
        this.page = page
        this.formLayouts = this.page.getByText('Form Layouts')
        this.toastr = this.page.getByText('Toastr')
        this.tooltip = this.page.getByText('Tooltip')
        this.smartTable = this.page.getByText('Smart Tables')
        this.datePicker = this.page.getByText('Datepicker')
        this.iotDashboard = this.page.getByText('IoT Dashboard')
    }
    async openFormLayouts() {
        await this.expandTitle('Forms')
        await this.formLayouts.click()
    }
    async openToastr() {
        await this.expandTitle('Modal & Overlays')
        await this.toastr.click()
    }
    async openTooltip() {
        await this.expandTitle('Modal & Overlays')
        await this.tooltip.click()
    }
    async openSmartTable() {
        await this.expandTitle('Tables & Data')
        await this.smartTable.click()
    }
    async openDatepicker() {
        await this.expandTitle('Forms')
        await this.datePicker.click()
    }
    async openIoTDashboard() {
        await this.iotDashboard.click()

    }
    private async expandTitle(title: string) {
        const target = this.page.getByTitle(title)
        const state = await target.getAttribute('aria-expanded')
        state == 'true' ? {} : await target.click()
    }
}