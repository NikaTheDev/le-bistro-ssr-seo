import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category, Dish } from './dish.model';

/**
 * მისამართები შედარებითია (/api/...): dev-სერვერი მათ proxy.conf.json-ით
 * გადაამისამართებს https://srmsapi.stepacademy.ge-ზე — ასე CORS-ის პრობლემა არ გვაქვს.
 */
@Injectable({ providedIn: 'root' })
export class MenuApi {
  private http = inject(HttpClient);

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>('/api/v1/enterprise/dishes');
  }

  /** API-ს ცალკე GET /dishes/{id} არ აქვს — მთელ მენიუში ვეძებთ */
  getDish(id: number): Observable<Dish | undefined> {
    return this.getDishes().pipe(map((dishes) => dishes.find((d) => d.id === id)));
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/v1/enterprise/categories');
  }
}
