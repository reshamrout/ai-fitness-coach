# Clean Code Patterns

## Naming

- Use domain language from the product and codebase.
- Prefer names that describe intent over implementation.
- Rename variables when a comment is only explaining the name.

## Function Shape

- Keep functions focused on one job.
- Put guard clauses near the top.
- Keep side effects clear from the function name or call site.
- Return values instead of mutating inputs unless mutation is intentional.

## Duplication

- Remove duplication that expresses the same rule.
- Keep duplication when separate concepts merely look alike.
- Centralize policy, permissions, validation, and formatting rules when they are
  shared.

## Refactoring

- Make small, behavior-preserving steps.
- Add tests before risky refactors.
- Separate mechanical moves from behavior changes when possible.
