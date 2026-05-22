# Math Adventure — Space Quest

A colorful math learning game for ages 7+, built with React and Vite. Students progress through 7 levels of addition, word problems, multiplication, and division.

## Run the game

```bash
cd math-adventure
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Host on GitHub Pages

### 1. Create a GitHub repository

Create a new repo on GitHub (for example `math-adventure`). The site will be published at:

`https://<your-username>.github.io/math-adventure/`

### 2. Push this project

From the `math-adventure` folder:

```bash
git init
git add .
git commit -m "Add Math Adventure game"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Use your real GitHub username and repo name in the remote URL.

### 3. Enable GitHub Pages

1. Open the repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. After you push to `main`, the **Deploy to GitHub Pages** workflow runs automatically
4. When it finishes, your game is live at `https://<your-username>.github.io/<repo-name>/`

### Manual local test (same paths as GitHub Pages)

PowerShell:

```powershell
$env:BASE_PATH="/math-adventure/"
npm run build
npm run preview
```

Replace `math-adventure` with your repo name if it is different.

### Troubleshooting

- **Blank page?** The repo name in the URL must match `BASE_PATH`. The workflow sets this automatically from the repository name.
- **Workflow failed?** Check the **Actions** tab on GitHub for build logs.
- **First deploy?** Pages can take 1–2 minutes to appear after the workflow succeeds.

## Game features

- 7 progressive levels with increasing difficulty
- Random question generation per level
- Stars, coins, and badges for motivation
- Hints on incorrect answers
- Progress bar and full stats tracking
- Completion screen with final summary
- Responsive layout for desktop and tablet
