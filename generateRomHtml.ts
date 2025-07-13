import fs from 'fs';
import path from 'path';

const ROMS_DIR = '../ROMS';
const OUTPUT_DIR = path.join(__dirname, 'output');
const CSS_FILE = path.join(OUTPUT_DIR, 'style.css');

// Ensure output folder exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate CRT-themed CSS with retro font and animation
const generateCss = () => {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

    body {
      background-color: #000;
      font-family: 'Press Start 2P', monospace;
      margin: 0;
      padding: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .crt {
      background-color: #1c1c2c;
      color: #f0f0f0;
      padding: 2rem;
      max-width: 800px;
      width: 100%;
      border-radius: 30px;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
      position: relative;
      overflow: hidden;
      isolation: isolate;
      animation: crtFlicker 1.5s infinite;
      filter: contrast(1.02) brightness(1.1);
    }

    @keyframes crtFlicker {
      0%, 100% { opacity: 1; }
      49% { opacity: 0.97; }
      50% { opacity: 1; }
    }

    .crt::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      pointer-events: none;
      background: repeating-linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.06),
        rgba(255, 255, 255, 0.06) 2px,
        transparent 2px,
        transparent 4px
      );
      mix-blend-mode: overlay;
      z-index: 2;
    }

    h1 {
      color: #ffd6e8;
      font-size: 2.2rem;
      margin-bottom: 1.5rem;
      letter-spacing: 1px;
      text-shadow: 0 0 6px rgba(255, 255, 255, 0.3);
    }

    h2 {
      color: #66ccff;
      font-size: 1.1rem;
      font-weight: bold;
      margin-top: 2rem;
      border-bottom: 1px dashed #444;
      padding-bottom: 0.2rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    ul {
      list-style-type: disc;
      padding-left: 2rem;
      margin-top: 1rem;
    }

    li {
      margin: 0.5rem 0;
    }

    .game {
      margin-left: 1rem;
      line-height: 1.6;
      color: #f0eaf7;
    }

    a {
      color: #ff3c38;
      text-decoration: none;
      font-weight: bold;
    }

    a:hover {
      color: #3c9eff;
      text-decoration: underline;
    }

    .nav {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
      margin-bottom: 1.5rem; /* 👈 Add this line */
    }

    .nav a {
      margin: 0 5px;
      color: #9aeaff;
      font-weight: bold;
    }
  `;
  fs.writeFileSync(CSS_FILE, css.trim());
};

const getGamesBySystem = (baseDir: string): Record<string, string[]> => {
  const systems = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const result: Record<string, string[]> = {};

  for (const system of systems) {
    const systemPath = path.join(baseDir, system);
    const files = fs.readdirSync(systemPath)
      .filter(file => !file.startsWith('.') && fs.statSync(path.join(systemPath, file)).isFile())
      .map(file => path.parse(file).name)
      .sort((a, b) => a.localeCompare(b));

    result[system] = files;
  }

  return result;
};

const createSystemPage = (system: string, games: string[]) => {
  const filename = `${system.toLowerCase().replace(/\s+/g, '-')}.html`;
  const title = `${system} ROMs`;

  let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <div class="crt" data-system="${system.toLowerCase()}">
        <h1>${title}</h1>
        <p>${games.length} games listed</p>
        <div class="nav">
          ${[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(l => `<a href="#${l}">${l}</a>`).join(' ')}
        </div>
  `;

  let currentLetter = '';
  games.forEach(game => {
    const firstLetter = game[0].toUpperCase();
    if (firstLetter !== currentLetter) {
      currentLetter = firstLetter;
      html += `<h2 id="${firstLetter}">${firstLetter}</h2>\n`;
    }
    html += `<div class="game">${game}</div>\n`;
  });

  html += `
        <br><a href="index.html">← Back to home</a>
      </div>
    </body>
    </html>
  `;

  fs.writeFileSync(path.join(OUTPUT_DIR, filename), html.trim());
};

const createIndexPage = (systems: string[]) => {
  let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>EmuScan</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <div class="crt">
        <h1>Your ROM Library</h1>
        <ul>
  `;

  systems.forEach(system => {
    const filename = `${system.toLowerCase().replace(/\s+/g, '-')}.html`;
    html += `<li><a href="${filename}">${system}</a> (${roms[system].length})</li>\n`;
  });

  html += `
        </ul>
        <p style="margin-top: 2rem; font-size: 0.8rem; text-align: center;">
          Made with ❤️ by <a href="https://github.com/Zakk-Fast" target="_blank">Zakk Fast</a>
        </p>
      </div>
    </body>
    </html>
  `;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), html.trim());
};


// Main flow
generateCss();
const roms = getGamesBySystem(ROMS_DIR);
const systems = Object.keys(roms);
systems.forEach(system => createSystemPage(system, roms[system]));
createIndexPage(systems);
console.log('✅ CRT-style ROM library generated in ./output/');
