# Test info

- Name: should navigate between pages
- Location: /Users/ajelinek/code/blogs/tests/navigation.spec.ts:25:1

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "Home | Blog and Presentations"
Received string:    "Rank Decider - Rank, Decide, and Conquer Together"
    at /Users/ajelinek/code/blogs/tests/navigation.spec.ts:27:42
```

# Page snapshot

```yaml
- banner:
  - link "Rank Decider Logo Rank Decider":
    - /url: /
    - img "Rank Decider Logo"
    - text: Rank Decider
  - navigation:
    - list:
      - listitem:
        - link "Rankings":
          - /url: /rankings
      - listitem:
        - link "Leaderboard":
          - /url: /leaderboard
      - listitem:
        - link "About":
          - /url: /about
      - listitem
- main:
  - region "hero":
    - heading "Rank, Decide, and Conquer Together" [level=1]
    - paragraph: Transform decision-making into an engaging experience. Create rankings, gather opinions, and make smarter choices with visual insights and collaborative input.
    - link "Start Ranking Now":
      - /url: ranking/manage/details?rankingId=NEW
      - button "Start Ranking Now"
    - link "Learn how it works":
      - /url: "#how-it-works"
    - img
    - img
  - region "how it works":
    - heading "How Rank Decider Works" [level=2]
    - paragraph: Three simple steps to make informed decisions
    - img
    - text: "1"
    - heading "Create Your Ranking" [level=3]
    - paragraph: Quickly set up a ranking with a title, description, and add items you want to compare. Share it publicly or privately.
    - img
    - text: "2"
    - heading "Gather Votes" [level=3]
    - paragraph: Invite others to participate through a unique URL, code, or QR code. Watch real-time progress as votes come in.
    - img
    - text: "3"
    - heading "Analyze Results" [level=3]
    - paragraph: Get comprehensive insights with detailed metrics, visualizations, and participant comments to inform your decisions.
  - region "features":
    - heading "Powerful Features You'll Love" [level=2]
    - paragraph: Tools designed for meaningful collaboration and insights
    - img
    - heading "Pairwise Comparison" [level=3]
    - paragraph: Our intuitive comparison system helps participants focus on direct item comparisons for more accurate and insightful rankings.
    - img
    - heading "Real-Time Results" [level=3]
    - paragraph: Watch live updates as votes come in, with dynamic visualizations that show how rankings evolve in real-time.
    - img
    - heading "Gamified Experience" [level=3]
    - paragraph: Earn points for participating, creating rankings, and getting votes. Climb the leaderboard and showcase your influence.
    - img
    - heading "Flexible Visibility" [level=3]
    - paragraph: Control who sees your rankings with public, hidden, and private options. Maintain privacy when needed.
    - img
    - heading "User Comments" [level=3]
    - paragraph: Add context to your votes and rankings with comments. Foster discussion and better understand perspectives.
    - img
    - heading "Weekly Rankings" [level=3]
    - paragraph: Discover trending topics through our Weekly Rank feature, highlighting interesting and popular public rankings.
  - region "use cases":
    - heading "Endless Possibilities" [level=2]
    - paragraph: From casual fun to critical decisions, Rank Decider has you covered
    - img
    - heading "Personal Decisions" [level=3]
    - list:
      - listitem:
        - img
        - text: Choosing vacation destinations
      - listitem:
        - img
        - text: Ranking movie or book preferences
      - listitem:
        - img
        - text: Prioritizing purchases or goals
    - img
    - heading "Friend Groups" [level=3]
    - list:
      - listitem:
        - img
        - text: Planning activities
      - listitem:
        - img
        - text: Restaurant selection
      - listitem:
        - img
        - text: Gift ideas
    - img
    - heading "Communities" [level=3]
    - list:
      - listitem:
        - img
        - text: Feature requests
      - listitem:
        - img
        - text: Content preferences
      - listitem:
        - img
        - text: Event planning
    - img
    - heading "Teams" [level=3]
    - list:
      - listitem:
        - img
        - text: Project prioritization
      - listitem:
        - img
        - text: Solution evaluation
      - listitem:
        - img
        - text: Team activities
  - region "call to action":
    - heading "Ready to Transform How You Make Decisions?" [level=2]
    - paragraph: Start ranking now - it's free!
    - link "Create Your First Ranking":
      - /url: ranking/manage/details?rankingId=NEW
      - button "Create Your First Ranking"
    - link "Explore Popular Rankings":
      - /url: /rankings
      - button "Explore Popular Rankings"
- contentinfo:
  - text: © 2025 ShadeTree.IT LLC
  - link "Terms of Service":
    - /url: /tos
  - text: "|"
  - link "Privacy Policy":
    - /url: /privacy
```

# Test source

```ts
   1 | import { test, expect, Page } from '@playwright/test'
   2 |
   3 | class NavigationPage {
   4 |   constructor(private page: Page) {}
   5 |   async goto() {
   6 |     await this.page.goto('/')
   7 |   }
   8 |   navLink(name: string) {
   9 |     return this.page.getByRole('link', { name })
  10 |   }
  11 |   async goTo(name: string) {
  12 |     await this.navLink(name).click()
  13 |   }
  14 |   async title() {
  15 |     return this.page.title()
  16 |   }
  17 | }
  18 |
  19 | async function setUp(page: Page) {
  20 |   const navigation = new NavigationPage(page)
  21 |   await navigation.goto()
  22 |   return { navigation }
  23 | }
  24 |
  25 | test('should navigate between pages', async ({ page }) => {
  26 |   const { navigation } = await setUp(page)
> 27 |   await expect(await navigation.title()).toContain('Home | Blog and Presentations')
     |                                          ^ Error: expect(received).toContain(expected) // indexOf
  28 |   await navigation.goTo('Blog')
  29 |   await expect(await navigation.title()).toContain('Blog | Articles and Tutorials')
  30 |   await navigation.goTo('Presentations')
  31 |   await expect(await navigation.title()).toContain('Presentations | Tech Talks and Slides')
  32 |   await navigation.goTo('Home')
  33 |   await expect(await navigation.title()).toContain('Home | Blog and Presentations')
  34 | })
  35 |
  36 | test('navigation should be keyboard accessible', async ({ page }) => {
  37 |   const { navigation } = await setUp(page)
  38 |   await page.keyboard.press('Tab')
  39 |   await expect(navigation.navLink('Home')).toBeFocused()
  40 |   await page.keyboard.press('Tab')
  41 |   await expect(navigation.navLink('Blog')).toBeFocused()
  42 |   await page.keyboard.press('Tab')
  43 |   await expect(navigation.navLink('Presentations')).toBeFocused()
  44 |   await page.keyboard.press('Enter')
  45 |   await expect(await navigation.title()).toContain('Presentations | Tech Talks and Slides')
  46 | })
  47 |
  48 | test('responsive layout shows navigation on mobile', async ({ page }) => {
  49 |   const { navigation } = await setUp(page)
  50 |   await page.setViewportSize({ width: 375, height: 667 })
  51 |   await expect(navigation.navLink('Home')).toBeVisible()
  52 |   await expect(navigation.navLink('Blog')).toBeVisible()
  53 |   await expect(navigation.navLink('Presentations')).toBeVisible()
  54 | })
  55 |
```