---
name: react-best-practices
description: Improve React code quality with modern React patterns. Use when building React components, refactoring React code, reviewing React code, fixing React bugs, or deciding how to structure React state, effects, hooks, rendering, accessibility, and component boundaries.
---

# React Best Practices

## Purpose

Help the agent generate production-ready React code following modern React recommendations.

## Use this skill when

- Building React components
- Refactoring React code
- Reviewing React PRs
- Fixing React bugs

## Goals

- Readable code
- Maintainable component boundaries
- Good performance without premature memoization
- Accessible UI
- Strong TypeScript types when the project uses TypeScript

---

## Core Principles

- Prefer composition over inheritance.
- Keep components focused on one responsibility.
- Derive state instead of duplicating it.
- Use effects for synchronizing with external systems.
- Favor semantic HTML and accessible interactions.
- Keep business logic in custom hooks when it improves clarity.
- Follow the existing project conventions before introducing a new pattern.

---

## Best Practices

- Type props clearly.
- Handle loading, error, and empty states.
- Use stable keys for lists.
- Keep components easy to test.
- Prefer early returns over deeply nested conditionals.
- Split components when one file is carrying unrelated responsibilities.
- Use `useMemo` and `useCallback` for measured or structurally necessary cases, not as default decoration.

---

## Anti-patterns

- Copying props into state without a synchronization reason.
- Creating effects for values that can be derived during render.
- Mutating state directly.
- Hiding business rules inside JSX branches that are hard to test.
- Prop drilling through many layers when composition or context would be clearer.

---

## Decision Rules

If a value can be calculated from existing props or state, derive it during render.

If code synchronizes with the network, browser APIs, timers, subscriptions, or external systems, an effect may be appropriate.

If a component mixes data loading, domain logic, layout, and low-level UI details, split it into focused pieces.

If memoization makes the code harder to read and there is no measured need, remove it.

---

## Completion Checklist

Before finishing, ensure:

- [ ] Semantic HTML is used where possible.
- [ ] Interactive elements have accessible names.
- [ ] Loading state is handled.
- [ ] Error state is handled.
- [ ] Empty state is handled.
- [ ] Derived state is not duplicated unnecessarily.
- [ ] Effects synchronize with external systems.
- [ ] Props and state are typed when TypeScript is available.
- [ ] The implementation follows project conventions.

---

## Additional Resources

Read these supporting files when the task needs more detail:

- [examples.md](examples.md)
- [patterns.md](patterns.md)
- [anti-patterns.md](anti-patterns.md)
- [checklist.md](checklist.md)
- [references.md](references.md)
