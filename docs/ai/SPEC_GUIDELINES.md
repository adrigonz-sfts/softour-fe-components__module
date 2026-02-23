# Spec Guidelines (Spec-Driven Development)

## 1) What Spec-Driven Development means

- Feature starts with a written spec (behavior, inputs, outputs, constraints, acceptance criteria) before code.
- UI behavior explicit and testable; business rules outside implementation; architecture respected; tests derived from spec.

## 2) How a spec must be structured

- Standalone, complete document; clear sections, consistent order.
- Plain language, testable; precise inputs/outputs; architectural constraints and layer placement declared; acceptance criteria observable.

## 3) Functional vs technical spec

- Functional: user-visible behavior, workflows, states, outcomes (product/QA). Technical: data flow, layer responsibilities, integration (implementation).
- Both may be in one document; functional first, clearly separated.

## 4) Mandatory structure of every spec

Each spec must include these sections in this order:

1. Objective
   - What problem the feature solves.
   - The single most important outcome.

2. Inputs
   - Entry points (UI events, routes, store actions, service calls).
   - Required inputs and formats.
   - Optional inputs and defaults.

3. Outputs
   - UI changes and visible feedback.
   - State updates and side effects.
   - Data transformations and return shapes.

4. Edge Cases
   - Empty states.
   - Error states.
   - Boundary conditions and invalid inputs.

5. Architectural Constraints
   - Layer rules that must be respected.
   - Prohibited dependencies.
   - Required layer placement for logic and IO.

6. Acceptance Criteria
   - Testable statements using Given/When/Then.
   - Clear pass/fail conditions.
   - Coverage of happy path and edge cases.

## 5) What a spec must NOT contain

- Implementation details or code decisions that belong to the code review phase.
- Specific UI styling details unless they are functional requirements.
- References to temporary hacks or shortcuts.
- Undefined terms or ambiguous language.
- Hidden requirements not surfaced in acceptance criteria.

## 6) Versioning

- Version in header (e.g. v1.0); document what changed and why; breaking = major bump; clarifications = minor. Store in dedicated folder, reference by feature name.

## 7) Specs and tests

- Every acceptance criterion maps to ≥1 test; tests reference spec ID/filename; spec and tests updated together in same PR when behavior changes.

## Workflow

1. Draft spec (mandatory structure) → 2. Review clarity and testability → 3. Confirm layer placement → 4. Derive acceptance criteria and map to tests → 5. Implement following spec → 6. Update spec and tests together when needed.
