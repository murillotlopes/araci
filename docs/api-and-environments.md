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
The shared authentication interceptor selects credentials from the URL area and from the explicit
request context:

- public `/web` and `/admin` calls: no access token;
- private `/web` calls: use `withWebAccessToken()` in the request context;
- private `/admin` calls: use `withAdminAccessToken()` in the request context;
- `/web/auth/refresh`: sends the HttpOnly refresh cookie and never the access token;
- other URLs: no Pindorama credential is attached.

The sign-in call uses `withCredentials` only so the browser accepts the `Set-Cookie` response. The
cookie itself is scoped by the backend to `Path=/web/auth/refresh`, so the browser does not send it
to sign-in, registration, or private business routes. Cookie `Path` matches the HTTP request URL,
not the current client-side route. Do not add `withCredentials` to other calls.

Access tokens are held only in the in-memory web/admin session services. Never persist an access
token, its expiry, or its authentication type in `localStorage` or `sessionStorage`. The session
calculates an absolute expiry from the documented `expiresIn` value and renews a web token shortly
before it expires. Concurrent private requests share the same refresh operation.

When sign-in returns `withRefreshToken: true`, the application persists only that non-secret signal
in `localStorage`. After a page reload, a web guard attempts `/web/auth/refresh` only when this
signal exists. The refresh cookie is HttpOnly and is therefore stored, sent, rotated, and expired
exclusively by the browser and backend. JavaScript must not attempt to read or delete it. A 401
removes the local signal while the backend expires the cookie.

A 401 clears the in-memory session and the persisted refresh-token signal. Theme and other
unrelated browser preferences must not be removed. Static navigation configuration is read directly
from the application and is not duplicated in browser storage.

After sign-in, decode the JWT payload only to coordinate the client flow; decoding is not signature
validation and never replaces backend authorization. The currently supported temporary-token
requirements are:

- `MFA`, with `availableMethods` and `selectedMethod`;
- `NOrganizations`, with the selectable organization identifiers in `organizations`.

A token containing either requirement stays in memory but does not represent a complete private
session. Do not route it to the dashboard. Add the corresponding page transition only when its API
route is available in OpenAPI. A token without `required` represents the complete session flow.

Example of an authenticated web request:

```ts
return this.http.get<Output>(url, { context: withWebAccessToken() });
```

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
