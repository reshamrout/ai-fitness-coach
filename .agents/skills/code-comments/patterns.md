# Code Comment Patterns

## Good Comment Targets

- Non-obvious business rules
- Compatibility constraints
- Security-sensitive decisions
- Performance tradeoffs
- Public API behavior
- Data migrations or transitional code

## Documentation Comments

- Describe what callers need to know.
- Include parameter meaning only when names and types are insufficient.
- Mention side effects, thrown errors, and async behavior when relevant.
- Keep examples short and realistic.

## TODO Comments

Useful TODOs include:

- The reason the work is deferred
- The condition that should trigger the work
- A ticket, owner, or concrete next step when available

## Refactoring Comments

When refactoring, check nearby comments with the same care as code. A stale
comment can be worse than no comment.
