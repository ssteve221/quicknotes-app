# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes of up to 200 characters, give each one a category (Personal, Work or Study), search through them and delete the ones you no longer need. Notes are saved in the browser, so they are still there after a refresh.

## Features

- Add notes with a category: Personal, Work or Study
- Validation for empty notes and notes over 200 characters
- Delete any note with its own Delete button
- Live, case-insensitive search with a "No notes match your search." message
- Correct note count for zero, one and many notes
- Notes saved with localStorage and restored when the page opens
- Each category has its own colour, and the layout adapts to small screens

## How to run locally

1. Clone the repository: `git clone https://github.com/YOUR-USERNAME/quicknotes-app.git`
2. Open the `quicknotes-app` folder.
3. Double-click `index.html` to open it in your browser (or use the Live Server extension in VS Code).

No installation or build step is needed.

## What I learned

- How to build a list from an array of objects with `createElement` and `textContent`, and why `textContent` is safer than `innerHTML` for user text.
- How to save and load data with `localStorage`, `JSON.stringify` and `JSON.parse`.
- How to use Flexbox for the form and a `@media (max-width: 600px)` rule to make the layout responsive.
- How to keep one `render()` function as the single place that updates the page after every change.
- How to write small, clear Git commits for each step of a project.
