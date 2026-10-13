import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartStore } from '../cart/cart-store';

/** საიტის ქუდი — ორიგინალი პროექტის ვიზუალი. სქროლისას ჩრდილი ჩნდება. */
@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  styleUrl: './site-header.css',
  template: `
    <header class="site-header" [class.scrolled]="scrolled()">
      <div class="container bar">
        <a class="brand" routerLink="/menu"><span class="brand-name">Le&nbsp;Bistro</span><span class="brand-sub">by IT Step</span></a>
        <nav aria-label="Main" class="main-nav">
          <a routerLink="/menu" routerLinkActive="active">Menu</a>
          <a href="/" (click)="$event.preventDefault()">About</a>
          <a href="/" (click)="$event.preventDefault()">FAQ</a>
          <a href="/" (click)="$event.preventDefault()">Contact</a>
        </nav>
        <div class="tools">
          <div role="group" aria-label="Language" class="lang">
            <button type="button" lang="en" class="active">EN</button>
            <span aria-hidden="true" class="lang-sep">·</span>
            <button type="button" lang="ka">ქარ</button>
          </div>
          <a class="cart-btn" routerLink="/cart" aria-label="Your order">
            <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M4 7h16l-1.3 12.2a1.6 1.6 0 0 1-1.6 1.3H6.9a1.6 1.6 0 0 1-1.6-1.3L4 7Z"></path>
              <path d="M8.5 9.5V6a3.5 3.5 0 0 1 7 0v3.5"></path>
            </svg>
            @if (cart.count() > 0) {
              <span class="cart-badge">{{ cart.count() }}</span>
            }
          </a>
          <a class="btn btn--ghost btn--small login-link" href="/" (click)="$event.preventDefault()">Log in</a>
        </div>
      </div>
    </header>
  `,
})
export class SiteHeader {
  protected cart = inject(CartStore);

  /** სქროლისას ქუდს ჩრდილი ემატება */
  protected scrolled = signal(window.scrollY > 8);

  constructor() {
    window.addEventListener('scroll', () => this.scrolled.set(window.scrollY > 8), { passive: true });
  }
}
