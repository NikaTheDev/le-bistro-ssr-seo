import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CartStore } from '../cart/cart-store';
import { DishImage } from '../menu/dish-image';
import { MenuApi } from '../menu/menu-api';

/** კერძის გვერდი: /menu/:id (ლექცია 40 — Route Parameters) */
@Component({
  selector: 'app-dish-page',
  imports: [DishImage, RouterLink],
  styleUrl: './dish-page.css',
  templateUrl: './dish-page.html',
})
export class DishPage {
  private api = inject(MenuApi);
  protected cart = inject(CartStore);

  /** :id მარშრუტიდან — withComponentInputBinding() */
  id = input.required<string>();

  protected dish = rxResource({
    params: () => Number(this.id()),
    stream: ({ params }) => this.api.getDish(params),
  });

  protected inCart = computed(() => {
    const d = this.dish.value();
    return d ? this.cart.qtyOf(d.id) : 0;
  });
}
