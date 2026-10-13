# Le Bistro — მენიუ, რომელსაც Google ხედავს

სასტარტო პროექტი **ლექცია 64-ისთვის: SSR & Hydration (@angular/ssr)** (AI-Native Front-End Development).
ვიზუალი — ორიგინალი პროექტიდან ([srms.stepacademy.ge/menu](https://srms.stepacademy.ge/menu)), მონაცემები — SRMS API.

`main` ბრენჩზე აპი მუშაობს მხოლოდ ბრაუზერში (CSR): სერვერი ცარიელ `<app-root>`-ს აგზავნის. ლექციაზე მას SSR-ს ვამატებთ.

## გაშვება

> ⚠️ საჭიროა **Node.js 22.22.3+** ან **24.15+** (Angular 22-ის მოთხოვნა). შეამოწმე: `node -v`

```bash
git clone <რეპოზიტორიის ბმული>
cd le-bistro-ssr
npm install
npm start          # http://localhost:4200
```

## როგორ ვნახოთ, რას ხედავს რობოტი
- **View Source:** `Ctrl+U` — სერვერის გამოგზავნილი HTML (არა ის, რაც DevTools-ის Elements-ში ჩანს).
- **JavaScript-ის გამორთვა:** DevTools → `Ctrl+Shift+P` → „Disable JavaScript“ → გვერდის განახლება.

## SSR-ის შემდეგ (ბრენჩი `step-1-ssr` და შემდეგ)
```bash
npm start                         # dev სერვერი SSR-ით (ng serve)
npm run build                     # build + prerender (საჭიროა ინტერნეტი — API)
npm run serve:ssr:le-bistro-ssr   # production Node სერვერი: http://localhost:4000
```
- `angular.json` → `security.allowedHosts: ["localhost"]` — Angular 22-ის SSR სერვერი სხვა `Host`-ს არ ემსახურება. რეალურ დომენზე იქ დომენი ჩაწერე.
- `src/server.ts`-ში არის `/api` და `/images` proxy (CORS მხოლოდ ბრაუზერის წესია — სერვერი API-ს პირდაპირ იძახებს).

## ბრენჩები (თუ ჩამორჩი)
| ბრენჩი | რა არის დამატებული |
|---|---|
| `main` | არაფერი — მხოლოდ ბრაუზერი (CSR) |
| `step-1-ssr` | `ng add @angular/ssr`, რენდერის რეჟიმები, `getPrerenderParams`, proxy სერვერზე, `localStorage` / `window` ხაფანგები |
| `step-2-hydration` | + Incremental Hydration: `@defer (hydrate on viewport)` |
| `step-3-seo` | + `Title`, `Meta`, Open Graph — **საბოლოო ვერსია** |

```bash
git switch step-1-ssr && npm install   # ახალი პაკეტები (@angular/ssr, express)
```

## სტრუქტურა
```
src/app/
  menu/        ← მენიუ (ბარათები, ფოტოები — ლექცია 63-დან)
  dish/        ← კერძის გვერდი /menu/:id
  cart/        ← კალათა: CartStore (localStorage) + /cart გვერდი
  layout/      ← ქუდი (სქროლის ჩრდილი — window!) და ძირი
  core/        ← API_ORIGIN
proxy.conf.json  ← /api და /images → https://srmsapi.stepacademy.ge
AGENTS.md        ← წესები AI-ასისტენტისთვის
```
