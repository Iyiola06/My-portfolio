import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { projectPreviews } from "./project-preview-config.mjs";

const root = process.cwd();
const outputDir = path.join(root, "public", "project-shots");
const logDir = path.join(root, ".project-preview-logs");
const manifestPath = path.join(outputDir, "manifest.json");
const basePort = 4100;
const requestedIds = new Set(process.argv.slice(2));
const systemBrowserPaths = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function startCommand(project, port) {
  const npmArgs = project.type === "vite"
    ? ["npm.cmd", "run", "dev", "--", "--host", "127.0.0.1", "--port", String(port)]
    : ["npm.cmd", "run", "dev", "--", "-p", String(port), "-H", "127.0.0.1"];

  if (project.type === "vite") {
    return {
      command: "cmd.exe",
      args: ["/d", "/s", "/c", npmArgs.join(" ")],
    };
  }

  return {
    command: "cmd.exe",
    args: ["/d", "/s", "/c", npmArgs.join(" ")],
  };
}

async function launchBrowser() {
  try {
    return await chromium.launch();
  } catch (error) {
    const executablePath = systemBrowserPaths.find((candidate) => existsSync(candidate));
    if (!executablePath) {
      throw error;
    }

    console.log(`Using system browser: ${executablePath}`);
    return chromium.launch({ executablePath });
  }
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

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(2500);
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
    if (child.pid) {
      spawnSync("taskkill.exe", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
    }
    child.kill("SIGTERM");
    await sleep(1000);
  }
}

await mkdir(outputDir, { recursive: true });
await mkdir(logDir, { recursive: true });

const browser = await launchBrowser();
const results = [];
const targets = requestedIds.size > 0
  ? projectPreviews.filter((project) => requestedIds.has(project.id))
  : projectPreviews;

for (let index = 0; index < targets.length; index += 1) {
  const originalIndex = projectPreviews.findIndex((project) => project.id === targets[index].id);
  results.push(await captureProject(browser, targets[index], originalIndex));
}

await browser.close();

let mergedResults = results;
if (requestedIds.size > 0 && existsSync(manifestPath)) {
  const previousResults = JSON.parse(await readFile(manifestPath, "utf8"));
  const resultById = new Map(previousResults.map((result) => [result.id, result]));
  for (const result of results) {
    resultById.set(result.id, result);
  }
  mergedResults = projectPreviews.map((project) => resultById.get(project.id) ?? project);
}

await writeFile(
  manifestPath,
  JSON.stringify(mergedResults, null, 2),
  "utf8",
);

const captured = mergedResults.filter((result) => result.status === "captured").length;
const skipped = mergedResults.length - captured;

console.log(`\nCaptured ${captured}/${mergedResults.length} project screenshots.`);

if (skipped > 0) {
  console.log("Skipped projects are listed in public/project-shots/manifest.json.");
}
