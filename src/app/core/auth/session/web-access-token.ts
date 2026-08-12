export const WEB_MFA_METHODS = [
  'TOTP',
  'WHATS_APP',
  'FACE_BIOMETRICS',
  'VOICE_BIOMETRICS',
  'EMAIL',
  'SMS',
] as const;

export type WebMfaMethod = typeof WEB_MFA_METHODS[number];

export interface WebMfaRequirement {
  required: 'MFA';
  availableMethods: WebMfaMethod[];
  selectedMethod: WebMfaMethod;
}

export interface WebOrganizationsRequirement {
  required: 'NOrganizations';
  organizations: Array<{ id: string }>;
}

export type WebAccessRequirement = WebMfaRequirement | WebOrganizationsRequirement;

export interface WebAccessTokenPayload {
  requirement: WebAccessRequirement | null;
  expiresAt?: number;
}

export function decodeWebAccessToken(accessToken: string): WebAccessTokenPayload {
  const payloadPart = accessToken.split('.')[1];
  if (!payloadPart) throw new Error('Access token inválido.');

  let payload: unknown;

  try {
    const normalized = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    const bytes = Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
    payload = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new Error('Não foi possível interpretar o access token.');
  }

  if (!isRecord(payload)) throw new Error('Payload do access token inválido.');

  return {
    requirement: parseRequirement(payload),
    expiresAt: typeof payload['exp'] === 'number' ? payload['exp'] * 1000 : undefined,
  };
}

function parseRequirement(payload: Record<string, unknown>): WebAccessRequirement | null {
  const required = payload['required'];
  if (required === undefined || required === null) return null;

  if (required === 'MFA') {
    const availableMethods = payload['availableMethods'];
    const selectedMethod = payload['selectedMethod'];

    if (!Array.isArray(availableMethods) || !availableMethods.every(isWebMfaMethod) || !isWebMfaMethod(selectedMethod)) {
      throw new Error('Payload MFA inválido.');
    }

    return { required, availableMethods, selectedMethod };
  }

  if (required === 'NOrganizations') {
    const organizations = payload['organizations'];

    if (!Array.isArray(organizations) || !organizations.every(isOrganizationReference)) {
      throw new Error('Payload de organizações inválido.');
    }

    return { required, organizations };
  }

  throw new Error(`Requisito de autenticação desconhecido: ${String(required)}.`);
}

function isWebMfaMethod(value: unknown): value is WebMfaMethod {
  return typeof value === 'string' && (WEB_MFA_METHODS as readonly string[]).includes(value);
}

function isOrganizationReference(value: unknown): value is { id: string } {
  return isRecord(value) && typeof value['id'] === 'string';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
