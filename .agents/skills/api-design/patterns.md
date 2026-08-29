# API Design Patterns

## Resource Naming

- Use plural nouns for collections.
- Nest only when the relationship is part of the resource identity.
- Keep paths stable even if implementation storage changes.

## Methods

- `GET`: retrieve a representation.
- `POST`: create a subordinate resource or submit processing.
- `PUT`: replace a resource.
- `PATCH`: partially update a resource.
- `DELETE`: delete a resource.

## Status Codes

- `200`: successful request with a response body.
- `201`: resource created.
- `202`: accepted for asynchronous processing.
- `204`: successful request without a response body.
- `400`: malformed or invalid request.
- `401`: authentication required or failed.
- `403`: authenticated but not authorized.
- `404`: resource not found or intentionally hidden.
- `409`: state conflict.
- `422`: semantically invalid content when the API uses it consistently.

## Pagination

- Prefer cursor pagination for mutable ordered collections.
- Include a stable sort order.
- Return next-page information in a predictable location.

## Errors

- Include a stable machine-readable identifier.
- Keep human-facing messages clear but not overly revealing.
- Avoid exposing internal exception names.
