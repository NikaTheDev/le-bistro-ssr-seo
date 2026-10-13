import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from './cart-store';

/** კალათა — პირადი გვერდი: მონაცემი მხოლოდ ბრაუზერშია (localStorage) */
@Component({
  selector: 'app-cart-page',
  imports: [RouterLink],
  styleUrl: './cart-page.css',
  template: `
    <section class="cart-page container">
      <div class="section-head"><span class="eyebrow">Your order</span><h1>The cart</h1></div>
      @if (cart.lines().length === 0) {
        <p class="empty-note">Your cart is empty. <a routerLink="/menu">Back to the menu</a></p>
      } @else {
        <div class="carte list">
          @for (line of cart.lines(); track line.dishId) {
            <div class="line">
              <a class="name" [routerLink]="['/menu', line.dishId]">{{ line.name }}</a>
              <div class="qty">
                <button type="button" (click)="cart.change(line.dishId, -1)" aria-label="Less">−</button>
                <span class="tnum">{{ line.qty }}</span>
                <button type="button" (click)="cart.change(line.dishId, 1)" aria-label="More">+</button>
              </div>
              <span class="sum tnum">₾{{ (line.qty * line.price).toFixed(2) }}</span>
            </div>
          }
          <div class="total"><span>Total</span><span class="tnum">₾{{ cart.total().toFixed(2) }}</span></div>
        </div>
        <button type="button" class="btn btn--quiet clear" (click)="cart.clear()">Clear the cart</button>
      }
    </section>
  `,
})
export class CartPage {
  protected cart = inject(CartStore);
}
