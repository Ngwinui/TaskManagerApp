# TaskFlow

TaskFlow is a clean, responsive task manager built with TypeScript. It helps you organize daily work with simple task controls, progress tracking, and light/dark mode.

## Features

- Add, edit, complete, and delete tasks
- Filter tasks by all, active, or completed
- Clear all completed tasks
- Track remaining tasks and completion progress
- Save tasks and theme preferences in browser `localStorage`
- Responsive layout for desktop and mobile screens
- Light and dark themes

## Tech Stack

- HTML5
- CSS3
- TypeScript
- Browser `localStorage` API

## Project Structure

```text
.
├── index.html       # Application markup
├── styles.css       # Application styles
├── src/index.ts     # TypeScript application logic
├── dist/index.js    # Compiled JavaScript used by the browser
└── tsconfig.json    # TypeScript compiler configuration
```

## Run Locally

### Prerequisites

Install Node.js, which includes `npm` and allows you to run the TypeScript compiler.

### Build the TypeScript

From the project directory, run:

```powershell
npx tsc
```

This generates `dist/index.js` from `src/index.ts`.

### Open the app

Open `index.html` in a browser after compiling the TypeScript. For the most reliable local experience, serve the folder with a local web server, such as the VS Code Live Server extension.

## Deploy With GitHub Pages

1. Push the project to a GitHub repository.
2. Open the repository's **Settings**.
3. Select **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder.
6. Click **Save**.

GitHub Pages will publish the app at:

 https://ngwinui.github.io/TaskManagerApp/

Whenever changes are made, rebuild and push them:

```powershell
npx tsc
git add .
git commit -m "Update TaskFlow"
git push
```

## Data Storage

Tasks are stored locally in the browser. They are not synced to a server or shared between devices. Clearing browser site data will remove saved tasks and theme preferences.
