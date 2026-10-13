import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from '../cart/cart-store';
import { Dish } from './dish.model';
import { DishImage } from './dish-image';

@Component({
  selector: 'app-dish-card',
  imports: [DishImage, RouterLink],
  styleUrl: './dish-card.css',
  template: `
    <article class="card carte" [class.unavailable]="!dish().isAvailable">
      <a class="photo" [routerLink]="['/menu', dish().id]" tabindex="-1" aria-hidden="true">
        <app-dish-image [src]="dish().slowImageUrl" [alt]="dish().name" [priority]="priority()" />
        @if (!dish().isAvailable) {
          <span class="chip off">Sold out</span>
        }
      </a>
      <div class="body">
        <a class="entry-link" [routerLink]="['/menu', dish().id]">
          <div class="leader entry">
            <h3 class="leader-name">{{ dish().name }}</h3>
            <span class="leader-dots"></span>
            <span class="leader-price price">₾{{ dish().price }}</span>
          </div>
        </a>
        <p class="desc">{{ dish().description }}</p>
        <button type="button" class="btn btn--ghost btn--small add" [disabled]="!dish().isAvailable" (click)="cart.add(dish())">
          @if (cart.qtyOf(dish().id) > 0) { In cart · {{ cart.qtyOf(dish().id) }} } @else { Add to cart }
        </button>
      </div>
    </article>
  `,
})
export class DishCard {
  dish = input.required<Dish>();
  priority = input(false);
  protected cart = inject(CartStore);
}
