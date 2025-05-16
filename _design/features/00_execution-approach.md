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

# Feature: Execution Approach

This document outlines the general approach for executing features.

## General Approach

### Iterative Delivery

- Features are implemented one at a time, in priority order.
- Each feature is broken into user stories, each with clear acceptance criteria.
- Stories are only considered done when all acceptance criteria are met and verified by automated E2E tests.
- A feature is only done when all its stories are complete and tested.

### BDD/TDD Workflow

- For each story, acceptance criteria are translated into Playwright E2E tests before implementation begins.
- Tests are committed and must fail initially (red-green cycle).
- Implementation proceeds until all tests pass.
- Refactoring and code cleanup follow, ensuring tests remain green.

### Reference

- All feature files must reference this execution approach.
- This ensures consistent, test-driven, and quality-focused delivery for the project.

## Feature Acceptance Criteria

- [ ] [Feature acceptance criterion 1]
- [ ] [Feature acceptance criterion 2]

## Feature Constraints

- [Feature constraint 1]

## Feature Dependencies

- [Feature dependency 1]

---

## Stories

### Story 1: [Story 1 Title]

#### Story 1 Description

[User goal and context for this story.]

#### Story 1 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 1 Acceptance Criteria

- [ ] [Story 1 acceptance criterion 1]
- [ ] [Story 1 acceptance criterion 2]

#### Story 1 Test Cases

- [ ] [Story 1 test case 1]
- [ ] [Story 1 test case 2]

#### Story 1 Constraints

- [Story 1 constraint 1]

#### Story 1 Dependencies

- [Story 1 dependency 1]

---
