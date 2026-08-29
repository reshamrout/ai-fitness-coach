# Clean Code Examples

## Name The Domain Idea

Bad:

```ts
const x = user.role === "admin" || invoice.ownerId === user.id;
```

Better:

```ts
const canEditInvoice = user.role === "admin" || invoice.ownerId === user.id;
```

Why: the name captures intent, not just mechanics.

## Use Early Returns To Reduce Nesting

Bad:

```ts
function getDiscount(user: User) {
  if (user.isActive) {
    if (user.plan === "pro") {
      return 20;
    }
  }

  return 0;
}
```

Better:

```ts
function getDiscount(user: User) {
  if (!user.isActive) return 0;
  if (user.plan !== "pro") return 0;

  return 20;
}
```

Why: guard clauses make the main path easier to see.

## Avoid Premature Abstraction

Bad:

```ts
function processEntity<T>(entity: T, options: ProcessOptions) {
  // Handles users, invoices, reports, and notifications.
}
```

Better:

```ts
function activateUser(user: User) {
  // User-specific workflow.
}
```

Why: one vague generic function can hide several unrelated responsibilities.
