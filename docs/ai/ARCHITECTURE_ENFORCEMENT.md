# Architecture Enforcement

**Layer rules**: See `AI_RULES.md` (Section 1: strict rules by layer; Section 2: prohibitions)

This document focuses on **review criteria** and **violation severity**.

## How to Review Code

1. **Layer check**: Does each change live in correct layer? (see AI_RULES.md)
2. **Imports check**: Are there forbidden import crossings?
3. **Domain check**: Is domain pure and IO-free?
4. **Store check**: Does store only orchestrate state (no logic)?
5. **Services check**: Are all mappers in core/services?
6. **IO check**: Is all IO isolated to core/api?

## Violation Severity

| Severity | Examples |
|----------|----------|
| **Critical** | IO in domain, circular dependencies, forbidden layer imports |
| **High** | Business logic in store/modules/views, mappers outside services |
| **Medium** | Permission/capability logic in UI |
| **Low** | Minor placement inconsistencies without impact |

## Quick Rejection Checklist

→ See `AI_RULES.md` Section 2 for complete prohibitions list

- ❌ Any IO in domain
- ❌ Direct endpoint access in UI (production code)
- ❌ Business rules in store/views/modules
- ❌ Mappers outside core/services
- ❌ store/views imports in domain
- ❌ Mutations of domain entities
