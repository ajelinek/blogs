import type { Page } from '@playwright/test'

export class BasePage {
  constructor(readonly page: Page) {}

  // SEO Meta Tags
  metaTitle = () => this.page.locator('head > title')
  metaDescription = () => this.page.locator('meta[name="description"]')
  metaCanonical = () => this.page.locator('link[rel="canonical"]')

  // Open Graph Tags
  ogTitle = () => this.page.locator('meta[property="og:title"]')
  ogDescription = () => this.page.locator('meta[property="og:description"]')
  ogImage = () => this.page.locator('meta[property="og:image"]')
  ogUrl = () => this.page.locator('meta[property="og:url"]')
  ogType = () => this.page.locator('meta[property="og:type"]')

  // Twitter Card Tags
  twitterCard = () => this.page.locator('meta[name="twitter:card"]')
  twitterTitle = () => this.page.locator('meta[name="twitter:title"]')
  twitterDescription = () => this.page.locator('meta[name="twitter:description"]')
  twitterImage = () => this.page.locator('meta[name="twitter:image"]')

  // Structured Data
  structuredData = () => this.page.locator('script[type="application/ld+json"]')

  // Helper Methods
  async getMetaContent(selector: string): Promise<string> {
    return (await this.page.getAttribute(selector, 'content')) || ''
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title()
  }

  async getCanonicalHref(): Promise<string> {
    return (await this.page.getAttribute('link[rel="canonical"]', 'href')) || ''
  }

  async getStructuredDataContent(): Promise<string> {
    return await this.page.evaluate(() => {
      const script = document.querySelector('script[type="application/ld+json"]')
      return script ? script.textContent || '{}' : '{}'
    })
  }

  async hasMetaTag(selector: string): Promise<boolean> {
    return (await this.page.locator(selector).count()) > 0
  }
}
