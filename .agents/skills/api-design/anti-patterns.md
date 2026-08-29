# API Design Anti-patterns

## RPC Paths For Resource APIs

Paths such as `/createUser`, `/deleteUser`, and `/updateUser` duplicate method
semantics and make the API harder to scan.

## Always Returning 200

Clients lose useful protocol-level information when every response is a success
status with an embedded failure flag.

## Inconsistent Error Shapes

Different error envelopes force consumers to write endpoint-specific parsing.

## Offset Pagination Everywhere

Offset pagination can skip or duplicate items when data changes between
requests.

## Leaky Contracts

Exposing database tables, internal enum names, or stack traces makes future
changes harder and can reveal sensitive details.
