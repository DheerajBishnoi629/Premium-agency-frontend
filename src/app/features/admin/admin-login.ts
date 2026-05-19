import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthError, AuthService } from '../../core/services/auth.service';

interface LoginFormShape {
  email: FormControl<string>;
  password: FormControl<string>;
}

type Status = 'idle' | 'submitting' | 'error';

@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-login.html',
})
export default class AdminLogin {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly status = signal<Status>('idle');
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly showPassword = signal(false);

  protected readonly form = this.fb.group<LoginFormShape>({
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
    }),
    password: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  protected isInvalid(name: keyof LoginFormShape): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || control.dirty);
  }

  protected errorFor(name: keyof LoginFormShape): string | null {
    const control = this.form.controls[name];
    if (!(control.touched || control.dirty) || !control.errors) return null;
    if (control.errors['required']) return 'Required.';
    if (control.errors['email']) return 'Enter a valid email address.';
    if (control.errors['minlength']) {
      return `At least ${control.errors['minlength'].requiredLength} characters.`;
    }
    return 'Invalid value.';
  }

  protected toggleShowPassword(): void {
    this.showPassword.update((v) => !v);
  }

  protected async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('submitting');
    this.errorMessage.set(null);
    const { email, password } = this.form.getRawValue();

    try {
      await this.auth.login(email, password);
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      await this.router.navigateByUrl(this.sanitizeReturnUrl(returnUrl) ?? '/admin');
    } catch (err) {
      this.status.set('error');
      this.errorMessage.set(
        err instanceof AuthError ? err.message : 'Something went wrong. Please try again.',
      );
    }
  }

  /**
   * Open-redirect hardening: only permit returnUrl values that stay on this
   * origin (relative paths starting with a single `/`).
   */
  private sanitizeReturnUrl(value: string | null): string | null {
    if (!value) return null;
    if (!value.startsWith('/') || value.startsWith('//')) return null;
    return value;
  }
}
