# React Patterns

## Component Boundaries

- Keep containers responsible for data and orchestration.
- Keep presentational components responsible for rendering and interaction.
- Extract custom hooks when stateful logic is reused or when extraction makes a
  component easier to read.

## State

- Keep state as close as possible to the components that need it.
- Lift state only when multiple components need to coordinate around it.
- Use reducers when updates depend on explicit events or multiple fields change
  together.

## Effects

- Treat effects as synchronization points with systems outside React.
- Prefer render-time derivation for pure calculations.
- Clean up subscriptions, timers, and event listeners.

## Performance

- Start with clear rendering and stable data flow.
- Measure before adding broad memoization.
- Memoize when identity stability is required by an API or expensive work is
  confirmed.
