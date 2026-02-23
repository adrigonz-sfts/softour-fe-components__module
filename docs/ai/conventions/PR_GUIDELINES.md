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

See `../AI_RULES.md` (layer separation). Auto-reject: IO in domain; business logic in store/modules/views/shared; API outside core/api; mappers outside core/services; forbidden cross-layer imports.

## Validation Checklist

See `../AI_RULES.md`. PR-specific: PR ≤200 lines (prod code); no file >500 lines; behavior changes require spec and tests covering acceptance criteria.
