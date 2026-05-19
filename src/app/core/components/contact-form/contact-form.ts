import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BusinessType, LeadService } from '../../services/lead.service';
import { WhatsAppService } from '../../services/whatsapp.service';

interface BusinessOption {
  value: BusinessType;
  label: string;
}

/**
 * Strictly typed shape of the form. Each control is non-nullable so the
 * resulting `getRawValue()` matches `LeadPayload` directly — no `any`, no
 * post-processing.
 */
interface ContactFormShape {
  name: FormControl<string>;
  phone: FormControl<string>;
  businessType: FormControl<BusinessType | ''>;
  requirement: FormControl<string>;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly leads = inject(LeadService);
  protected readonly whatsapp = inject(WhatsAppService);

  /** Identifies where the lead came from (e.g. 'contact-page', 'home-cta'). */
  readonly source = input<string>('contact-form');

  protected readonly status = signal<Status>('idle');
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly businessTypes: readonly BusinessOption[] = [
    { value: 'shop', label: 'Shop / Retail Store' },
    { value: 'restaurant', label: 'Restaurant / Cafe' },
    { value: 'clinic', label: 'Clinic / Hospital' },
    { value: 'service-provider', label: 'Service Provider' },
    { value: 'manufacturing', label: 'Manufacturing / Wholesale' },
    { value: 'education', label: 'Coaching / Education' },
    { value: 'other', label: 'Something else' },
  ];

  protected readonly form = this.fb.group<ContactFormShape>({
    name: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(80)],
    }),
    phone: this.fb.control('', {
      validators: [
        Validators.required,
        // Indian mobile: 10 digits starting 6-9, optional +91 / 91 / 0 prefix, optional spaces/dashes.
        Validators.pattern(/^(?:\+?91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}$/),
      ],
    }),
    businessType: this.fb.control<BusinessType | ''>('', {
      validators: [Validators.required],
    }),
    requirement: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(1000),
      ],
    }),
  });

  /** Returns the first error message for a control, or `null` when valid/untouched. */
  protected errorFor(name: keyof ContactFormShape): string | null {
    const control = this.form.controls[name];
    if (!(control.touched || control.dirty)) return null;
    if (!control.errors) return null;

    const errors = control.errors;
    if (errors['required']) return 'Please fill in this field.';
    if (errors['minlength']) {
      return `Please enter at least ${errors['minlength'].requiredLength} characters.`;
    }
    if (errors['maxlength']) {
      return `Please keep it under ${errors['maxlength'].requiredLength} characters.`;
    }
    if (errors['pattern']) {
      if (name === 'phone') return 'Please enter a valid 10-digit Indian mobile number.';
      return 'Please enter a valid value.';
    }
    return 'This value is invalid.';
  }

  protected isInvalid(name: keyof ContactFormShape): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || control.dirty);
  }

  protected requirementLength(): number {
    return this.form.controls.requirement.value.length;
  }

  protected async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('submitting');
    this.errorMessage.set(null);

    const raw = this.form.getRawValue();
    try {
      await this.leads.submit({
        name: raw.name.trim(),
        phone: raw.phone.trim(),
        // Type-narrow: required validator guarantees this is not the empty string.
        businessType: raw.businessType as BusinessType,
        requirement: raw.requirement.trim(),
        source: this.source(),
      });
      this.status.set('success');
      this.form.reset();
    } catch {
      this.status.set('error');
      this.errorMessage.set(
        "Sorry, we couldn't send your message. Please try again or message us on WhatsApp.",
      );
    }
  }

  protected reset(): void {
    this.form.reset();
    this.status.set('idle');
    this.errorMessage.set(null);
  }
}
