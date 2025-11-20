# Eco-Sort

> Detects whether a piece of garbage is recyclable (or not) and shows the nearest dumping yard. Built with React and modern web APIs — optimized for quick contributions and privacy (uses `localStorage` for user contributions).
> **Live site:** https://ecosortnew.netlify.app/

---

## Demo


<img width="700" height="700" alt="Screenshot 2025-11-20 191652" src="https://github.com/user-attachments/assets/adf9469a-bae0-4abf-89ef-85d120564114" />
<img width="700" height="700" alt="Screenshot 2025-11-20 191639" src="https://github.com/user-attachments/assets/92fbbb87-6d6a-4548-8c27-88b5d4d2a52b" />
<img width="700" height="700" alt="Screenshot 2025-11-20 191706" src="https://github.com/user-attachments/assets/090bb663-b6e1-49f2-b08d-cc0a6e38d6c0" />
<img width="700" height="700" alt="Screenshot 2025-11-20 191730" src="https://github.com/user-attachments/assets/1c91ebc8-7bec-44af-83cd-744a7f3c6dfa" />
<img width="700" height="700" alt="Screenshot 2025-11-20 191719" src="https://github.com/user-attachments/assets/a66ec97f-9d5b-4f15-90ca-a5e90e249a92" />

---

## Features

* Image / camera-based garbage detection (uses Gemini API for model inference)
* Shows whether an item is **Recyclable / Non-recyclable**
* Finds and displays the **nearest dumping yard** using `react-leaflet` maps
* Stores user contributions (date, image, detected label) in the browser using `localStorage`
* User avatar generation with DiceBear API
* Dark mode (user-toggle, persisted)
* Mobile-friendly & accessible UI
* Clean icons via `react-icons` and `lucide-react`

---

## Live website

**URL:** `https://ecosortnew.netlify.app/`

---

## Tech Stack

* **Frontend:** React
* **Routing:** react-router-dom
* **Maps:** react-leaflet + Leaflet
* **Detection model:** Google Gemini API (or other configured LLM/vision model endpoint)
* **Icons:** react-icons, lucide-react
* **Avatars:** DiceBear API
* **Storage:** localStorage (for contributions)
* **Other:** REST API endpoints (your backend or serverless functions) for any server-side needs

---

## Getting started (local)

1. Clone the repo

   ```bash
   git clone https://github.com/<your-username>/eco-sort.git
   cd eco-sort
   ```
2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```
3. Create a `.env` in the project root with the following (example names; update to match your code):

   ```
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key
   REACT_APP_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
   REACT_APP_MAP_TILE_ATTR="&copy; OpenStreetMap contributors"
   ```

   **Important:** Do NOT commit API keys to git. Use environment variables or your hosting secret manager.
4. Run locally

   ```bash
   npm start
   # or
   yarn start
   ```
5. Build for production

   ```bash
   npm run build
   # or
   yarn build
   ```

---

## Usage notes

* The app calls the configured model/endpoint (Gemini or other) to classify images. Ensure your API key has vision inference enabled and your request format matches the app's detection code.
* Map pins for dumping yards are determined by a local dataset or a server endpoint. Update `src/services/mapService.js` (or the relevant file) with your list of dumping yards or connect to a backend that returns nearby yards based on geolocation.
* Contributions saved in `localStorage` are stored under the app key (e.g. `ecoSort.contributions`). You can export/import JSON if you add that feature.

---

## Environment & API security

* Keep API keys secret. On production deployments (Netlify / Vercel), set the keys in the platform's environment variable settings.
* If you must use client-side calls to Gemini / other vision APIs, implement strict quota limits and input validation, or proxy requests through a secure serverless function to avoid exposing credentials.

---

## Accessibility & privacy

* Geolocation: the app uses the browser `navigator.geolocation` API — users must grant permission.
* Contributions stored locally: the app stores contributions in `localStorage` only on the user's device. No server-side storage is used unless you extend the app.
* For any personally identifying data, follow privacy best practices and local laws.

---

## Folder structure (example)

```
/src
  /components
    Navbar.jsx
    Home.jsx
    Map.jsx
    Detector.jsx
    Contributions.jsx
  /services
    geminiService.js
    mapService.js
    localStorageService.js
  /styles
  App.jsx
  index.jsx
```

---

## Contributing

Contributions are welcome! Suggested workflow:

1. Fork the repo
2. Create a branch: `feature/your-feature`
3. Open a PR with a description of changes
4. Keep PRs small and focused (feature, fix, styles)

---

## Acknowledgements & Copyrights

The Eco-Sort project incorporates third-party software, APIs, and assets. All rights and copyrights belong to their respective owners:

* **React** — Copyright Meta Platforms, Inc.
* **react-router-dom** — Copyright contributors of the react-router project.
* **Leaflet & react-leaflet** — Leaflet and react-leaflet contributors (open-source map library).
* **DiceBear** — DiceBear avatars API (avatars generated via DiceBear).
* **Gemini API / Google** — Google (Gemini) — used for image/model inference where applicable; subject to Google API Terms of Service.
* **react-icons** — React Icons contributors.
* **lucide-react** — Lucide contributors.
* **OpenStreetMap tiles / other map tiles** — If using OSM or third-party map tiles, respect the tile provider's terms & attribution requirements.
* Any other third-party libraries, icons, fonts or assets used are the property of their respective authors and are used according to their licenses. Please see `package.json` and the libraries' repositories for precise license texts.

---

## License

This repository (Eco-Sort) is released under the **MIT License**.

```
MIT License

Copyright (c) 2025 Eco-Sort

Permission is hereby granted, free of charge, to any person obtaining a copy
... (standard MIT license text) ...


## Troubleshooting

* **Map or tiles not loading**: check `REACT_APP_MAP_TILE_URL` and attribution, and confirm there are no mixed-content issues (HTTP vs HTTPS).
* **Detection failing**: confirm your Gemini API key is valid, has necessary quotas, and that the request payload matches the API expectations.
* **Localhost 404 on subpaths**: when using client-side routing with react-router and deploying to Netlify/GitHub Pages, add proper redirect rules (e.g., `_redirects` for Netlify: `/* /index.html 200`).

---

## Contact

For issues or feature requests, open an issue on GitHub or contact the maintainer.

---

```
