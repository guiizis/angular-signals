import { Component, signal } from '@angular/core';

interface Element {
  name: string;
  symbol: string;
  massNumber: number;
}

@Component({
  selector: 'app-signals-intro',
  templateUrl: './signals-intro.component.html',
  styleUrls: ['./signals-intro.component.css']
})
export class SignalsIntroComponent {
  selectedElement = signal<Element | null>(null);

  elements: Element[] = [
    { name: 'Hydrogen', symbol: 'H', massNumber: 1 },
    { name: 'Helium', symbol: 'He', massNumber: 4 },
    { name: 'Lithium', symbol: 'Li', massNumber: 7 },
    { name: 'Beryllium', symbol: 'Be', massNumber: 9 },
    { name: 'Boron', symbol: 'B', massNumber: 11 },
    { name: 'Carbon', symbol: 'C', massNumber: 12 },
    { name: 'Nitrogen', symbol: 'N', massNumber: 14 },
    { name: 'Oxygen', symbol: 'O', massNumber: 16 },
    { name: 'Fluorine', symbol: 'F', massNumber: 19 },
    { name: 'Neon', symbol: 'Ne', massNumber: 20 }
  ];

  selectElement(element: Element): void {
    this.selectedElement.set(element);
  }
}
