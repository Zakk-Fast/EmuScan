# EmuScan

Turns your ROM folder into a static CRT-style game browser. No JavaScript. Fully offline.

## What It Does

- 🎮 Generates a stylized static site from your ROM folders  
- 📺 Includes CRT-style visuals: scanlines, curvature, and pixel fonts. Because it should look cool, not like a .txt file.  
- 🗂 Organizes games by system, then alphabetically  
- 🔗 Creates fast-loading pages with zero runtime dependencies  
- 📴 Can be opened directly in any browser—no web server required
- 🚀 Super fast. Like.. really fast. Ready to go in seconds

## How to Use

If you're not sure what to do, no worries. Here's a step-by-step guide for total beginners:

1. **Download this whole folder**  
   You need the full project folder, not just the script.  
   It includes the generator script, styling, and output folder.  

2. **Set up your ROMs folder**  
   Inside the project folder, create a folder called `ROMS` (uppercase).  
   Add subfolders for each console (like `NES`, `GBA`, `PS2`, etc).  
   Drop your ethically sourced ROM files into the correct folders.  
   Place this app next to your ROMS folder.

   **Example folder structure:**
   ```
    ├── ROMS/
    │ ├── NES/
    │ │ ├── Contra.nes
    │ │ ├── Mega Man 2.nes
    │ ├── GBA/
    │ │ ├── Metroid Fusion.gba
    │ │ ├── Mario Kart.gba
    ├── EmuScan/
    │ │ ├── build-rom-library.ts
    │ │ ├── [other script files and folders]
   ```

3. **Install Node.js and TypeScript (if you haven’t already)**  
   - [Download Node.js](https://nodejs.org/) and install it.  
   - Open your terminal (Command Prompt, PowerShell, Terminal, etc).  

4. **Install project dependencies**  
   Run these commands from inside the project folder:
   ```bash
   npm install --save-dev typescript ts-node @types/node
   ```

5. **Run the script to generate your ROM library**
   ```bash
   npx ts-node build-rom-library.ts
   ```

6. **View your ROM browser**  
   - Open the file `output/index.html` in your web browser.  
   - That’s your CRT-style offline ROM browser.

---

## What You Get

- `output/index.html` – homepage with system links  
- `output/[system].html` – one file per console  
- `output/style.css` – retro pixel CRT aesthetic  

---

## Customization

Want to change the color palette, layout, or CRT effects? Edit the `generateCss()` function in `build-rom-library.ts`.

---

## Screenshot
<img width="1899" height="907" alt="Screenshot 2025-07-13 014729" src="https://github.com/user-attachments/assets/477aa49e-cbd1-4249-a7df-be5e433d94ab" />
<img width="1902" height="903" alt="Screenshot 2025-07-13 014802" src="https://github.com/user-attachments/assets/b65b964d-bf41-4fbb-87b0-43350d449ee3" />

---

## License

MIT. Free to use, share, and modify.  
If you build on it or make something cool, feel free to share it.

---

## Disclaimer

This project is intended for personal archival and educational use.
It does not condone or encourage software piracy. Please only use ROMs that you legally own.

Made with a love for retro ❤️
