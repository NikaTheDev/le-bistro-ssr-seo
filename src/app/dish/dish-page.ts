import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CartStore } from '../cart/cart-store';
import { DishImage } from '../menu/dish-image';
import { MenuApi } from '../menu/menu-api';
import { SimilarDishes } from './similar-dishes';

/** კერძის გვერდი: /menu/:id (ლექცია 40 — Route Parameters) */
@Component({
  selector: 'app-dish-page',
  imports: [DishImage, RouterLink, SimilarDishes],
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

  /** მთელი მენიუ „მეტი ამავე კატეგორიიდან“ ბლოკისთვის (სერვერზე → TransferState → ბრაუზერში ხელახლა არ მოითხოვება) */
  private menu = rxResource({ stream: () => this.api.getDishes(), defaultValue: [] });

  /** 3 კერძი იმავე კატეგორიიდან. @defer ბლოკს მონაცემს მშობელი აწვდის — ბლოკი თავად მოთხოვნას არ აგზავნის */
  protected similar = computed(() => {
    const d = this.dish.value();
    if (!d) return [];
    return this.menu.value().filter((x) => x.categorySlug === d.categorySlug && x.id !== d.id).slice(0, 3);
  });

  protected inCart = computed(() => {
    const d = this.dish.value();
    return d ? this.cart.qtyOf(d.id) : 0;
  });
}
