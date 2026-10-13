import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Dish } from '../menu/dish.model';

/** „მეტი ამავე კატეგორიიდან“ — გვერდის ქვედა ნაწილი, რომელსაც სტუმარი სქროლით აღწევს */
@Component({
  selector: 'app-similar-dishes',
  imports: [RouterLink],
  styleUrl: './similar-dishes.css',
  template: `
    <h2>More {{ category() }}</h2>
    <div class="sim">
      @for (d of dishes(); track d.id) {
        <a class="carte item" [routerLink]="['/menu', d.id]">
          <span class="name">{{ d.name }}</span>
          <span class="price">₾{{ d.price }}</span>
        </a>
      }
    </div>
  `,
})
export class SimilarDishes {
  category = input.required<string>();
  /** მონაცემი მშობლიდან (input) — ამიტომ hydration-ისას ახალი HTTP მოთხოვნა არ იგზავნება */
  dishes = input.required<Dish[]>();
}
