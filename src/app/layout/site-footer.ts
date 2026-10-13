import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** საიტის ძირი — ორიგინალი პროექტის ვიზუალი. */
@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  styleUrl: './site-footer.css',
  template: `
    <footer id="contact" class="site-footer">
      <div class="container cols">
        <div class="col brand-col">
          <a class="brand" routerLink="/menu"><span class="brand-name">Le&nbsp;Bistro</span><span class="brand-sub">by IT Step</span></a>
          <p class="tagline">A French neighborhood bistro in Vera, Tbilisi.</p>
        </div>
        <nav class="col" aria-label="Pages">
          <h3 class="col-title">Pages</h3>
          <a class="page-link" routerLink="/menu">Menu</a>
          <a class="page-link" href="/" (click)="$event.preventDefault()">About</a>
          <a class="page-link" href="/" (click)="$event.preventDefault()">FAQ</a>
          <a class="page-link" href="/" (click)="$event.preventDefault()">Contact</a>
        </nav>
        <div class="col">
          <h3 class="col-title">Visit</h3>
          <p>12 Kiacheli Street, Vera, Tbilisi 0108</p>
          <p class="muted">Reservations</p>
          <p><a href="tel:+995322123456" class="tel tnum">+995 32 212 34 56</a></p>
        </div>
        <div class="col">
          <h3 class="col-title">Hours</h3>
          <p>Open daily 12:00 – 23:00</p>
          <p class="muted">Kitchen until 22:30</p>
        </div>
      </div>
      <div class="rights"><div class="container"><span>© 2026 Le Bistro by IT Step</span></div></div>
    </footer>
  `,
})
export class SiteFooter {}
