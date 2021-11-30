import { Component, OnInit } from '@angular/core';
import { RouletteService } from './shared/roulette.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedCategory = 'red';
  rate = '1';
  balance = 100;
  numbers: number[] = [];
  number!: number;
  hiddenColor!: string;
  wrongRate = false;

  constructor(private rouletteService: RouletteService) {
  }

  ngOnInit() {
    this.numbers = this.rouletteService.getNumbersArray();
    this.rouletteService.numbersArrayChange.subscribe((numbers: number[]) => {
      this.numbers = numbers;
    });
    this.rouletteService.newNumber.subscribe((newNumber: number) => {
      this.number = newNumber;
      this.hiddenColor = this.rouletteService.getColor(this.number);
      this.checkValues();
    });
  }

  start() {
    this.rouletteService.start();
    this.wrongRate = false;
  }

  stop() {
    this.rouletteService.stop();
  }

  reset() {
    this.rouletteService.reset();
    this.wrongRate = false;
    this.balance = 100;
    this.rate = '1';
  }

  checkValues() {
    if (isNaN(this.balance)) {
      this.stop();
      this.balance = 100;
      this.wrongRate = true;
    }
    if (this.balance === 0 || this.balance < 0) {
      this.balance = 0;
      this.stop();
    } else if (this.hiddenColor === 'zero' && this.selectedCategory === 'zero') {
      this.balance += 35;
    } else if (this.hiddenColor === this.selectedCategory) {
      this.balance += parseInt(this.rate);
    } else if (this.hiddenColor !== this.selectedCategory) {
      this.balance -= parseInt(this.rate);
    }
  }

}
