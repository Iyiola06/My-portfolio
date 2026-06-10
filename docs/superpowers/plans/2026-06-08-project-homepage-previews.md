# Project Homepage Previews Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace generic project mockup images with real homepage screenshots from the selected portfolio projects, while keeping the page fast and reliable.

**Architecture:** Use static screenshots for project cards and modal imagery. Add a repeatable local capture script that starts each project on an isolated port, screenshots the homepage with Playwright, saves images into `public/project-shots/`, and writes a manifest used by the portfolio. Avoid iframes in cards; optionally add iframe previews later only inside a lazy modal.

**Tech Stack:** Next.js 15, TypeScript, React, Playwright, Node.js scripts, static assets in `public/`.

---

## File Structure

- Modify: `C:\sulvatech\iy\components\Projects.tsx`
  - Replace remote `picsum.photos` mockups with local `/project-shots/*.png` paths.
  - Keep the existing modal and card layout.
  - Add optional fields for `sourcePath`, `previewMode`, and `livePreviewUrl` only if needed for future iframe previews.
- Create: `C:\sulvatech\iy\scripts\project-preview-config.mjs`
  - Central source of project preview metadata: project id, title, local folder, app type, start command, homepage path, screenshot output.
- Create: `C:\sulvatech\iy\scripts\capture-project-homepages.mjs`
  - Starts one project at a time, waits for HTTP readiness, captures a screenshot, writes the PNG, then stops the process.
  - Skips projects that fail to boot and reports the reason.
- Create directory: `C:\sulvatech\iy\public\project-shots`
  - Stores generated homepage screenshots served by Next.js.
- Optional modify: `C:\sulvatech\iy\package.json`
  - Add `"capture:projects": "node scripts/capture-project-homepages.mjs"`.

## Project Screenshot Targets

Use these 10 current portfolio projects:

| Portfolio title | Local project folder | App type | Homepage path | Output |
| --- | --- | --- | --- | --- |
| Studify | `C:\server\forge` | Next | `/` | `studify.png` |
| SprintRoom | `C:\sulvatech\sprint` | Next | `/` | `sprintroom.png` |
| Sulva LMS | `C:\sulvatech\lms` | Next | `/` | `sulva-lms.png` |
| Venite Founder's Week | `C:\sulvatech\founder` | Next | `/` | `founders-week.png` |
| theDMAshop | `C:\sulvatech\thedmashop` | Vite | `/` | `thedmashop.png` |
| Nigerian News Platform | `C:\server\punch\apps\web` | Next | `/` | `nigerian-news-platform.png` |
| It's Lola Beauty | `C:\server\lumiere` | Next | `/` | `its-lola-beauty.png` |
| The Inner Circle | `C:\sulvatech\theinnercircle` | Vite | `/` | `the-inner-circle.png` |
| Timetable Allocator | `C:\server\attendance\frontend` | Next | `/` | `timetable-allocator.png` |
| Bata Ganik | `C:\server\bata` | Next | `/` | `bata-ganik.png` |

## Important Constraint

The current sandbox can write only inside `C:\sulvatech\iy`. Starting apps in `C:\server\...` or sibling `C:\sulvatech\...` folders may write build caches such as `.next` or `dist`. During execution, request approval for those project start commands if the sandbox blocks them.

---

### Task 1: Add Preview Metadata Config

**Files:**
- Create: `C:\sulvatech\iy\scripts\project-preview-config.mjs`

- [ ] **Step 1: Create the config file**

Use this exact content:

```js
export const projectPreviews = [
  {
    id: "studify",
    title: "Studify",
    cwd: "C:\\server\\forge",
    type: "next",
    path: "/",
    output: "studify.png",
  },
  {
    id: "sprintroom",
    title: "SprintRoom",
    cwd: "C:\\sulvatech\\sprint",
    type: "next",
    path: "/",
    output: "sprintroom.png",
  },
  {
    id: "sulva-lms",
    title: "Sulva LMS",
    cwd: "C:\\sulvatech\\lms",
    type: "next",
    path: "/",
    output: "sulva-lms.png",
  },
  {
    id: "founders-week",
    title: "Venite Founder's Week",
    cwd: "C:\\sulvatech\\founder",
    type: "next",
    path: "/",
    output: "founders-week.png",
  },
  {
    id: "thedmashop",
    title: "theDMAshop",
    cwd: "C:\\sulvatech\\thedmashop",
    type: "vite",
    path: "/",
    output: "thedmashop.png",
  },
  {
    id: "nigerian-news-platform",
    title: "Nigerian News Platform",
    cwd: "C:\\server\\punch\\apps\\web",
    type: "next",
    path: "/",
    output: "nigerian-news-platform.png",
  },
  {
    id: "its-lola-beauty",
    title: "It's Lola Beauty",
    cwd: "C:\\server\\lumiere",
    type: "next",
    path: "/",
    output: "its-lola-beauty.png",
  },
  {
    id: "the-inner-circle",
    title: "The Inner Circle",
    cwd: "C:\\sulvatech\\theinnercircle",
    type: "vite",
    path: "/",
    output: "the-inner-circle.png",
  },
  {
    id: "timetable-allocator",
    title: "Timetable Allocator",
    cwd: "C:\\server\\attendance\\frontend",
    type: "next",
    path: "/",
    output: "timetable-allocator.png",
  },
  {
    id: "bata-ganik",
    title: "Bata Ganik",
    cwd: "C:\\server\\bata",
    type: "next",
    path: "/",
    output: "bata-ganik.png",
  },
];
```

- [ ] **Step 2: Verify the config exports**

Run:

```powershell
node -e "import('./scripts/project-preview-config.mjs').then(m => console.log(m.projectPreviews.length))"
```

Expected:

```text
10
```

- [ ] **Step 3: Commit**

```powershell
git add scripts/project-preview-config.mjs
git commit -m "chore: add project preview config"
```

---

### Task 2: Add Homepage Capture Script

**Files:**
- Create: `C:\sulvatech\iy\scripts\capture-project-homepages.mjs`
- Create directory: `C:\sulvatech\iy\public\project-shots`

- [ ] **Step 1: Ensure Playwright is available**

Run:

```powershell
npm.cmd ls playwright
```

Expected:

```text
empty
```

or a listed installed Playwright package.

If Playwright is not installed, run:

```powershell
npm.cmd install -D playwright
npx.cmd playwright install chromium
```

Expected:

```text
added
```

and Chromium installation completes without errors.

- [ ] **Step 2: Create the output directory**

Run:

```powershell
New-Item -ItemType Directory -Force -Path public/project-shots
```

Expected:

```text
Directory: C:\sulvatech\iy\public
```

- [ ] **Step 3: Create the capture script**

Use this exact content:

```js
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { projectPreviews } from "./project-preview-config.mjs";

const root = process.cwd();
const outputDir = path.join(root, "public", "project-shots");
const logDir = path.join(root, ".project-preview-logs");
const basePort = 4100;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function startCommand(project, port) {
  if (project.type === "vite") {
    return {
      command: "npm.cmd",
      args: ["run", "dev", "--", "--host", "127.0.0.1", "--port", String(port)],
    };
  }

  return {
    command: "npm.cmd",
    args: ["run", "dev", "--", "-p", String(port), "-H", "127.0.0.1"],
  };
}

async function waitForReady(url, timeoutMs = 90000) {
  const start = Date.now();
  let lastError = "";

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok || response.status < 500) {
        return;
      }
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error.message;
    }

    await sleep(1500);
  }

  throw new Error(`Timed out waiting for ${url}: ${lastError}`);
}

async function captureProject(browser, project, index) {
  const port = basePort + index;
  const url = `http://127.0.0.1:${port}${project.path}`;
  const { command, args } = startCommand(project, port);
  const logPath = path.join(logDir, `${project.id}.log`);
  const logs = [];

  console.log(`\n[${project.title}] starting ${command} ${args.join(" ")}`);

  const child = spawn(command, args, {
    cwd: project.cwd,
    windowsHide: true,
    shell: false,
    env: {
      ...process.env,
      PORT: String(port),
      NEXT_TELEMETRY_DISABLED: "1",
      BROWSER: "none",
    },
  });

  child.stdout.on("data", (chunk) => logs.push(chunk.toString()));
  child.stderr.on("data", (chunk) => logs.push(chunk.toString()));

  try {
    await waitForReady(url);

    const page = await browser.newPage({
      viewport: { width: 1440, height: 1100 },
      deviceScaleFactor: 1,
    });

    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await page.screenshot({
      path: path.join(outputDir, project.output),
      fullPage: false,
      type: "png",
    });
    await page.close();

    console.log(`[${project.title}] captured /project-shots/${project.output}`);
    return { ...project, status: "captured", url, image: `/project-shots/${project.output}` };
  } catch (error) {
    console.log(`[${project.title}] skipped: ${error.message}`);
    await writeFile(logPath, logs.join(""), "utf8");
    return { ...project, status: "skipped", reason: error.message, logPath };
  } finally {
    child.kill("SIGTERM");
    await sleep(1000);
  }
}

await mkdir(outputDir, { recursive: true });
await mkdir(logDir, { recursive: true });

const browser = await chromium.launch();
const results = [];

for (let index = 0; index < projectPreviews.length; index += 1) {
  results.push(await captureProject(browser, projectPreviews[index], index));
}

await browser.close();

await writeFile(
  path.join(outputDir, "manifest.json"),
  JSON.stringify(results, null, 2),
  "utf8",
);

const captured = results.filter((result) => result.status === "captured").length;
const skipped = results.length - captured;

console.log(`\nCaptured ${captured}/${results.length} project screenshots.`);

if (skipped > 0) {
  console.log("Skipped projects are listed in public/project-shots/manifest.json.");
}
```

- [ ] **Step 4: Run the capture script**

Run:

```powershell
node scripts/capture-project-homepages.mjs
```

Expected:

```text
Captured 10/10 project screenshots.
```

Acceptable partial result:

```text
Captured 7/10 project screenshots.
Skipped projects are listed in public/project-shots/manifest.json.
```

If a project is skipped because of missing env vars, keep its existing fallback until the env is added.

- [ ] **Step 5: Commit**

```powershell
git add scripts/capture-project-homepages.mjs public/project-shots
git commit -m "chore: capture project homepage previews"
```

---

### Task 3: Wire Screenshots Into Project Cards

**Files:**
- Modify: `C:\sulvatech\iy\components\Projects.tsx`

- [ ] **Step 1: Replace each `mockupImage` path**

Use these exact replacements:

```ts
mockupImage: '/project-shots/studify.png',
mockupImage: '/project-shots/sprintroom.png',
mockupImage: '/project-shots/sulva-lms.png',
mockupImage: '/project-shots/founders-week.png',
mockupImage: '/project-shots/thedmashop.png',
mockupImage: '/project-shots/nigerian-news-platform.png',
mockupImage: '/project-shots/its-lola-beauty.png',
mockupImage: '/project-shots/the-inner-circle.png',
mockupImage: '/project-shots/timetable-allocator.png',
mockupImage: '/project-shots/bata-ganik.png',
```

Map them in the same order as the `projectsData` array.

- [ ] **Step 2: Keep the existing image rendering**

The existing `Image` elements can stay because local `/public` image paths work with Next Image:

```tsx
<Image
  src={project.mockupImage}
  alt={project.title}
  fill
  className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 hover:scale-105"
  referrerPolicy="no-referrer"
/>
```

- [ ] **Step 3: Remove remote image dependency if no remote images remain**

Modify `C:\sulvatech\iy\next.config.ts` only if no remaining code uses `https://picsum.photos`.

Remove:

```ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'picsum.photos',
      port: '',
      pathname: '/**',
    },
  ],
},
```

Do not remove `images.remotePatterns` if another file still uses remote images.

- [ ] **Step 4: Run TypeScript**

Run:

```powershell
npx.cmd tsc --noEmit
```

Expected: no output and exit code `0`.

- [ ] **Step 5: Commit**

```powershell
git add components/Projects.tsx next.config.ts
git commit -m "feat: use real project homepage screenshots"
```

---

### Task 4: Add a NPM Convenience Script

**Files:**
- Modify: `C:\sulvatech\iy\package.json`

- [ ] **Step 1: Add `capture:projects`**

Inside `"scripts"`, add:

```json
"capture:projects": "node scripts/capture-project-homepages.mjs"
```

The scripts block should include:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "capture:projects": "node scripts/capture-project-homepages.mjs"
}
```

- [ ] **Step 2: Verify package JSON parses**

Run:

```powershell
node -e "const p=require('./package.json'); console.log(p.scripts['capture:projects'])"
```

Expected:

```text
node scripts/capture-project-homepages.mjs
```

- [ ] **Step 3: Commit**

```powershell
git add package.json package-lock.json
git commit -m "chore: add project screenshot capture script"
```

---

### Task 5: Verify The Portfolio Visually

**Files:**
- No code changes unless verification reveals layout issues.

- [ ] **Step 1: Run the portfolio dev server**

Run:

```powershell
npm.cmd run dev -- -p 3001
```

Expected:

```text
Local: http://localhost:3001
Ready
```

- [ ] **Step 2: Open the homepage**

Visit:

```text
http://localhost:3001
```

Expected:

- Hero video still blends into the banner.
- Projects section shows real homepage screenshots.
- No `picsum.photos` images are visible.
- The card hover still reveals color.
- The project modal uses the same real screenshot at the top and in the detail image.

- [ ] **Step 3: Check rendered HTML for removed placeholders**

Run:

```powershell
$r = Invoke-WebRequest -Uri 'http://localhost:3001' -UseBasicParsing -TimeoutSec 20
($r.Content -like '*picsum.photos*')
```

Expected:

```text
False
```

- [ ] **Step 4: Run production build**

Run:

```powershell
npm.cmd run build
```

Expected:

```text
Compiled successfully
```

- [ ] **Step 5: Commit verification fixes if needed**

If layout fixes are needed:

```powershell
git add components/Projects.tsx app/globals.css
git commit -m "fix: polish project screenshot presentation"
```

If no fixes are needed, do not create an empty commit.

---

## Future Optional Plan: Lazy Iframe Preview

Do not implement this in the first pass. If screenshots feel too static, add a second plan for iframe previews:

- Add `livePreviewUrl` to project metadata only for projects that can run reliably.
- Add a “Preview Live” button in the modal.
- Lazy-load an iframe only after the modal opens and the user clicks the button.
- Show a fallback message when the local preview server is not running.

This keeps the portfolio fast while still allowing interactive previews when useful.

---

## Self-Review

- Spec coverage: The plan covers screenshot capture, static image wiring, avoiding fragile iframes, verification, and optional future iframe previews.
- Placeholder scan: No TBD/TODO placeholders remain.
- Type consistency: `projectPreviews`, `mockupImage`, `capture:projects`, and output filenames are consistent across tasks.
