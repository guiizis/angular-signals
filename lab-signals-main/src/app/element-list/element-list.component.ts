import { Component, inject } from '@angular/core';
import { Element, ElementService } from '../element.service';

@Component({
  selector: 'app-element-list',
  standalone: true,
  imports: [],
  templateUrl: './element-list.component.html',
  styleUrl: './element-list.component.css'
})
export class ElementListComponent {
  private elementService = inject(ElementService);

  selectElement(element: Element): void {
    this.elementService.selectElement(element);
  }

  changeFavorite(element: Element): void {
    if (this.elementService.getFavorites().includes(element)) {
      this.elementService.removeFavorite(element);
    } else {
      this.elementService.addFavorite(element);
    }
  }

}
