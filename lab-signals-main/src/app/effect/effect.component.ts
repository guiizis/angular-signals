import { Component, inject } from '@angular/core';
import { ElementService } from '../element.service';

@Component({
  selector: 'app-effect',
  templateUrl: './effect.component.html',
  styleUrl: './effect.component.css'
})
export class EffectComponent {
  service: ElementService = inject(ElementService);
}
