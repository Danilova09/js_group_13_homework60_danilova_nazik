import { EventEmitter } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

export class RouletteService {
  numbersArrayChange = new EventEmitter<number[]>();
  newNumber = new EventEmitter<number>();
  private numbers: number[] = [];
  private isInterval = false;
  private startInterval!: Observable<number>;
  private intervalSubscription!: Subscription;

  start() {
    this.startInterval = interval(1000);
    if (!this.isInterval) {
      this.intervalSubscription = this.startInterval.subscribe((id: number) => {
        this.isInterval = true;
        let randomNumber = this.generateNumber();
        this.newNumber.emit(randomNumber);
        this.numbers.push(randomNumber);
        this.onNumbersArrayChange();
      });
    }
  }

  stop() {
    this.intervalSubscription.unsubscribe();
    this.isInterval = false;
  }

  reset() {
    this.numbers = [];
    this.onNumbersArrayChange();
    this.stop();
  }

  getNumbersArray() {
    return this.numbers.slice();
  }

  onNumbersArrayChange() {
    this.numbersArrayChange.emit(this.numbers);
  }

  generateNumber(min = 0, max = 36) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
