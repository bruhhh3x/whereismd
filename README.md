# Access Initiation (React)

A mobile-first, timed access initiation experience.

## Features

- 8-second instinct window per question
- Randomized question pool (up to 21 questions per run)
- Touch-friendly, mobile-first UI
- Designed for cultural and experiential gating

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed localhost URL (usually http://localhost:5173)
and you should see the orange ACCESS INITIATION screen.

## Deploying (e.g. GitHub Pages)

1. If deploying under a project path like `https://user.github.io/access-initiation/`,
   edit `vite.config.js` and set:

   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/access-initiation/',
   })
   ```

2. Build:

   ```bash
   npm run build
   ```

3. Serve the `dist/` folder via GitHub Pages or another static host.
