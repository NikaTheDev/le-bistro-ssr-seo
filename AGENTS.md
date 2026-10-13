# AGENTS.md — Le Bistro · SSR & Hydration (ლექცია 64)

> ეს ფაილი AI-ასისტენტისთვისაა (Copilot, Codex, Claude...). VS Code-ის Copilot მას ავტომატურად კითხულობს.

## პროექტი
- Angular 22: standalone, signals, zoneless, OnPush ნაგულისხმევად. როუტინგი: `/menu`, `/menu/:id`, `/cart`.
- მონაცემები: SRMS API, **შედარებითი მისამართებით** (`/api/...`). ბრაუზერში — `proxy.conf.json`, SSR სერვერზე — `src/server.ts`-ის proxy.
- შაბლონში მხოლოდ ახალი control flow: `@if`, `@for`, `@defer`.

## SSR-ის წესები (ნასწავლის ფარგლებში)
1. `window`, `document`, `localStorage` სერვერზე **არ არსებობს**:
   - კომპონენტში → `afterNextRender(() => { ... })`.
   - სერვისში → `isPlatformBrowser(inject(PLATFORM_ID))`.
   - არ გამოიყენო `typeof window !== 'undefined'`.
2. რენდერის რეჟიმები — `src/app/app.routes.server.ts` (`RenderMode.Prerender` / `Server` / `Client`). პარამეტრიან Prerender მარშრუტს სჭირდება `getPrerenderParams`.
3. Hydration: HTML უნდა იყოს ვალიდური (მაგ. `<table>`-ში `<tbody>`); DOM-ს პირდაპირ ნუ შეცვლი (`innerHTML`, `appendChild`).
4. გვერდის ქვედა, მძიმე ბლოკები → `@defer (hydrate on viewport)` (HTML სერვერზე მზადდება, JS — მოგვიანებით).
5. `provideClientHydration()` უკვე ჩართულია: HttpTransferCache და Incremental Hydration ნაგულისხმევად მუშაობს. **არ დაამატო** `provideHttpClient(withFetch())` — Angular 22-ში fetch ნაგულისხმევია.
6. SEO: `Title` და `Meta` სერვისები (`@angular/platform-browser`). `og:image` — სრული მისამართით (`API_ORIGIN + ...`).
7. ახალი npm პაკეტი — მხოლოდ კითხვის შემდეგ. ტიპები — `interface`, არა `any`.

## პასუხის ფორმა
- ჯერ მოკლე გეგმა → მერე კოდი → მერე ახსნა **ქართულად**.
- ბოლოს: რა ვარაუდები გააკეთე და როგორ შევამოწმოთ (View Source, Network, Console-ის hydration შეტყობინება).
