import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DishCard } from './dish-card';
import { MenuApi } from './menu-api';

@Component({
  selector: 'app-menu-page',
  imports: [DishCard],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.css',
})
export class MenuPage {
  private api = inject(MenuApi);

  /** მენიუ სერვერიდან (ლექცია 59: rxResource) */
  protected dishes = rxResource({ stream: () => this.api.getDishes(), defaultValue: [] });
  protected categories = rxResource({ stream: () => this.api.getCategories(), defaultValue: [] });

  protected category = signal(''); // '' = ყველა

  protected visible = computed(() => {
    const cat = this.category();
    return this.dishes.value().filter((d) => cat === '' || d.categorySlug === cat);
  });

  protected heading = computed(() => this.categories.value().find((c) => c.slug === this.category())?.nameEn ?? 'Everything');
  /** პირველი 3 კერძი → priority (ლექცია 63) */
  protected priorityIds = computed(() => this.dishes.value().slice(0, 3).map((d) => d.id));
  protected ghosts = [1, 2, 3, 4, 5, 6];
}
