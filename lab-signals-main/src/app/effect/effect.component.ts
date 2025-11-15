import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ElementService } from '../element.service';

@Component({
  selector: 'app-effect',
  templateUrl: './effect.component.html',
  styleUrl: './effect.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EffectComponent {
  service: ElementService = inject(ElementService);
}
