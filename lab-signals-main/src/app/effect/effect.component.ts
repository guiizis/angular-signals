import { Component, effect, signal } from '@angular/core';

interface Element {
  name: string;
  symbol: string;
  massNumber: number;
  fusionPoint: number;
  boilingPoint: number;
}

@Component({
  selector: 'app-effect',
  templateUrl: './effect.component.html',
  styleUrl: './effect.component.css'
})
export class EffectComponent {
  selectedElement = signal<Element | null>(null);
  temperature = signal<number>(25);
  physicalState = signal<string>('Solid');

  elements: Element[] = [
    { name: 'Hydrogen', symbol: 'H', massNumber: 1, fusionPoint: -259.16, boilingPoint: -252.87 },
    { name: 'Helium', symbol: 'He', massNumber: 4, fusionPoint: -272.20, boilingPoint: -268.93 },
    { name: 'Lithium', symbol: 'Li', massNumber: 7, fusionPoint: 180.54, boilingPoint: 1342 },
    { name: 'Beryllium', symbol: 'Be', massNumber: 9, fusionPoint: 1287, boilingPoint: 2469 },
    { name: 'Boron', symbol: 'B', massNumber: 11, fusionPoint: 2076, boilingPoint: 3927 },
    { name: 'Carbon', symbol: 'C', massNumber: 12, fusionPoint: 3550, boilingPoint: 4827 },
  ];

  constructor() {
    effect(() => {
      const element = this.selectedElement();
      const temp = this.temperature();

      if (element) {
        let physicalState: string;

        if (temp <= element.fusionPoint) {
          physicalState = 'Sólido';
        } else if (temp > element.fusionPoint && temp < element.boilingPoint) {
          physicalState = 'Líquido';
        } else {
          physicalState = 'Gasoso';
        }
        this.physicalState.set(physicalState);
      }
    }, {allowSignalWrites: true});
  }
}
