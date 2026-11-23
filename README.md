# O/M/M — Hybrid Editorial v0.3

Site personal bilingv (EN/RO) în Astro. Conținutul stă în fișiere pe care le deții; site-ul publicat e 100% static (fără server, fără bază de date, fără login public).

## Cum scrii un articol (zilnic)

1. În folderul proiectului: `npm run dev` (pe Windows PowerShell, dacă `npm` e blocat: `npm.cmd run dev`).
2. Deschide **http://127.0.0.1:4321/keystatic** — editorul (titlu, descriere, dată, categorie, text).
3. Alege **Articles (English)** sau **Articole (Română)** → *Create*. Lasă **Draft** bifat cât scrii; debifează-l când e gata.
4. Pentru legătura între limbi, pune aceeași **Translation key** în ambele versiuni. Dacă lipsește, se folosește numele fișierului.
5. Publici: commit + push în GitHub (vezi mai jos). Hostingul reconstruiește singur site-ul în ~1 minut.

Fără editor: poți crea direct un fișier `.mdoc` (sau `.md`) în `src/content/posts/en/` sau `ro/`. Numele fișierului = adresa articolului (`/en/writing/<nume>/`). Limba = folderul. Timpul de citire se calculează automat.

## Prima publicare (o singură dată)

```powershell
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/UTILIZATOR/NUME-REPO.git
git push -u origin main
```
(creează întâi un repository gol pe github.com; poate fi privat)

Hosting recomandat: **Cloudflare Pages** (gratuit) conectat la repo-ul GitHub:
- Framework preset: *Astro* (sau build command `npm run build`, output `dist`)
- Variabile de mediu: `NODE_VERSION=22` și `SITE_URL=https://domeniul-tau.ro`
- La fiecare `git push` pe `main`, site-ul se actualizează automat.
(Alternative echivalente: Netlify, Vercel, GitHub Pages.)

## Ce mai trebuie schimbat înainte de lansare
- `SITE_URL` (sau `site:` în `astro.config.mjs`) și linia `Sitemap:` din `public/robots.txt` — acum e `example.com`.
- Textele „About", Experience, Projects, Contact sunt exemple (vezi `src/lib/i18n.ts` și `src/pages/[lang]/[section].astro`).
- Cele două articole din `src/content/posts/` sunt demonstrative: șterge-le sau înlocuiește-le.

## Ce include
- Pagini: Home, About, Writing, Experience, Projects, Contact în EN și RO; comutator de limbă care duce la traducerea articolului (dacă există); dark mode.
- Keystatic (editor local), RSS per limbă (`/en/rss.xml`, `/ro/rss.xml`), sitemap, canonical + hreflang + Open Graph.
- Ciornele (`draft`) nu apar în site, nici în RSS, nici în sitemap.

## Note tehnice
- Editorul Keystatic funcționează doar la `npm run dev`; nu face parte din site-ul publicat. Editare online (din telefon / fără calculator) se poate adăuga ulterior prin modul GitHub al Keystatic, dar cere un server (adaptor) și o aplicație GitHub — deliberat lăsat pentru mai târziu.
- Articolele folosesc Markdoc (`.mdoc`) — sintaxă Markdown obișnuită pentru titluri, liste, linkuri, citate, imagini.
- Imaginile din articole: pune-le în `public/images/` și referă-le ca `/images/nume.jpg`.
