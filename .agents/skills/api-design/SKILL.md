---
name: api-design
description: Design, review, and refactor HTTP APIs. Use when Codex works on REST endpoints, resources, HTTP methods, status codes, error response formats, pagination, filtering, idempotency, versioning, authentication boundaries, or API consistency across services.
---

# API Design

## Purpose

Help the agent design predictable HTTP APIs that are consistent, secure, and
pleasant to consume.

## Use this skill when

- Designing new endpoints
- Reviewing route and response contracts
- Refactoring API shapes
- Choosing status codes or methods
- Standardizing errors, pagination, filtering, or versioning

## Goals

- Resource-oriented endpoints
- Correct HTTP semantics
- Consistent response contracts
- Clear error handling
- Safe authentication and authorization boundaries

---

## Core Principles

- Model APIs around resources and actions users understand.
- Use HTTP methods according to their semantics.
- Make success and error responses predictable.
- Validate all client-controlled input.
- Design pagination and filtering before lists become large.
- Keep sensitive implementation details out of responses.
- Prefer backwards-compatible evolution.

---

## Best Practices

- Use nouns for resources, such as `/users` and `/orders/{orderId}`.
- Use `GET` for retrieval, `POST` for creation or processing, `PUT` or `PATCH`
  for updates, and `DELETE` for deletion.
- Return status codes that match the outcome.
- Use a consistent error envelope, preferably compatible with problem details
  when the project allows it.
- Use cursor pagination when list ordering can change.
- Document authentication, authorization, rate limits, and idempotency behavior.

---

## Anti-patterns

- Encoding actions into resource names when HTTP methods already express them.
- Returning `200` for every outcome.
- Returning different error shapes across endpoints.
- Exposing database field names when they are not part of the API contract.
- Adding breaking response changes without versioning or migration.

---

## Decision Rules

If the endpoint represents a collection, use a plural resource path.

If the operation is safe retrieval, use `GET`.

If a client may retry a write, define idempotency behavior.

If an error should be machine-readable, include a stable code or type.

If a list can grow, design pagination before shipping.

---

## Completion Checklist

Before finishing, ensure:

- [ ] Resource names are consistent.
- [ ] HTTP methods match intent.
- [ ] Status codes match outcomes.
- [ ] Request input is validated.
- [ ] Error responses are consistent.
- [ ] Pagination is defined for lists.
- [ ] Auth and authorization behavior is clear.
- [ ] Backwards compatibility is considered.

---

## Additional Resources

Read these supporting files when the task needs more detail:

- [examples.md](examples.md)
- [patterns.md](patterns.md)
- [anti-patterns.md](anti-patterns.md)
- [checklist.md](checklist.md)
- [references.md](references.md)
