import { Component, OnInit } from '@angular/core';
import { RouletteService } from './shared/roulette.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  rate = '1';
  balance = 100;
  selectedCategory = 'red';
  numbers: number[] = [];
  number!: number;
  hiddenColor!: string;


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
      if (this.hiddenColor === 'zero' && this.selectedCategory === 'zero') {
        this.balance += 35;
      } else if (this.hiddenColor === this.selectedCategory) {
        this.balance += parseInt(this.rate);
      } else if (this.hiddenColor !== this.selectedCategory) {
        if (this.balance === 0 || this.balance < 0) {
          this.balance = 0;
          this.stop();
        } else {
          this.balance -= parseInt(this.rate);
        }
      }
    });
  }

  start() {
    this.rouletteService.start();
  }

  stop() {
    this.rouletteService.stop();
  }

  reset() {
    this.rouletteService.reset();
    this.balance = 100;
    this.rate = '1';
  }
}
