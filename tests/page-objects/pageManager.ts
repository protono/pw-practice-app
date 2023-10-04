import { Page } from '@playwright/test'
import { Sidebar } from './sidebar'
import { Datepicker, FormLayouts } from './modal'

export class PageManager {
    readonly page: Page
    readonly sidebar: Sidebar
    readonly datepicker: Datepicker
    readonly formLayouts: FormLayouts
    constructor(page: Page) {
        this.page = page
        this.sidebar = new Sidebar(this.page)
        this.datepicker = new Datepicker(this.page)
        this.formLayouts = new FormLayouts(this.page)
    }
    goto() { return this.sidebar }
    formLayoutsPage() { return this.formLayouts }
    datepickerPage() { return this.datepicker }
}