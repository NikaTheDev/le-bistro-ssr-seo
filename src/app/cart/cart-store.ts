import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { Dish } from '../menu/dish.model';

export interface CartLine {
  dishId: number;
  name: string;
  price: number;
  image: string;
  qty: number;
}

const KEY = 'le-bistro-cart';

/** კალათა — ერთი წყარო მთელ აპში (ლექცია 57), ინახება localStorage-ში (ლექცია 49) */
@Injectable({ providedIn: 'root' })
export class CartStore {
  /** სერვერზე localStorage არ არსებობს — კალათა მხოლოდ ბრაუზერშია */
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly lines = signal<CartLine[]>(this.isBrowser ? JSON.parse(localStorage.getItem(KEY) ?? '[]') : []);

  readonly count = computed(() => this.lines().reduce((sum, l) => sum + l.qty, 0));
  readonly total = computed(() => this.lines().reduce((sum, l) => sum + l.qty * l.price, 0));

  constructor() {
    // ყოველი ცვლილება → localStorage
    effect(() => {
      const lines = this.lines();
      if (this.isBrowser) localStorage.setItem(KEY, JSON.stringify(lines));
    });
  }

  qtyOf(dishId: number): number {
    return this.lines().find((l) => l.dishId === dishId)?.qty ?? 0;
  }

  add(dish: Dish): void {
    this.lines.update((lines) =>
      lines.some((l) => l.dishId === dish.id)
        ? lines.map((l) => (l.dishId === dish.id ? { ...l, qty: l.qty + 1 } : l))
        : [...lines, { dishId: dish.id, name: dish.name, price: dish.price, image: dish.slowImageUrl, qty: 1 }],
    );
  }

  change(dishId: number, delta: number): void {
    this.lines.update((lines) =>
      lines.map((l) => (l.dishId === dishId ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0),
    );
  }

  clear(): void {
    this.lines.set([]);
  }
}
