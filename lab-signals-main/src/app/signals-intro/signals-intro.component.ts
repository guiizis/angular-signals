import { Component, inject } from '@angular/core';
import { ElementService } from '../element.service';

@Component({
  selector: 'app-signals-intro',
  templateUrl: './signals-intro.component.html',
  styleUrls: ['./signals-intro.component.css']
})
export class SignalsIntroComponent {
  service: ElementService = inject(ElementService);
}
