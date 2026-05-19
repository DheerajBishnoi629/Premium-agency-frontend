import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

/** Shape persisted under STORAGE_KEY (after obfuscation). */
interface PersistedSession {
  token: string;
  user: AuthUser;
  /** Expiry time as an ISO date string. */
  expiresAt: string;
}

const STORAGE_KEY = 'pa.session.v1';
/**
 * Dummy obfuscation key. NOT cryptography — `localStorage` is readable by any
 * script that runs on the origin. A real implementation must use HttpOnly,
 * Secure, SameSite cookies issued by the backend. This XOR pass exists only
 * to satisfy the brief's "encrypted dummy token" requirement and to avoid
 * shipping a plaintext token in DevTools.
 */
const OBFUSCATION_KEY = 'pa-obfuscation-key-v1';

const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

/**
 * Mock authentication service.
 *
 * Tracks login state via Signals, persists an obfuscated session blob in
 * `localStorage`, and is safe to use under SSR (every storage call is gated
 * on the browser platform).
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _session = signal<PersistedSession | null>(this.readPersisted());

  readonly session = this._session.asReadonly();
  readonly user = computed(() => this._session()?.user ?? null);
  readonly isAuthenticated = computed(() => this._session() !== null);

  constructor() {
    // Sync the signal back to storage whenever it changes.
    effect(() => {
      if (!this.isBrowser) return;
      const value = this._session();
      try {
        if (value) {
          localStorage.setItem(STORAGE_KEY, obfuscate(JSON.stringify(value)));
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        // Storage may be unavailable (private mode, quota). Fail silently.
      }
    });
  }

  /**
   * Mock credential check. The real implementation would POST to an auth
   * endpoint and receive a server-issued token.
   *
   * Valid demo credentials: `admin@premium.agency` / `premium2026`.
   */
  async login(email: string, password: string): Promise<AuthUser> {
    // Simulate network latency.
    await new Promise((resolve) => setTimeout(resolve, 600));

    const normalized = email.trim().toLowerCase();
    if (normalized !== 'admin@premium.agency' || password !== 'premium2026') {
      throw new AuthError('Invalid email or password.');
    }

    const user: AuthUser = {
      id: 'usr_admin',
      email: normalized,
      name: 'Studio Admin',
      role: 'admin',
    };

    this._session.set({
      token: this.mintToken(user),
      user,
      expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString(),
    });
    return user;
  }

  /** Clears in-memory and persisted session. */
  logout(): void {
    this._session.set(null);
  }

  private mintToken(user: AuthUser): string {
    // Random opaque dummy token. Not a JWT — never trust on the client.
    const entropy = this.isBrowser && 'crypto' in globalThis
      ? Array.from(crypto.getRandomValues(new Uint8Array(24)))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('')
      : Math.random().toString(36).slice(2);
    return `${user.id}.${entropy}`;
  }

  private readPersisted(): PersistedSession | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(deobfuscate(raw)) as PersistedSession;
      if (!parsed?.expiresAt || new Date(parsed.expiresAt).getTime() < Date.now()) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return parsed;
    } catch {
      // Corrupted blob — drop it.
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* noop */
      }
      return null;
    }
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

// --- Tiny obfuscation helpers -------------------------------------------------
// XOR over the bytes then base64. Not encryption — see note above.

function obfuscate(input: string): string {
  const xored = xorBytes(textToBytes(input), textToBytes(OBFUSCATION_KEY));
  return bytesToBase64(xored);
}

function deobfuscate(input: string): string {
  const xored = xorBytes(base64ToBytes(input), textToBytes(OBFUSCATION_KEY));
  return bytesToText(xored);
}

function textToBytes(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function bytesToText(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

function xorBytes(data: Uint8Array, key: Uint8Array): Uint8Array {
  const out = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    out[i] = data[i] ^ key[i % key.length];
  }
  return out;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCodePoint(byte);
  }
  return btoa(binary);
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.codePointAt(i) ?? 0;
  }
  return bytes;
}
