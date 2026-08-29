# React Anti-patterns

## Unnecessary Effects

Avoid using an effect to compute values that can be derived during render.

## Duplicated State

Avoid storing the same fact in multiple places. It creates synchronization bugs.

## Direct Mutation

Avoid mutating arrays, objects, maps, or sets stored in state. Return new values
so React can see the update.

## Overgrown Components

Avoid letting one component handle unrelated data loading, business logic,
layout, and UI primitives. Split by responsibility.

## Blanket Memoization

Avoid adding `useMemo`, `useCallback`, or `memo` everywhere by default. These
tools are useful when they solve a real rendering or identity problem.
