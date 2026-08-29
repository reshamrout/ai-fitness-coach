# API Design Examples

## Use Resource Paths And HTTP Methods

Bad:

```http
POST /getUser
```

Better:

```http
GET /users/{userId}
```

Why: the method communicates retrieval, and the path identifies the resource.

## Return Consistent Errors

Bad:

```json
{
  "error": "Invalid email"
}
```

```json
{
  "message": "Name is required",
  "failed": true
}
```

Better:

```json
{
  "type": "https://api.example.com/problems/validation-error",
  "title": "Validation error",
  "status": 400,
  "detail": "The request body contains invalid fields.",
  "errors": [
    {
      "field": "email",
      "message": "Email must be valid."
    }
  ]
}
```

Why: consumers can handle errors reliably when the shape is stable.

## Choose Status Codes Deliberately

```http
201 Created
Location: /orders/ord_123
```

Use `201` when a request creates a resource and the API can identify its
location.
