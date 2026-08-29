# Clean Code Anti-patterns

## Clever Code

Dense expressions, hidden coercion, and clever control flow slow down future
changes.

## Generic Names

Names like `data`, `item`, `handler`, and `process` are only useful when the
scope makes their meaning obvious.

## Utility Dumping Grounds

Large `utils` files often collect unrelated behavior and hide ownership.

## Shotgun Refactors

Changing unrelated areas during a focused task increases review risk.

## Abstraction Too Early

Abstractions created before the pattern is understood often freeze the wrong
shape.
