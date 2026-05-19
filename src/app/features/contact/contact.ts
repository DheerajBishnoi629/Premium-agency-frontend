import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactForm } from '../../core/components/contact-form/contact-form';

@Component({
  selector: 'app-contact',
  imports: [ContactForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export default class Contact {}
