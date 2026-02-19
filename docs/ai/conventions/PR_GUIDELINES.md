# PR Guidelines

These rules are mandatory for every pull request.

## Scope and Size

- Maximum PR size: 200 lines of production code changes.
- Documentation-only and test-only changes do not count toward the 200-line limit.
- Generated files do not count toward the 200-line limit.
- Maximum file size: 500 lines.
- Split large changes into multiple PRs.

## Spec-Driven Requirements

- Specs are mandatory for behavior changes (new features, user-visible changes, business rules, or data flow changes).
- Docs-only, refactor-only, and maintenance-only PRs are exempt from spec requirements.
- Acceptance criteria must map to tests.
- Spec updates and test updates must be included in the same PR when behavior changes.

## Quality Requirements

- All code follows CODE_CONVENTIONS, NAMING_CONVENTIONS, and ARCHITECTURE_CONVENTIONS.
- No architecture violations are allowed.
- All new behavior is covered by tests.
- No ambiguous conditions or hidden requirements.

## Architecture Requirements

All changes must comply with **layer separation rules** (see `../AI_RULES.md`). Auto-reject violations:

- IO in domain
- Business logic in store/modules/views/shared  
- Direct API calls outside core/api
- Mappers outside core/services
- Forbidden cross-layer imports

## Validation Checklist

- Behavior changes reference the correct spec.
- Docs-only/refactor-only/maintenance-only PRs explicitly state that no spec is required.
- Changes are within 200 lines.
- All touched files remain under 500 lines.
- Tests cover acceptance criteria.
- Layer responsibilities are respected.
- Naming and code conventions are satisfied.
- No `else` statements exist in JS/TS control flow (Vue template directives like `v-else` are allowed).
- All `if` statements use `{}`.
