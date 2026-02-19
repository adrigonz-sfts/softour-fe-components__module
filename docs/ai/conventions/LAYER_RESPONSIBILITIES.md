# Layer Responsibilities

**See `../AI_RULES.md` Section 1 for complete layer definitions (can/must/cannot per layer).**

This document summarizes key responsibilities:

| Layer | Primary Role | Key Constraint |
|-------|--------------|----------------|
| api | IO & infrastructure | No business logic |
| domain | Pure business rules | No IO, no dependencies |
| services | Orchestrate use cases | No UI access, no direct IO |
| store | State management | No complex logic, delegates to services |
| shared | Generic components & utils | No business rules, no store access |
| modules | Smart UI composition | No business rules |
| views | Page composition | Thin, orchestration only |

## Data Flow

UI event → Store action → core/services (call api + map to domain) → Store state → UI render

## Validation Checklist

- Each change belongs to the correct layer (see AI_RULES.md)
- No IO outside core/api
- No business logic in store/modules/views
- Mappers only in core/services
- Domain is pure and immutable
