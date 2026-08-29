# Code Comment Anti-patterns

## Noise Comments

Comments such as `// set name` or `// loop through items` make code harder to
scan without adding understanding.

## Stale Comments

Comments that describe old behavior mislead reviewers and future maintainers.

## Commented-out Code

Deleted code belongs in version control history, not in active source files.

## Vague TODOs

`TODO: clean up` does not explain the risk, desired direction, or timing.

## Comments As A Substitute For Design

When a comment explains a tangled block that can be named, extracted, or
simplified, prefer improving the code.
