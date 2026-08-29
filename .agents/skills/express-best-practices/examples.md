# Express Examples

## Centralize Error Handling

Bad:

```ts
app.get("/users/:id", async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});
```

Better:

```ts
app.get("/users/:id", async (req, res, next) => {
  try {
    const user = await users.findById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

app.use(errorMiddleware);
```

Why: one error middleware can consistently log, map, and hide internal error
details.

## Keep Route Handlers Thin

Bad:

```ts
app.post("/orders", async (req, res) => {
  const total = req.body.items.reduce((sum, item) => sum + item.price, 0);
  const order = await db.orders.insert({ ...req.body, total });
  await email.sendReceipt(order);
  res.status(201).json(order);
});
```

Better:

```ts
app.post("/orders", async (req, res, next) => {
  try {
    const input = createOrderSchema.parse(req.body);
    const order = await orderService.create(input);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});
```

Why: validation, business rules, persistence, and side effects become easier to
test independently.
