# Express Anti-patterns

## Catch-all Middleware Too Early

Registering a catch-all route before feature routers prevents later routes from
running.

## Raw Error Responses

Returning raw error objects may leak stack traces, SQL details, tokens, or
internal service names.

## Unvalidated Input

Using request input directly spreads trust assumptions across the application.

## Large Route Files

Huge route modules make middleware order, auth rules, and response behavior
harder to review.

## Hidden Async Failures

If the Express version or wrapper does not forward async failures, thrown errors
can bypass the error middleware.
