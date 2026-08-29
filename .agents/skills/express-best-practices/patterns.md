# Express Patterns

## Application Shape

- `app.ts` wires middleware, routers, and error handling.
- `routes/` defines HTTP paths and method handlers.
- `services/` holds business logic.
- `schemas/` or `validators/` validates boundary input.
- `middleware/` holds cross-cutting request behavior.

## Middleware Order

1. Request parsing and request metadata.
2. Security and operational middleware.
3. Authentication and authorization.
4. Routers.
5. Not-found handler.
6. Error middleware.

## Error Handling

- Convert domain failures into application errors.
- Keep one final error middleware responsible for HTTP formatting.
- Log server errors with enough context for debugging.
- Avoid exposing stack traces in production responses.

## Validation

- Validate `params`, `query`, `body`, and relevant headers.
- Normalize input once at the boundary.
- Prefer schemas that infer TypeScript types when available.
