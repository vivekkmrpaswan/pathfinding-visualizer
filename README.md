# Pathfinding Visualizer

An interactive, fully responsive pathfinding visualizer built with React, TypeScript, and Vite. Draw walls, generate mazes, and watch classic pathfinding algorithms search for the shortest path in real time — on desktop with a mouse or on mobile/tablet with touch.

## Features

- **Algorithms:** Breadth-First Search, Depth-First Search, Dijkstra's Algorithm, A*
- **Maze generation:** Binary Tree, Recursive Division
- **Interactive grid:** draw and erase walls with mouse or touch
- **Responsive layout:** the grid dynamically sizes itself to the available screen space on desktop, tablet, mobile portrait, and mobile landscape
- **Adjustable animation speed**
- **Toast notifications** for orientation changes during an active animation

## Tech Stack

- [React](https://react.dev/) 18
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- React Context API for state management
- [Sonner](https://sonner.emilkowal.ski/) for toast notifications

## Running Locally

\`\`\`bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview
\`\`\`

## How It Works

- The grid dynamically calculates rows/columns from the available container size using a `ResizeObserver`, so it fills the screen exactly on any device.
- Wall drawing supports both mouse (`mousedown`/`mouseenter`) and touch (Pointer Events with `elementFromPoint`) interactions.
- To keep animations visually consistent, the grid intentionally ignores resize events while a maze generation or pathfinding animation is running, and shows an informational toast if the device is rotated mid-animation.

## License

This project is open source and available for personal or educational use.