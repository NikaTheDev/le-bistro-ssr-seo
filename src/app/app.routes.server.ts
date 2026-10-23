import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { firstValueFrom } from 'rxjs';
import { MenuApi } from './menu/menu-api';

/** რომელი გვერდი როგორ იხატება */
export const serverRoutes: ServerRoute[] = [
  // მენიუ იშვიათად იცვლება და Google-მა უნდა ნახოს → build-ის დროს, წინასწარ
  { path: 'menu', renderMode: RenderMode.Prerender },
  {
    path: 'menu/:id',
    renderMode: RenderMode.Prerender,
    // რომელი :id-ებისთვის ავაწყოთ გვერდი? — ყველა კერძისთვის
    async getPrerenderParams() {
      const dishes = await firstValueFrom(inject(MenuApi).getDishes());
      return dishes.map((d) => ({ id: String(d.id) }));
    },
  },
  // კალათა პირადია (localStorage) და Google-ს არ სჭირდება → მხოლოდ ბრაუზერში
  { path: 'cart', renderMode: RenderMode.Client },
  // დანარჩენი — სერვერზე, ყოველ მოთხოვნაზე
  { path: '**', renderMode: RenderMode.Server },
];
