import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6 lg:px-8">
      <p class="text-sm font-semibold uppercase tracking-widest text-emerald-400">404</p>
      <h1 class="mt-3 text-5xl font-bold text-white">Page not found</h1>
      <p class="mt-4 text-slate-300">The page you’re looking for doesn’t exist or has moved.</p>
      <a
        routerLink="/"
        class="mt-8 inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
      >
        Back to home
      </a>
    </section>
  `,
})
export default class NotFound {}
