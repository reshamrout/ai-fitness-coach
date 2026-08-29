# TypeScript Anti-patterns

## Any As Escape Hatch

`any` removes type checking from the surrounding code and can hide real bugs.

## Assertion Chains

Assertions such as `value as unknown as Target` usually indicate the code is
bypassing the type system.

## Optional Everything

Making every field optional weakens the model and pushes errors to runtime.

## Types That Lie

Types that do not match runtime data create false confidence.

## Over-abstracted Generics

Deep generic types can become harder to understand than explicit domain types.
