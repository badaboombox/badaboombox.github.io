# Nikhil Reddy — Portfolio

A static, multi-page portfolio website showcasing my electrical engineering / PCB design work.
Built from scratch with plain **HTML, CSS, and JavaScript** — no build step, no dependencies.

## Run locally

It's a static site, so just open `index.html` in a browser. For best results, serve it over a
local web server:

```bash
# Python 3
python -m http.server 8000        # then open http://localhost:8000
# or Node
npx serve .
```

## Pages

| File            | Page          | Contents |
|-----------------|---------------|----------|
| `index.html`    | Home          | Description (left) + photo (top-right) + active project (bottom-right) |
| `about.html`    | About         | Bio, skills, education & experience |
| `projects.html` | Projects      | Project card grid — each card opens its own page |
| `project.html`  | Project detail| One page per project via `project.html?id=<project-id>` — gallery, full breakdown, prev/next nav |
| `research.html` | Research      | Academic research (papers / lab work) + build-driven deep-dives |

There is no Contact page — contact links (email / GitHub / LinkedIn) live in the **beige top bar**
on every page.

**Layout:** a fixed, no-scroll "app shell" — a beige **top bar** (brand + contacts), a solid **maroon
left sidebar** (page nav), and a full-viewport content area (desktop fits without scrolling; very
small/short screens fall back to scrolling). Exception: the project detail page scrolls **inside**
the content pane (top bar + sidebar stay fixed) since breakdowns are long.

**Aesthetic:** dark content area, code/terminal text styling, **maroon** accent, flat fills
(no gradients), sharp/blocky corners with corner-bracket accents, and a **circuit-trace background**
(inline SVG in `styles.css`).

Shared assets: `styles.css` and `script.js` (project data + all interactions). Each page hardcodes
the same top bar + sidebar.

## Things to fill in (placeholders are marked on the site)

Anywhere you see a dashed maroon underline on the live site is a placeholder. Specifically:

- **Your photo** — drop an image at `assets/me.jpg`, then replace the placeholder block
  (`.photo`) in `index.html` with an `<img src="assets/me.jpg" ...>`.
- **Rutgers Honors logo** — drop a PNG at `assets/rutgers-honors.png`; the home description already
  references it (shows a "logo" placeholder until the file exists).
- **About details** — `about.html` has a filled education row (Rutgers Honors, EE, 2028) plus
  placeholder rows for coursework and a second experience/club/internship entry.
- **Featured project** on the Home page — change `FEATURED_ID` at the top of `script.js`
  to any project `id` (currently `"ss-handheld"`).
- **Logo** — the "NR" block + favicon are placeholders; swap for a real mark when ready.

## How to update content

- **Add / edit a project** — open `script.js` and edit the `PROJECTS` array. Each project is one
  object (copy an existing block and change the fields). The Projects grid, each project's detail
  page, and the Home "Active Project" panel all render from this single source. A new project
  automatically gets its own page at `project.html?id=<its-id>`.
- **Project images** — drop photos in `assets/projects/`, then list their paths in that project's
  `images: []` array in `script.js` (first path = the big hero slot). Empty slots show labeled
  placeholders; set `gallerySlots: <n>` on a project to add more boxes (Radio Rack is set to 8).
- **Research entries** — plain HTML in `research.html`. Two sections: **Academic Research**
  (replace the dashed placeholder card with real papers / professor understudy work) and
  **Build-Driven Study** (copy an `<article class="rcard">` block to add more).

## Deploy to GitHub Pages (free)

```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/badaboombox/<repo-name>.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / root**. Live at
`https://badaboombox.github.io/<repo-name>/` (name the repo `badaboombox.github.io` for a
root personal site). Drag-and-drop alternatives: [Netlify Drop](https://app.netlify.com/drop) or
[Vercel](https://vercel.com).