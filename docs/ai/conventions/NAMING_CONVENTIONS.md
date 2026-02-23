# Naming Conventions

These rules are mandatory for all identifiers, files, and documents.

## Identifier Rules

- All identifiers must be in English.
- Variables and functions use `camelCase`.
- Constants use `UPPER_SNAKE_CASE`.
- Boolean variables must use prefixes such as `is`, `has`, `can`, `should`, or `needs`.
- Names must be descriptive and unambiguous.
- Abbreviations are forbidden unless they are universally understood and documented.

## Architectural Naming Rules

- Domain entities must use business language, not UI terms.
- Services must be named after use cases, not implementation details.
- API functions must be named after the external resource or endpoint they access.
- Store actions must describe the state change they trigger.

## Prohibitions

- Non-English identifiers.
- Boolean names without a clear boolean prefix.
- Misleading names that hide side effects or IO.
- Naming that implies a different layer responsibility.

## Validation Checklist

See `../AI_RULES.md`. Naming-specific: English only; booleans use `is`/`has`/`can`/`should`/`needs`; constants `UPPER_SNAKE_CASE`.
