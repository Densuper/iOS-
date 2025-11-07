# Simple Counter PWA

A lightweight Progressive Web App counter experience that offers installability, offline support, and persistent state without any native platform dependencies.

## Features
- Instant feedback for increment, decrement (non-negative), and reset interactions
- Persists the counter value in `localStorage` so the number survives refreshes and offline sessions
- Installable on desktop and mobile devices via the included web manifest
- Offline capable with a service worker that precaches the application shell
- Automated test that validates the core counter behaviour without third-party tooling

## Project Structure
```
pwa/
├── icons/                 # App icon used by the web manifest
├── index.html             # Application shell and UI markup
├── manifest.webmanifest   # Installability metadata
├── scripts/app.js         # Counter state management & service worker registration
├── service-worker.js      # Offline cache implementation
└── styles/app.css         # Visual styling
scripts/
└── dev-server.js          # Lightweight static file server for local development
tests/
└── run-tests.js           # Mocked DOM smoke test for the counter interactions
package.json               # Tooling and automated scripts
```

## Getting Started

1. Install dependencies (none are required, but this keeps npm happy):
   ```bash
   npm install
   ```
2. Run the automated test to validate the counter behaviour:
   ```bash
   npm test
   ```
3. Start the local development server:
   ```bash
   npm run start
   ```
4. Open the application at the URL printed in the terminal (typically http://localhost:3000). Add it to your home screen or install it through your browser to experience the PWA flow.

The project is framework-free and ships plain HTML/CSS/JavaScript so you can host it on any static file server.
