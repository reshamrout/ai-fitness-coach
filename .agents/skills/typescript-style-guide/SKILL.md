---
name: typescript-style-guide
description: Write, refactor, and review TypeScript code. Use when Codex works on TypeScript types, interfaces, generics, narrowing, nullability, module boundaries, type assertions, compiler options, public APIs, declaration quality, or migration from JavaScript to TypeScript.
---

# TypeScript Style Guide

## Purpose

Help the agent write TypeScript that is clear, type-safe, and aligned with the
project's compiler and linting conventions.

## Use this skill when

- Adding or refactoring TypeScript
- Designing types for public APIs
- Reviewing type safety
- Removing unsafe assertions
- Improving strictness or narrowing

## Goals

- Strong, useful types
- Readable type definitions
- Safe null and undefined handling
- Minimal unsafe assertions
- Types that match runtime behavior

---

## Core Principles

- Let TypeScript infer local types when inference is clear.
- Annotate public boundaries and exported APIs.
- Prefer precise types over `any`.
- Narrow unknown input before using it.
- Model state with discriminated unions when variants matter.
- Keep runtime validation separate from compile-time types.
- Follow the repository's `tsconfig` and lint rules.

---

## Best Practices

- Use `unknown` instead of `any` for untrusted values.
- Prefer type narrowing over type assertions.
- Use optional properties deliberately.
- Avoid broad object types that hide required fields.
- Keep generics understandable and motivated by reuse.
- Use `readonly` where mutation should be prevented.
- Keep type aliases and interfaces close to the domain they describe.

---

## Anti-patterns

- Using `any` to silence errors.
- Asserting through `unknown` or `as never` to bypass type checking.
- Creating deep generic abstractions for one use case.
- Duplicating runtime schemas and TypeScript types manually when tooling can infer.
- Disabling strict checks instead of fixing the boundary.

---

## Decision Rules

If data crosses a runtime boundary, validate it before trusting the type.

If a value can be one of several known shapes, use a discriminated union.

If a type is exported, make its name and fields understandable to callers.

If a type assertion is needed, keep it narrow and explain the invariant when it
is not obvious.

---

## Completion Checklist

Before finishing, ensure:

- [ ] Public APIs are typed.
- [ ] `any` is avoided or justified.
- [ ] Unknown input is narrowed or validated.
- [ ] Null and undefined cases are handled.
- [ ] Type assertions are minimal.
- [ ] Types match runtime behavior.
- [ ] Existing compiler and lint rules pass.

---

## Additional Resources

Read these supporting files when the task needs more detail:

- [examples.md](examples.md)
- [patterns.md](patterns.md)
- [anti-patterns.md](anti-patterns.md)
- [checklist.md](checklist.md)
- [references.md](references.md)
