import { Component, inject } from '@angular/core';
import { ElementService } from '../element.service';

@Component({
  selector: 'app-element-details',
  templateUrl: './element-details.component.html',
  styleUrl: './element-details.component.css'
})
export class ElementDetailsComponent {
   elementService = inject(ElementService);
}
