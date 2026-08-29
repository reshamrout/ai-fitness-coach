# React Examples

## Derive Values Instead Of Duplicating State

Bad:

```tsx
function ProfileName({ firstName, lastName }: Props) {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  return <p>{fullName}</p>;
}
```

Better:

```tsx
function ProfileName({ firstName, lastName }: Props) {
  const fullName = `${firstName} ${lastName}`;

  return <p>{fullName}</p>;
}
```

Why: the full name is already available from props, so storing it creates an
extra render and another state path to keep correct.

## Prefer Semantic Elements

Bad:

```tsx
<div onClick={onSave}>Save</div>
```

Better:

```tsx
<button type="button" onClick={onSave}>
  Save
</button>
```

Why: native buttons include keyboard behavior, semantics, and accessibility
defaults that custom clickable elements must otherwise recreate.
