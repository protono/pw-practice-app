import { Locator, Page } from '@playwright/test'
import { Helper } from './helper'

export class Sidebar extends Helper {
    // readonly page: Page
    readonly formLayouts: Locator
    readonly toastr: Locator
    readonly tooltip: Locator
    readonly smartTable: Locator
    readonly datePicker: Locator
    readonly iotDashboard: Locator
    /**
     * 
     * @param page 
     */
    constructor(page: Page) {
        // this.page = page
        super(page)
        this.formLayouts = this.page.getByText('Form Layouts')
        this.toastr = this.page.getByText('Toastr')
        this.tooltip = this.page.getByText('Tooltip')
        this.smartTable = this.page.getByText('Smart Tables')
        this.datePicker = this.page.getByText('Datepicker')
        this.iotDashboard = this.page.getByText('IoT Dashboard')
    }
    async formLayoutsPage() {
        await this.expandTitle('Forms')
        await this.formLayouts.click()
    }
    async toastrPage() {
        await this.expandTitle('Modal & Overlays')
        await this.toastr.click()
    }
    async tooltipPage() {
        await this.expandTitle('Modal & Overlays')
        await this.tooltip.click()
    }
    async smartTablePage() {
        await this.expandTitle('Tables & Data')
        await this.smartTable.click()
    }
    async datepickerPage() {
        await this.expandTitle('Forms')
        await this.datePicker.click()
    }
    async iotDashboardPage() {
        await this.iotDashboard.click()

    }
    /**
     * 
     * @param title 
     */
    private async expandTitle(title: string) {
        const target = this.page.getByTitle(title)
        const state = await target.getAttribute('aria-expanded')
        state == 'true' ? {} : await target.click()
    }
}