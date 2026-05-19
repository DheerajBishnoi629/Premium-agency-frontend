import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WhatsAppService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blank-layout.html',
  styleUrl: './blank-layout.scss',
})
export class BlankLayout implements OnInit, OnDestroy {
  private readonly whatsapp = inject(WhatsAppService);

  ngOnInit(): void {
    this.whatsapp.hide();
  }

  ngOnDestroy(): void {
    this.whatsapp.show();
  }
}
