import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { RouletteService } from '../shared/roulette.service';

@Directive({
  selector: '[appColor]',
})

export class ColorDirective {
  color = 'zero';

  @Input() set appColor(number: number) {
    if (number) {
      this.color = this.rouletteService.getColor(number);
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2, private rouletteService: RouletteService) { }

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, this.color);
  }
}
