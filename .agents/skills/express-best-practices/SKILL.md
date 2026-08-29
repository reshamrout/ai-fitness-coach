---
name: express-best-practices
description: Build, refactor, review, and debug Express applications and APIs. Use when Codex works on Express routing, middleware order, error handling, request validation, security headers, async handlers, REST endpoints, application structure, or production readiness for Node.js HTTP services.
---

# Express Best Practices

## Purpose

Help the agent build reliable Express services with clear routing, predictable
middleware, safe error handling, and production-ready defaults.

## Use this skill when

- Creating Express routes or middleware
- Refactoring Express application structure
- Reviewing Express API code
- Fixing request, response, or error handling bugs
- Hardening an Express service for production

## Goals

- Clear route and middleware boundaries
- Consistent error handling
- Explicit validation
- Secure production defaults
- Testable service code

---

## Core Principles

- Keep middleware order intentional.
- Validate input at the boundary.
- Centralize error handling.
- Avoid leaking implementation details in responses.
- Keep route handlers thin and move business logic into services.
- Prefer async error flow that is compatible with the Express version in use.
- Follow the existing project structure before introducing new layers.

---

## Best Practices

- Mount shared middleware before routes that depend on it.
- Put the error-handling middleware after routes.
- Return consistent response shapes for success and failure.
- Use `helmet` or equivalent security headers where appropriate.
- Use trusted reverse proxy settings only when the deployment requires them.
- Separate routing, validation, services, and persistence code.
- Add integration tests for important routes.

---

## Anti-patterns

- Throwing async errors that the installed Express version does not catch.
- Mixing database calls, business rules, and response formatting in one handler.
- Returning raw error objects to clients.
- Registering catch-all middleware before specific routes.
- Trusting request body, params, headers, or query strings without validation.

---

## Decision Rules

If code reads request input, validate and normalize it before business logic.

If a handler has branching business rules, move those rules into a service or
use case module.

If an error is expected, convert it into a typed application error and let the
error middleware format the HTTP response.

If a route needs authentication or authorization, mount that middleware close to
the protected route or router.

---

## Completion Checklist

Before finishing, ensure:

- [ ] Middleware order is correct.
- [ ] Inputs are validated.
- [ ] Async errors reach the error middleware.
- [ ] Error responses do not leak internals.
- [ ] Route handlers stay focused.
- [ ] Security headers and production settings are considered.
- [ ] Tests cover important success and failure paths.

---

## Additional Resources

Read these supporting files when the task needs more detail:

- [examples.md](examples.md)
- [patterns.md](patterns.md)
- [anti-patterns.md](anti-patterns.md)
- [checklist.md](checklist.md)
- [references.md](references.md)
