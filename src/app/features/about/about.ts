import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-white sm:text-5xl">About us</h1>
      <p class="mt-6 text-lg text-slate-300">
        A small, senior team of strategists, designers, and engineers.
      </p>
    </section>
  `,
})
export default class About {}
