import { Routes } from '@angular/router';
import { CartPage } from './cart/cart-page';
import { DishPage } from './dish/dish-page';
import { MenuPage } from './menu/menu-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'menu' },
  { path: 'menu', component: MenuPage, title: 'Menu — Le Bistro' },
  { path: 'menu/:id', component: DishPage, title: 'Le Bistro' },
  { path: 'cart', component: CartPage, title: 'Your cart — Le Bistro' },
  { path: '**', redirectTo: 'menu' },
];
