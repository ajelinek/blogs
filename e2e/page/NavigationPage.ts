export class NavigationPage {
  constructor(private page: import('@playwright/test').Page) {}
  async goto() {
    await this.page.goto('/jelly-time/')
  }
  navLink(name: string) {
    return this.page.getByRole('link', { name, exact: true })
  }
  async goTo(name: string) {
    await this.navLink(name).click()
  }
  async title() {
    return this.page.title()
  }
}
