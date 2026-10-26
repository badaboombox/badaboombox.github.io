# Project images

Put project photos and schematic exports here (PNG / JPG / WebP).

Right now each project card shows a styled placeholder. To swap in a real image for a
project, add the file here and update that project's card media — easiest path is to add an
`image` field to the project object in `../../script.js` and render an `<img>` inside the
`.card__media` element.

Suggested naming: `<project-id>.jpg` (e.g. `radio-rack.jpg`, `robodog-pdb.jpg`) to match
the `id` fields already in `script.js`.