import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteFooter } from './layout/site-footer';
import { SiteHeader } from './layout/site-header';

@Component({
  selector: 'app-root',
  imports: [SiteHeader, SiteFooter, RouterOutlet],
  template: `
    <app-site-header />
    <main><router-outlet /></main>
    <app-site-footer />
  `,
  styles: `
    :host { display: flex; flex-direction: column; min-height: 100dvh; }
    main { flex: 1; }
  `,
})
export class App {}
