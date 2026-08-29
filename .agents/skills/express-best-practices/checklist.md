# Express Checklist

- [ ] Middleware order is deliberate.
- [ ] Body size limits are appropriate.
- [ ] Route input is validated.
- [ ] Authentication runs before protected handlers.
- [ ] Authorization checks are close to protected resources.
- [ ] Route handlers stay thin.
- [ ] Business logic is testable outside Express.
- [ ] Async errors reach the error middleware.
- [ ] Error responses are consistent.
- [ ] Production responses hide stack traces.
- [ ] Security headers are configured.
- [ ] Important routes have integration tests.
