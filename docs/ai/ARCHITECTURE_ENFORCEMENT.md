# Architecture Enforcement

**Layer rules**: See `AI_RULES.md` (Section 1: strict rules by layer; Section 2: prohibitions)

This document focuses on **review criteria** and **violation severity**.

## How to Review Code

1. Layer: correct layer per AI_RULES? 2. Imports: any forbidden crossings? 3. Domain: pure, IO-free? 4. Store: orchestration only, no logic? 5. Services: mappers only in core/services? 6. IO: isolated to core/api?

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
