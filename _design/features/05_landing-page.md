---
title: 'feature-plain'
description: 'Feature and story template.'
---

# Explanation

- Name each feature as `Feature: <Title>` and each story as `Story N: <Title>`.
- Prefix all feature-related sections with `Feature` and all story-related sections with `Story N`.
- Use checkboxes `[ ]` for acceptance criteria and test cases to track progress.
- Update story numbers and titles for each new story.
- Use this structure for LLMs and humans to easily reference and track work.

---

# Feature: Landing Page

Create a light, fun, and welcoming landing page for the blog and presentation platform. The page should introduce Adam Jelinek, highlight his personality and leadership philosophy, and invite users to explore further. The design should be visually engaging, include a friendly image or illustration, and set a positive tone for the site.

**Content & Images:**

- Hero section with headline, summary, and illustration/photo (e.g., gorilla at computer)
- TL;DR section with Adam's intro and philosophy
- Personality highlights (bulleted or card format)
- Call-to-action buttons/links to Blog and Presentations
- Use the gorilla illustration or a similar fun, light image (see about-me)
- No content or images available from LinkedIn feed

**DALLE-3 Image Prompt:**
Prompt:
A playful, lighthearted digital illustration of a thoughtful gorilla sitting at a modern computer desk, typing on a keyboard. The gorilla looks curious and friendly, with a slight smile. The background is bright and minimal, with subtle tech and family-themed elements (like a coffee mug, a stack of books, and a small plant). The overall mood is fun, welcoming, and professional, suitable for a technology blog landing page.

## Feature Acceptance Criteria

- [ ] [Feature acceptance criterion 1]
- [ ] [Feature acceptance criterion 2]

## Feature Constraints

- [Feature constraint: Implementation Tasks]
  - Create `/` route with Astro page and light, fun design
  - Add hero section with headline, summary, and illustration/photo
  - Add personality/philosophy section with key points and quote
  - Add call-to-action buttons/links to Blog and Presentations
  - Ensure responsive and accessible markup
  - Add E2E test: landing page loads, content visible, navigation works

## Feature Dependencies

- [Feature dependency 1]

---

## Stories

### Story 1: Welcome & Introduction

#### Story 1 Description

As a visitor, I see a friendly introduction to Adam Jelinek and the purpose of the site.

#### Story 1 Status

- [ ] Backlog
- [ ] In Progress
- [x] Done

#### Story 1 Acceptance Criteria

- [ ] Prominent, welcoming headline: "Hi, I'm Adam Jelinek"
- [ ] Short, lighthearted summary: "Technology Director | Entrepreneur | Family Guy | Always Learning"
- [ ] Fun illustration or photo: e.g., "A gorilla thinking at a computer" (as seen on about-me)
- [ ] Brief TL;DR about Adam:
  - "I'm a dedicated husband and father, a technology enthusiast, and a leader who thrives on solving complex problems."
  - "My personality, defined as INTJ-A, signifies my analytical and reflective nature, emphasizing practicality and insight."
  - "My leadership philosophy revolves around the values of extreme ownership, teamwork, and a relentless pursuit of growth."
  - "Books play a crucial role in my life, steering me toward leadership and growth."
- [x] Clear call-to-action to explore blogs and presentations

#### Story 1 Test Cases

- [x] Playwright E2E test: landing page loads, navigation works

#### Story 1 Constraints

- [Story 1 constraint 1]

#### Story 1 Dependencies

- [Story 1 dependency 1]

---

### Story 2: Personality & Philosophy

#### Story 2 Description

As a visitor, I get a sense of Adam's personality and leadership style.

#### Story 2 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 2 Acceptance Criteria

- [ ] Section with key points:
  - INTJ-A (analytical, reflective)
  - Continuous improvement
  - Extreme ownership
  - Teamwork
  - Growth mindset
- [ ] Favorite quote or book mention (e.g., "Always striving to be better than the day before.")
- [ ] Section is visually distinct (e.g., colored background or card)

#### Story 2 Test Cases

- [ ] [Story 2 test case 1]

#### Story 2 Constraints

- [Story 2 constraint 1]

#### Story 2 Dependencies

- [Story 2 dependency 1]

---

### Story 3: Responsive & Accessible Design

#### Story 3 Description

As a visitor, the landing page looks great and is accessible on all devices.

#### Story 3 Status

- [ ] Backlog
- [ ] In Progress
- [x] Done

#### Story 3 Acceptance Criteria

- [x] Responsive layout for mobile and desktop
- [ ] All images have alt text
- [ ] Headings and sections use semantic HTML
- [x] Keyboard navigation works

#### Story 3 Test Cases

- [x] Playwright E2E test: navigation responsiveness and keyboard accessibility

#### Story 3 Constraints

- [Story 3 constraint 1]

#### Story 3 Dependencies

- [Story 3 dependency 1]

---
