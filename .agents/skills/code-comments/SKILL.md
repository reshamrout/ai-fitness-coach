---
name: code-comments
description: Improve code comments and documentation comments. Use when Codex writes, reviews, removes, or refactors inline comments, JSDoc/TSDoc comments, TODO notes, public API documentation, complex logic explanations, or comments that may be stale, noisy, misleading, or missing.
---

# Code Comments

## Purpose

Help the agent write comments that clarify intent, constraints, and public API
contracts without repeating obvious code.

## Use this skill when

- Adding comments to code
- Reviewing existing comments
- Writing JSDoc or TSDoc
- Explaining non-obvious logic
- Removing stale or redundant comments

## Goals

- Explain why code exists.
- Preserve important context.
- Document public contracts.
- Reduce noise.
- Keep comments accurate as code changes.

---

## Core Principles

- Prefer clear code first.
- Comment intent, constraints, tradeoffs, and surprising behavior.
- Do not restate what the code already says.
- Keep comments close to the code they explain.
- Update or remove stale comments during refactors.
- Document public APIs enough for callers to use them safely.

---

## Best Practices

- Add comments before complex logic, not after every line.
- Use documentation comments for exported functions, classes, and modules when
  the contract is not obvious.
- Include units, invariants, side effects, and failure behavior when relevant.
- Use TODO comments only with enough context to act on later.
- Remove comments that contradict the code.

---

## Anti-patterns

- Narrating each assignment or branch.
- Keeping old comments after changing behavior.
- Using comments to excuse unclear code that can be simplified.
- Writing vague TODOs with no owner, reason, or next step.
- Duplicating type information already enforced by TypeScript.

---

## Decision Rules

If a comment explains what simple code does, remove it or make the code clearer.

If a comment explains why a non-obvious decision exists, keep or improve it.

If an exported API can be misused, document the contract.

If a TODO cannot guide future action, rewrite it or remove it.

---

## Completion Checklist

Before finishing, ensure:

- [ ] Comments explain intent, constraints, or contracts.
- [ ] Obvious line-by-line comments are removed.
- [ ] Stale comments are updated.
- [ ] Public APIs have useful docs when needed.
- [ ] TODO comments are actionable.
- [ ] Comments do not duplicate TypeScript types unnecessarily.

---

## Additional Resources

Read these supporting files when the task needs more detail:

- [examples.md](examples.md)
- [patterns.md](patterns.md)
- [anti-patterns.md](anti-patterns.md)
- [checklist.md](checklist.md)
- [references.md](references.md)
