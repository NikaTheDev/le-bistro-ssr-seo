# Le Bistro — მენიუ, რომელსაც Google ხედავს

სასტარტო პროექტი **ლექცია 64-ისთვის: SSR & Hydration (@angular/ssr)** (AI-Native Front-End Development) — **ვერსია SEO ნაწილიდან გასაგრძელებლად**.
ვიზუალი — ორიგინალი პროექტიდან ([srms.stepacademy.ge/menu](https://srms.stepacademy.ge/menu)), მონაცემები — SRMS API.

ამ ვერსიაში ლექციის 1–3 ნაწილი **უკვე გაკეთებულია** — `main` ბრენჩზე:
- `ng add @angular/ssr`, რენდერის რეჟიმები (`app.routes.server.ts`), `getPrerenderParams`;
- `/api` proxy `src/server.ts`-ში, `allowedHosts: ["localhost"]`;
- `localStorage` / `window` ხაფანგები გასწორებულია (`isPlatformBrowser`, `afterNextRender`);
- Incremental Hydration: `@defer (hydrate on viewport)`.

ლექციაზე აქედან ვაგრძელებთ **მე-4 ნაწილით: SEO — `Title`, `Meta`, Open Graph**. მზა პასუხი — ბრენჩი `step-3-seo`.

## გაშვება

> ⚠️ საჭიროა **Node.js 22.22.3+** ან **24.15+** (Angular 22-ის მოთხოვნა). შეამოწმე: `node -v`
>
> 📌 Angular-ის ვერსიები `package.json`-ში **ზუსტადაა დაფიქსირებული** (`22.2.3`, CLI `22.2.4`, `^`-ის გარეშე). ასე `ng add @angular/ssr` ზუსტად შესაბამის ვერსიას დააყენებს. ლექციამდე ნუ გაუშვებთ `npm update`-ს.

```bash
git clone <რეპოზიტორიის ბმული>
cd le-bistro-ssr-seo
npm install
npm start          # http://localhost:4200
```

## როგორ ვნახოთ, რას ხედავს რობოტი
- **View Source:** `Ctrl+U` — სერვერის გამოგზავნილი HTML (არა ის, რაც DevTools-ის Elements-ში ჩანს).
- **JavaScript-ის გამორთვა:** DevTools → `Ctrl+Shift+P` → „Disable JavaScript“ → გვერდის განახლება.

## build და production სერვერი
```bash
npm start                         # dev სერვერი SSR-ით (ng serve), http://localhost:4200
npm run build                     # build + prerender (საჭიროა ინტერნეტი — API)
npm run serve:ssr:le-bistro-ssr   # production Node სერვერი: http://localhost:4000
```

## ხაფანგები, რომლებსაც ლექციაზე ვხვდებით
| სიმპტომი | მიზეზი | გამოსავალი |
|---|---|---|
| `ReferenceError: localStorage is not defined` (500) | სერვერზე `localStorage` არ არსებობს | სერვისში `isPlatformBrowser(inject(PLATFORM_ID))` |
| `ReferenceError: window is not defined` (500) | სერვერზე `window` არ არსებობს | კომპონენტში `afterNextRender(() => …)` |
| build: `'menu/:id' … 'getPrerenderParams' is missing` | Prerender-მა უნდა იცოდეს, რომელი `:id`-ები ააწყოს | `app.routes.server.ts` → `getPrerenderParams` |
| build: `Unable to handle request` / `TimeoutError` | `proxy.conf.json` მუშაობს მხოლოდ `ng serve`-ში | `src/server.ts`-ში `/api` proxy (CORS მხოლოდ ბრაუზერის წესია) |
| `Header "host" with value "localhost:4000" is not allowed.` (400) | Angular 22-ის დაცვა (SSRF): `allowedHosts` ცარიელია | `angular.json` → `"allowedHosts": ["localhost"]`; გახსენი **localhost**, არა 127.0.0.1 |
| `NG0500: During hydration Angular expected <tr> but found <tbody>` | სერვერის და ბრაუზერის DOM განსხვავდება | ვალიდური HTML (`<table>`-ში `<tbody>`) |
| `ng add`: `npm error ERESOLVE` … `Conflicting peer dependency: @angular/core` | `package.json`-ში `^22.2.0`: npm Angular-ის ახალ patch-ვერსიას იღებს, დაყენებული კი ძველია | ზუსტი ვერსიები (როგორც ამ პროექტში). სხვა პროექტში: ჯერ `ng update @angular/core @angular/cli` |
| build: `Inlining of fonts failed … fonts.googleapis.com` | build Google Fonts-ს ვერ უკავშირდება (ინტერნეტი/firewall) | ინტერნეტის შემოწმება; დროებით — `angular.json` → production → `"optimization": { "fonts": false }` |
| build: `Http failure response … 502 Bad Gateway` | build-ისას API (srmsapi) მიუწვდომელია | ინტერნეტი და API-ს შემოწმება, შემდეგ ხელახლა `npm run build` |

- **HMR გამორთულია** (`angular.json` → `serve.options.hmr: false`): HMR-ით `@defer` ბლოკები ერთბაშად იტვირთება (NG0751) და Incremental Hydration-ს ვერ დავინახავდით.
- `npm run build` ბრაუზერის proxy-ს არ იყენებს: მენიუ და კერძის 28 გვერდი API-დან build-ის დროს მოდის `src/server.ts`-ის proxy-ით.

## ბრენჩები (თუ ჩამორჩი)
| ბრენჩი | რა არის |
|---|---|
| `main` | SSR + Hydration მზადაა — **აქედან ვიწყებთ SEO-ს** |
| `step-3-seo` | + `Title`, `Meta`, Open Graph — **საბოლოო ვერსია** |

```bash
git switch step-3-seo   # მზა პასუხი
```

## სტრუქტურა
```
src/app/
  menu/        ← მენიუ (ბარათები, ფოტოები — ლექცია 63-დან)
  dish/        ← კერძის გვერდი /menu/:id
  cart/        ← კალათა: CartStore (localStorage) + /cart გვერდი
  layout/      ← ჰედერი (ჩრდილი სქროლისას — window!) და ფუტერი
  core/        ← API_ORIGIN
proxy.conf.json  ← /api და /images → https://srmsapi.stepacademy.ge (dev სერვერი)
AGENTS.md        ← წესები AI-ასისტენტისთვის
```
