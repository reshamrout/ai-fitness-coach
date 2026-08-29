# TypeScript Patterns

## Public Boundaries

- Annotate exported functions, classes, and modules.
- Keep public type names stable and descriptive.
- Avoid exposing internal implementation types accidentally.

## Narrowing

- Use `typeof`, `in`, equality checks, discriminants, and custom type guards.
- Prefer validation libraries for external data.
- Keep guards small and testable.

## Unions

- Use discriminated unions for state machines, async states, and result types.
- Switch on the discriminant.
- Use exhaustive checks when missing variants would be a bug.

## Generics

- Add generics when callers need to preserve relationships between types.
- Prefer readable generic names for domain-specific abstractions.
- Avoid generic helpers that only serve one call site.

## Runtime Boundaries

Validate data from:

- HTTP requests
- Environment variables
- Local storage
- Third-party SDKs
- JSON parsing
- Database records when schemas may drift
