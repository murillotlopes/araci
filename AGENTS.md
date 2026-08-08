# Araci development instructions

## Project context

- This repository is an Angular application. Treat the versions in `package.json` and
  `package-lock.json` as the source of truth; do not rely on the version mentioned in the README.
- The application uses standalone components, strict TypeScript, strict Angular templates, SCSS,
  Bootstrap, RxJS, reactive forms, and functional application providers.
- Keep public pages under `src/app/pages/public`, authenticated pages under
  `src/app/pages/private`, layouts under `src/app/layouts`, reusable presentation components under
  `src/app/ui`, and API access under `src/app/services` and `src/app/requests`.
- Preserve unrelated user changes and follow the naming and file organization of the surrounding
  feature unless a requested refactor intentionally changes that convention.

## Angular workflow

- When the Angular MCP tools are available, consult `get_best_practices` before substantial Angular
  implementation or review work. Use documentation or example-search tools when an API or current
  Angular behavior is uncertain.
- Prefer current APIs supported by the installed Angular version. Do not introduce APIs from a newer
  Angular release without upgrading the project explicitly.
- Keep components focused. Put reusable UI behavior in `src/app/ui`, business or API behavior in a
  service, and route-level composition in pages and layouts.
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
