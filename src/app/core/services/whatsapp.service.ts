import { Injectable, computed, signal } from '@angular/core';

export interface WhatsAppConfig {
  /** Phone number in international format, digits only (e.g. 15551234567). */
  phone: string;
  /** Default pre-filled message. */
  defaultMessage: string;
  /** Whether the floating CTA is visible on the current view. */
  visible: boolean;
}

const DEFAULT_CONFIG: WhatsAppConfig = {
  phone: '917733048629',
  defaultMessage: 'Hi, I want to discuss a website for my business.',
  visible: true,
};

/**
 * Signal-backed service that controls the global WhatsApp call-to-action.
 * Components read the reactive `href` / `visible` signals; pages can
 * customize the message or hide the CTA (e.g. on the admin panel).
 */
@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  private readonly _config = signal<WhatsAppConfig>(DEFAULT_CONFIG);

  readonly config = this._config.asReadonly();
  readonly visible = computed(() => this._config().visible);

  readonly href = computed(() => {
    const { phone, defaultMessage } = this._config();
    const text = encodeURIComponent(defaultMessage);
    return `https://wa.me/${phone}?text=${text}`;
  });

  setMessage(message: string): void {
    this._config.update((cfg) => ({ ...cfg, defaultMessage: message }));
  }

  setPhone(phone: string): void {
    this._config.update((cfg) => ({ ...cfg, phone }));
  }

  show(): void {
    this._config.update((cfg) => ({ ...cfg, visible: true }));
  }

  hide(): void {
    this._config.update((cfg) => ({ ...cfg, visible: false }));
  }

  reset(): void {
    this._config.set(DEFAULT_CONFIG);
  }
}
