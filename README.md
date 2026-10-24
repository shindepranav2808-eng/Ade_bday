# Happy Birthday, ADE 🎂 — a website by Pranav Shinde

A 10-page interactive birthday surprise (React + Vite + Tailwind + Framer Motion).

## Run it
Requires Node.js 18+.
```bash
npm install
npm run dev        # opens http://localhost:5173
```
Build a shareable static version: `npm run build` (output in `dist/`, host it anywhere, or `npm run preview`).

## Add / change photos
Photos live in `public/images/aditi/` (6 are already included from BDAY.zip).
- **From a ZIP (nested folders OK):** `npm run photos -- path/to/photos.zip` — extracts only JPG/JPEG/PNG/WebP, ignores hidden and non-image files, keeps originals.
- **Or manually:** copy images into `public/images/aditi/`, then run `npm run dev` again (the gallery list is rebuilt automatically).
Everything stays on your computer — nothing is uploaded anywhere.

## Edit the text
Every message, roast, caption, reason and the letter is in **`src/content.js`**.
Add roasts to `roast.extraJokes`; give a specific photo its own caption in `gallery.customCaptions` (`{ 'file.jpg': 'My caption' }`).

## Music & sounds
Music is off until you tap the 🎵 button (no surprise loud sound). By default a soft music-box "Happy Birthday" is generated in the browser.
To use your own song, put it at `public/audio/music.mp3`. The 🔔 button mutes sound effects (cake, gift, confetti).

## Accessibility
Keyboard navigation, visible focus rings, reduced-motion support, and ARIA labels on controls. In the photo viewer: ← → keys and Esc.

## Push to GitHub
```bash
git init
git add .
git commit -m "Birthday website for ADE"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ade-birthday.git
git push -u origin main
```
Use a **Private** repository — it contains personal photos. (`node_modules` and `dist` are already ignored by `.gitignore`.)

## Deploy on Vercel
1. Push the project to GitHub (above).
2. Go to vercel.com → **Add New… → Project** → import the `ade-birthday` repo.
3. Vercel detects Vite automatically (`vercel.json` is included): build command `npm run build`, output folder `dist`.
4. Click **Deploy**. You get a link like `https://ade-birthday.vercel.app` to share with Aditi.
Every `git push` after that redeploys automatically.
