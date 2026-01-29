# Access Initiation (React + Vite)

A mobile-first, timed access initiation experience.

## Features

- 8-second instinct window per question
- Randomized question pool (up to 21 questions per run)
- Touch-friendly, mobile-first UI
- Designed for cultural and experiential gating

---

## Local Development

```bash
npm install
npm run dev
```

Open the printed localhost URL (usually http://localhost:5173) and you should see
the orange ACCESS INITIATION screen.

---

## GitHub Pages Deployment (via Actions)

This project is preconfigured with:

- `vite.config.js` using `base: '/access-initiation/'`
- a GitHub Actions workflow at `.github/workflows/deploy.yml`

### 1. Match the repo name

If your GitHub repo is **not** named `access-initiation`, edit `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  base: '/YOUR-REPO-NAME/', // change this
})
```

Commit that change.

### 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial access initiation app"
git branch -M main
git remote add origin https://github.com/YOUR-USER/YOUR-REPO-NAME.git
git push -u origin main
```

### 3. Enable GitHub Pages

In your repo on GitHub:

- Go to **Settings → Pages**
- Under "Build and deployment", choose **GitHub Actions**
- GitHub will automatically use `.github/workflows/deploy.yml`

The workflow will:

- install deps
- run `npm run build`
- deploy the `dist/` folder to GitHub Pages

Your live URL will be:

```
https://YOUR-USER.github.io/YOUR-REPO-NAME/
```
