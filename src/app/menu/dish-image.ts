import { NgOptimizedImage } from '@angular/common';
import { Component, input, signal } from '@angular/core';

/** კერძის ფოტო: ჩატვირთვისას ნაზად ჩნდება, შეცდომისას — ჩანაცვლება 🍽 */
@Component({
  selector: 'app-dish-image',
  imports: [NgOptimizedImage],
  styleUrl: './dish-image.css',
  template: `
    <div class="frame">
      @if (failed()) {
        <div class="fallback" aria-hidden="true">🍽</div>
      } @else {
        <img
          [ngSrc]="src()"
          [alt]="alt()"
          fill
          [priority]="priority()"
          [class.visible]="loaded()"
          (load)="loaded.set(true)"
          (error)="failed.set(true)"
        />
      }
    </div>
  `,
})
export class DishImage {
  src = input.required<string>();
  alt = input('');
  /** true მხოლოდ პირველი ეკრანის (above the fold) სურათებზე — LCP */
  priority = input(false);

  protected loaded = signal(false);
  protected failed = signal(false);
}
