# Spec Guidelines (Spec-Driven Development)

This document defines how to write and manage specifications for a frontend project using pragmatic DDD.

## 1) What Spec-Driven Development means in frontend

Spec-Driven Development (SDD) is a workflow where each feature begins with a written specification that defines behavior, inputs, outputs, constraints, and acceptance criteria before code is written.

In frontend, SDD ensures:
- UI behavior is explicit and testable.
- Business rules are captured outside the implementation.
- Architectural boundaries are respected by design.
- Tests are derived directly from the spec.

## 2) How a spec must be structured

Each spec must be written as a standalone, complete document that explains what the feature does and how it should be validated. The spec must be structured with clear sections and consistent ordering.

The spec must:
- Use plain language that is testable.
- Be precise about inputs and outputs.
- Declare architectural constraints and layer placement.
- Define acceptance criteria in observable terms.

## 3) Functional spec vs technical spec

- Functional spec: describes user-visible behavior, workflows, states, and outcomes. It is written for product and QA alignment.
- Technical spec: describes system interactions, data flow, layer responsibilities, and integration constraints. It is written for implementation alignment.

Both can be in the same document, but the functional portion must come first and be clearly separated from the technical portion.

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

## 6) How to version specs

- Each spec must have a version number in the header (e.g., v1.0, v1.1).
- Each update must document what changed and why.
- Breaking changes must increment the major version.
- Minor clarifications without behavior changes increment the minor version.
- Specs should be stored in a dedicated folder and referenced by feature name.

## 7) How to relate specs to tests

- Every acceptance criterion must map to at least one test case.
- Tests must reference the spec ID or filename in their description or metadata.
- If a test is added, removed, or changed, the spec must be updated accordingly.
- If a spec changes behavior, affected tests must be updated in the same PR.

## Step-by-step workflow

1. Draft the spec using the mandatory structure.
2. Review the spec for clarity and testability.
3. Confirm architectural constraints and layer placement.
4. Derive acceptance criteria and map them to tests.
5. Implement the feature strictly following the spec.
6. Update the spec and tests together when changes are needed.
