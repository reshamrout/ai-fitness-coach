# Code Comment Examples

## Explain Why, Not What

Bad:

```ts
// Increment retry count by one.
retryCount += 1;
```

Better:

```ts
// Keep retries bounded so transient network failures do not block the queue.
retryCount += 1;
```

Why: the second comment preserves the operational reason behind the limit.

## Replace Comments With Clear Code

Bad:

```ts
// Check if the user can edit the invoice.
if (user.role === "admin" || invoice.ownerId === user.id) {
  return true;
}
```

Better:

```ts
const canEditInvoice = user.role === "admin" || invoice.ownerId === user.id;
return canEditInvoice;
```

Why: a clear name can be better than a comment that repeats an expression.

## Make TODOs Actionable

Bad:

```ts
// TODO: fix this
```

Better:

```ts
// TODO: Replace offset pagination with cursors before exposing this endpoint publicly.
```

Why: future maintainers can understand the trigger and next step.
