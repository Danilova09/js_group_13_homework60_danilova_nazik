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

  constructor(private rouletteService: RouletteService) {
    this.numbers = rouletteService.getNumbersArray();
    rouletteService.numbersArrayChange.subscribe((numbers: number[]) => {
      this.numbers = numbers;
    });
  }

  ngOnInit() {

  }

}
