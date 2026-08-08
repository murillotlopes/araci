# API contract and environments

## OpenAPI is the source of truth

The backend publishes its current OpenAPI 3 contract at:

```text
http://localhost:4040/swagger/json
```

Read this document immediately before creating or changing an HTTP integration. The backend is
under active development, so paths and schemas observed in an earlier task may no longer be valid.
Use the documented method, path, security scheme, input validation, success output, and error output
to define typed API methods and DTOs.

Domain API classes belong to their feature. `core/http` contains only cross-cutting infrastructure.
The shared authentication interceptor selects credentials from the URL area:

- `/web`: web access token and web refresh cookie support;
- `/admin`: admin access token;
- other URLs: no Pindorama credential is attached.

## Angular environments

Angular replaces `src/environments/environment.ts` at build time according to the selected named
configuration. These files are shipped to the browser and must never contain secrets.

| Configuration | API server | Command |
| --- | --- | --- |
| development | `http://localhost:4000` | `npm run build:development` |
| sandbox | `https://sandbox.smart.pin` | `npm run build:sandbox` |
| homologation | `https://homologation.smart.pin` | `npm run build:homologation` |
| production | `https://smart.pin` | `npm run build:production` |

For a local development server, use `npm start`, `npm run start:sandbox`,
`npm run start:homologation`, or `npm run start:production`.

Changing a configuration selects a different build-time API address. It does not change the
environment of an already generated artifact. Build the application with the target configuration
before deploying it.
