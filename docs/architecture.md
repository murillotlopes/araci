# Frontend architecture

## Top-level structure

`src/app` has three ownership boundaries:

```text
app/
├── core/
├── projects/
└── shared/
```

- `core`: application bootstrap and infrastructure used across projects, such as environment
  configuration, HTTP interceptors, URL tokens, and isolated web/admin session storage.
- `projects`: independently routed application areas. `web` and `admin` each own public and private
  experiences.
- `shared`: area-neutral forms and visual components with no dependency on a project.

## Project structure

```text
projects/
├── web/
│   ├── auth/
│   ├── public/
│   ├── private/
│   └── web.routes.ts
└── admin/
    ├── public/
    ├── private/
    └── admin.routes.ts
```

Public means accessible without that project's authenticated session. Private means protected by
that project's session and authorization rules. Web and admin must not share credentials, guards,
navigation configuration, layouts, or project-specific facades.

Inside a feature, add only the layers it needs:

- `data-access`: an API client and DTOs derived from the live OpenAPI contract;
- `application`: a use case, facade, or feature store that coordinates calls and state;
- `pages`: route-level components;
- `ui`: components reusable only inside that feature.

A simple page may call one API directly. Add a facade when navigation, notifications, state, data
transformation, or multiple operations need coordination. Do not create a service that only forwards
the same arguments to another class.

## Dependency direction

```text
page -> facade/use case -> API -> core HTTP infrastructure
  |            |
  +------> shared UI and pure domain functions
```

`shared` must not import from `projects`. `core` must not contain domain APIs. A project may use
`core` and `shared`, but one project must not reach into another project.
