# Architecture Conventions

**Core rules**: See `../AI_RULES.md` (Section 1: layer definitions, Section 2: prohibitions)

Below: dependency flow, SDD integration, and validation checklist.

## Dependency Flow

```
views / shared/modules 
  ↓
store 
  ↓
core/services ← connects to → core/api
  ↓
core/domain

core/domain depends on nothing.
```

**Rule**: Imports must only flow downward (inward to domain).

## Spec-Driven Development Rules

- Every feature change must be driven by an explicit spec.
- Specs define behavior before implementation.
- Tests must directly trace to spec acceptance criteria.
- Architecture rules in specs are binding and non-negotiable.

## Validation Checklist

- All changes live in correct layer (see AI_RULES.md)
- Imports follow dependency flow rules (downward only)
- All behavior changes are spec-backed
- Tests cover acceptance criteria from spec
