# Araci development instructions

## Project context

- This repository is an Angular application. Treat the versions in `package.json` and
  `package-lock.json` as the source of truth; do not rely on the version mentioned in the README.
- The application uses standalone components, strict TypeScript, strict Angular templates, SCSS,
  Bootstrap, RxJS, reactive forms, and functional application providers.
- Keep cross-cutting application infrastructure under `src/app/core`, project-domain features under
  `src/app/projects`, reusable presentation components under `src/app/shared/ui`, and shared form
  behavior under `src/app/shared/forms`. Existing pages and layouts remain in their legacy folders
  until their area migration is requested; do not add new top-level `services` or `requests`
  abstractions.
- Preserve unrelated user changes and follow the naming and file organization of the surrounding
  feature unless a requested refactor intentionally changes that convention.

## Angular workflow

- When the Angular MCP tools are available, consult `get_best_practices` before substantial Angular
  implementation or review work. Use documentation or example-search tools when an API or current
  Angular behavior is uncertain.
- Prefer current APIs supported by the installed Angular version. Do not introduce APIs from a newer
  Angular release without upgrading the project explicitly.
- Keep components focused. Put reusable UI behavior in `src/app/shared/ui`, reusable form behavior
  in `src/app/shared/forms`, domain APIs and application behavior with their owning feature, and
  route-level composition in pages and layouts.
- Prefer standalone imports, `inject()` for new dependency injection, signals for synchronous local
  state, computed values for derived state, and native template control flow (`@if`, `@for`,
  `@switch`). Use RxJS for asynchronous streams and cancellation where it is the clearer model.
- Prefer signal-based `input()` and `output()` for new components. Do not mechanically rewrite stable
  existing components unless the task benefits from the migration.
- Use `ChangeDetectionStrategy.OnPush` for new components when their inputs and state make it safe.
- Keep templates declarative and accessible: use semantic elements, associated labels, keyboard
  interaction, visible focus, and appropriate ARIA only when native semantics are insufficient.
- Keep HTTP details typed, avoid `any`, and do not expose secrets or environment credentials to the
  browser bundle.

## API contract and environments

- Before creating or editing any HTTP call, request/response type, authentication behavior, or API
  validation, fetch the current OpenAPI document from `http://localhost:4040/swagger/json`. The
  backend is under active development, so consult the live document for every task instead of
  relying on a previously observed contract.
- Treat the OpenAPI path, HTTP method, security scheme, required fields, validation constraints,
  success response, and error response as the source of truth. Create explicit TypeScript input,
  output, and error types from that contract; do not infer undocumented fields or use `any` as a
  substitute for reading the schema.
- If the OpenAPI endpoint is unavailable, report that limitation and request a current schema or
  explicit contract before inventing an API call. Do not silently preserve a stale route when a
  requested HTTP change depends on the live backend contract.
- Keep domain API classes with their owning feature. Reserve `src/app/core/http` for shared HTTP
  infrastructure such as environment tokens and interceptors. Web and admin sessions are distinct;
  never send a web credential to an admin route or an admin credential to a web route.
- Import application configuration through the neutral `src/environments/environment.ts` entry
  point or the typed tokens in `src/app/core/config` and `src/app/core/http`. Never import a named
  environment file directly. Environment files contain public build configuration only, never
  secrets.

## Styling and visual consistency

- Before creating or editing a page or component style, inspect `src/styles.scss`, the affected
  template and SCSS, and `docs/styles.md`. Reuse the project's existing tokens, grid, utilities, form
  primitives, buttons, surfaces, typography, spacing, borders, focus states, and breakpoints.
- Every new page and component must follow the existing visual language. Preserve the established
  palette, soft-contrast dark theme, typography, spacing rhythm, border radii, control sizing, and
  interaction states unless the task explicitly changes the design system.
- Treat the unqualified style as the mobile layout. Add complexity progressively with the
  mobile-first `min-width` breakpoints documented in `docs/styles.md`; do not introduce arbitrary or
  desktop-first breakpoints when an existing breakpoint serves the requirement.
- Decide style placement before writing CSS:
  1. If an existing token or utility expresses the requirement, use it instead of adding CSS.
  2. If a rule represents a reusable design decision, is repeated, or is likely to serve multiple
     pages or components, implement it once in `src/styles.scss` and document it when necessary.
  3. Keep a rule in the component SCSS only when it describes that component's exclusive structure,
     geometry, state, animation, or responsive behavior.
- Do not copy declarations from `src/styles.scss` into component SCSS. Do not create near-duplicate
  colors, spacings, radii, shadows, control sizes, breakpoints, or utility classes for minor visual
  differences; use or extend the shared scale instead.
- Before adding a new global token or class, search for an equivalent and check its consumers. Use a
  semantic name and avoid one-off global utilities that only hide component-specific styling.
- When a change adds or alters a shared style contract, update `docs/styles.md` in the same change.
- During review, flag raw color values, unexplained fixed spacing, duplicated declarations,
  desktop-first media queries, and new components that visually diverge from adjacent screens.

## Quality checks

- Add or update focused tests for meaningful behavior changes, even though the current schematics
  skip test-file generation by default.
- After TypeScript, template, route, dependency, or build-configuration changes, run `npm run build`.
- Run `npm test -- --watch=false` when relevant tests exist and the environment provides a browser.
- Treat compiler and strict-template errors as defects; do not silence them with broad casts or by
  weakening strict compiler settings.
- Keep formatting compatible with the Prettier settings in `package.json`.

## Change discipline

- Before editing, inspect the affected component, its template and styles, and its direct consumers.
- Prefer the smallest cohesive change that solves the requested behavior.
- Do not change authentication, guards, API contracts, or environment configuration based only on an
  assumption; verify their consumers and expected backend contract first.
- Summarize changed files and report the exact checks run, including any check that could not run.
