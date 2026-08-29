# TypeScript Examples

## Prefer Unknown For Untrusted Values

Bad:

```ts
function parsePayload(payload: any) {
  return payload.user.email.toLowerCase();
}
```

Better:

```ts
function parsePayload(payload: unknown) {
  const result = userPayloadSchema.parse(payload);
  return result.user.email.toLowerCase();
}
```

Why: `unknown` forces the code to prove shape before use.

## Use Discriminated Unions For Variants

Bad:

```ts
type LoadState = {
  loading?: boolean;
  error?: string;
  data?: User[];
};
```

Better:

```ts
type LoadState =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; data: User[] };
```

Why: each state has exactly the fields it needs, and TypeScript can narrow by
`status`.

## Avoid Broad Assertions

Bad:

```ts
const user = response.data as User;
```

Better:

```ts
const user = userSchema.parse(response.data);
```

Why: a type assertion changes the compiler's belief, while validation checks the
runtime value.
