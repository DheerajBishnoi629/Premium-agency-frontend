import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WhatsAppService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-whatsapp-cta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './whatsapp-cta.html',
  styleUrl: './whatsapp-cta.scss',
})
export class WhatsAppCta {
  private readonly whatsapp = inject(WhatsAppService);

  protected readonly href = this.whatsapp.href;
  protected readonly visible = this.whatsapp.visible;
}
