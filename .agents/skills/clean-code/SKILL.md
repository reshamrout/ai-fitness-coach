---
name: clean-code
description: Improve general code clarity, maintainability, and refactoring quality. Use when Codex reviews messy code, reduces duplication, names functions or variables, splits responsibilities, removes dead code, simplifies conditionals, improves module boundaries, or decides whether a refactor is worthwhile.
---

# Clean Code

## Purpose

Help the agent make code easier to read, change, test, and reason about without
adding unnecessary abstraction.

## Use this skill when

- Refactoring code
- Reviewing maintainability
- Naming variables, functions, or modules
- Reducing duplication
- Splitting responsibilities
- Simplifying conditionals or control flow

## Goals

- Clear intent
- Small, cohesive units
- Minimal duplication
- Predictable control flow
- Testable behavior
- Local consistency with the codebase

---

## Core Principles

- Prefer clarity over cleverness.
- Name things after domain meaning and behavior.
- Keep functions focused on one level of abstraction.
- Remove duplication when it represents the same concept.
- Avoid abstraction until it pays for itself.
- Keep side effects visible and contained.
- Preserve behavior with tests or focused validation.

---

## Best Practices

- Extract functions around meaningful domain steps.
- Replace nested conditionals with early returns when it improves flow.
- Keep modules responsible for one coherent area.
- Delete unused code.
- Prefer explicit data flow over hidden shared mutation.
- Keep names specific enough to remove nearby explanation.
- Match existing project conventions.

---

## Anti-patterns

- Refactoring unrelated code while fixing a small issue.
- Creating generic abstractions for two barely similar call sites.
- Naming by implementation detail instead of business meaning.
- Hiding side effects inside innocent-looking helpers.
- Keeping dead code because it might be useful later.

---

## Decision Rules

If two blocks duplicate the same business rule, extract or centralize it.

If two blocks only look similar but mean different things, keep them separate.

If a function is hard to name, clarify its responsibility before extracting it.

If a refactor changes behavior risk, add or run tests around that behavior.

---

## Completion Checklist

Before finishing, ensure:

- [ ] Names reveal intent.
- [ ] Functions have focused responsibilities.
- [ ] Control flow is easy to follow.
- [ ] Duplication is intentional or removed.
- [ ] Side effects are visible.
- [ ] Dead code is removed.
- [ ] Existing conventions are preserved.
- [ ] Behavior is validated.

---

## Additional Resources

Read these supporting files when the task needs more detail:

- [examples.md](examples.md)
- [patterns.md](patterns.md)
- [anti-patterns.md](anti-patterns.md)
- [checklist.md](checklist.md)
- [references.md](references.md)
