# AI Rules for Layered Frontend (Vue 3, DDD Pragmatic)

**Source of truth for layer rules.** Complementary docs: `ARCHITECTURE_ENFORCEMENT.md` (review criteria), `conventions/LAYER_RESPONSIBILITIES.md` (summary table).

## General Rules

- Do not over-explain unless explicitly requested.
- Do not justify decisions unless asked.
- Do not restate the context unless required.
- Avoid repeating architectural rules unless they are being validated.
- Do not generate alternative solutions unless requested.
- Do not speculate.
- Do not add narrative or motivational language.
- Do not include decorative markdown.

---

## Response Style

- Be concise.
- Prefer bullet points over paragraphs.
- Return only what is requested.
- If code is requested → return only code.
- If explanation is requested → limit to essential reasoning.
- Avoid examples unless explicitly requested.
- Avoid reformatting existing content unless asked.

---

## Architectural Discipline

- Identify the correct layer internally.
- Do not output architectural justification unless requested.
- Do not redesign structure.
- Do not introduce new abstractions.
- Do not refactor unrelated code.

---

## When the Prompt Is Short

- Assume minimal scope.
- Do not expand the problem.
- Do not anticipate future features.
- Ask for clarification only if absolutely necessary.
- If ambiguity is minor → make the safest assumption and proceed.

## 1) Strict rules by layer

### core/api (infrastructure, IO)

- Can: perform IO (HTTP, storage, browser APIs), configure clients, handle endpoints, serialize/deserialize raw responses.
- Can: use networking libraries, fetch, axios, and similar.
- Must: expose data access functions without domain logic.
- Cannot: know business rules or domain shapes beyond DTOs.
- Cannot: use store state or access UI components.

### core/domain (pure, immutable rules)

- Can: validate invariants, create immutable entities, define pure and deterministic rules.
- Can: throw domain errors for invalid data.
- Must: be fully pure and side-effect free.
- Cannot: perform IO of any kind.
- Cannot: depend on core/api, core/services, store, shared, modules, views.
- Cannot: use dates, randomness, or global state unless provided as arguments.

### core/services (use cases and mappers)

- Can: orchestrate calls to core/api and convert DTOs to domain.
- Can: apply business rules using core/domain.
- Must: keep application orchestration logic.
- Cannot: manipulate UI or use global store state.
- Cannot: access components or view routes directly.

### store (state, no business logic)

- Can: store state, expose simple actions and derived getters.
- Can: invoke core/services to load data.
- Must: be passive about business rules; only delegates.
- Cannot: contain complex domain logic or business validations.
- Cannot: do direct IO (must go through core/services).

### shared (components, composables, utils)

- Can: provide generic utilities, reusable composables, pure UI components.
- Must: avoid mixing domain logic; if present, move to core/domain or core/services.
- Cannot: do direct IO except cases explicitly approved in core/api.
- Cannot: access the store directly from shared/composables.
- Cannot: call core/services directly; shared must consume data passed from store/modules/views.

### modules (smart view sections)

- Can: compose components, connect store, orchestrate UI interactions.
- Can: manage local UI state.
- Must: delegate business rules to core/services or core/domain.
- Cannot: implement domain rules or direct IO.

### views (composition)

- Can: assemble layouts, routes, and modules.
- Can: initialize data by calling store or composables.
- Must: stay thin; no business logic.
- Cannot: do direct IO or create domain rules.

## 2) Clear prohibitions

- Forbidden: IO in core/domain.
- Forbidden: business rules in store, shared, modules, or views.
- Forbidden: importing core/api from core/domain.
- Forbidden: importing store or views in core/services or core/domain.
- Forbidden: calling endpoints from UI components in production code. Tests may mock core/api to isolate IO.
- Forbidden: mappers in store or in views.
- Forbidden: mutability in domain entities.
- Forbidden: store access from shared/composables.
- Forbidden: core/services access from shared.

## 3) Official data flow

1. UI (views/modules/components) triggers user events.
2. Store receives events and delegates to core/services.
3. core/services calls core/api for IO.
4. core/services maps DTOs to core/domain.
5. Store receives domain entities and updates state.
6. UI renders store state.

## 4) How the AI must respond when asked for code

- Identify the correct layer; refuse and propose correct location if rules are violated.
- Explain in one sentence why that layer is correct.
- Do not invent new layers or file paths; follow real project structure.

## 5) Mandatory checklist before generating code

- Layer correct; no IO in domain; no business logic in store/views/shared/modules.
- Mappers in core/services; imports only in permitted direction; domain immutable; no circular deps.

## 6) Communication style

- Only strictly relevant information; no verbose explanations or unnecessary context.
- Direct answers; when listing changes, be brief (what was done, what's next if applicable).
