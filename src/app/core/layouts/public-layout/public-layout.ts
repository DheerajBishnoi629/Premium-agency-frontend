import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { WhatsAppCta } from '../../components/whatsapp-cta/whatsapp-cta';
import { WhatsAppService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, Header, Footer, WhatsAppCta],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
})
export class PublicLayout implements OnInit {
  private readonly whatsapp = inject(WhatsAppService);

  ngOnInit(): void {
    this.whatsapp.show();
  }
}
