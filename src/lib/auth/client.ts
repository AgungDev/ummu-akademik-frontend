import {
  AuthenticatedHttpClient,
  SessionManager,
  TokenManager,
  UMMUAuthClient,
  type AuthSession,
  type AuthUser,
} from '@ganz404/js-auth'

const authBaseUrl = (
  import.meta.env.VITE_AUTH_BASE_URL || window.location.origin
).replace(/\/+$/, '')
const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || window.location.origin
).replace(/\/+$/, '')

export const authClient = new UMMUAuthClient({
  authServiceUrl: authBaseUrl,
})

export const tokenManager = new TokenManager('session')
export const sessionManager = new SessionManager(tokenManager)
export const authenticatedHttp = new AuthenticatedHttpClient(
  apiBaseUrl,
  authBaseUrl,
  tokenManager,
  globalThis.fetch.bind(globalThis),
)

interface ApiEnvelope<T> {
  data?: T
  message?: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function readUser(value: unknown): AuthUser | undefined {
  if (!isRecord(value)) return undefined

  return {
    id: typeof value.id === 'string' ? value.id : undefined,
    username: typeof value.username === 'string' ? value.username : undefined,
    email: typeof value.email === 'string' ? value.email : undefined,
    full_name: typeof value.full_name === 'string' ? value.full_name : undefined,
  }
}

async function readEnvelope<T>(response: Response): Promise<ApiEnvelope<T>> {
  let payload: unknown
  try {
    payload = await response.json()
  } catch {
    throw new Error('Respons Auth Service tidak dapat dibaca.')
  }
  if (!isRecord(payload)) {
    throw new Error('Auth Service mengembalikan respons yang tidak valid.')
  }

  const envelope = payload as ApiEnvelope<T>
  if (!response.ok) {
    throw new Error(
      typeof envelope.message === 'string'
        ? envelope.message
        : `Permintaan autentikasi gagal (HTTP ${response.status}).`,
    )
  }
  return envelope
}

export async function loginWithPassword(
  username: string,
  password: string,
): Promise<AuthSession> {
  const response = await globalThis.fetch(`${apiBaseUrl}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  const envelope = await readEnvelope<unknown>(response)
  if (!isRecord(envelope.data)) {
    throw new Error('Respons login tidak berisi data autentikasi.')
  }

  const data = envelope.data
  if (
    typeof data.access_token !== 'string' ||
    !data.access_token ||
    typeof data.refresh_token !== 'string' ||
    !data.refresh_token ||
    data.token_type !== 'Bearer' ||
    typeof data.expires_in !== 'number' ||
    !Number.isFinite(data.expires_in) ||
    data.expires_in <= 0
  ) {
    throw new Error('Respons login tidak berisi token yang valid.')
  }

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    tokenType: 'Bearer',
    expiresAt: Date.now() + data.expires_in * 1000,
    user: readUser(data.user),
  }
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await authenticatedHttp.fetch('/api/v1/auth/me')
  const envelope = await readEnvelope<unknown>(response)
  const user = readUser(envelope.data)
  if (!user) {
    throw new Error('Respons profil tidak berisi data pengguna yang valid.')
  }
  return user
}
