import { EventEmitter } from '@angular/core';

export class RouletteService {
  private numbers: number[] = [];
  numbersArrayChange = new EventEmitter<number[]>();




  getNumbersArray() {
    return this.numbers.slice();
  }

  onNumbersArrayChange() {
    this.numbersArrayChange.emit(this.numbers);
  }

  getColor(number: number) {
    let color = '';
    if (number === 0) {
      color = 'zero';
    } else if (number > 0 && number <= 10 || number >= 19 && number <= 28) {
      if (number % 2 === 0) {
        color = 'black';
      } else {
        color = 'red';
      }
    } else if (number >= 11 && number <= 18 || number >= 29 && number <= 36) {
      if (number % 2 === 0) {
        color = 'red';
      } else {
        color = 'black';
      }
    } else {
      color = 'unknown';
    }
    return color;
  }
}
