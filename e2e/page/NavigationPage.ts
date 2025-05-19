import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class NavigationPage {
  constructor(private page: Page) {}
  async goto() {
    await this.page.goto('/jelly-time/')
  }
  navLink(name: string) {
    return this.page.getByRole('link', { name, exact: true })
  }
  async goTo(name: string) {
    await this.navLink(name).click()
    await expect(this.page).toHaveTitle(new RegExp(`${name} \\|`))
  }
  async title() {
    return this.page.title()
  }
}
