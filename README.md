# TravelMateNE — North East Tourism Explorer

A responsive React + Vite web app for discovering destinations and planning trips across the eight North Eastern states of India.

## Features
- Dedicated state explorer for Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim and Tripura.
- State profiles with capital, overview, culture, food and entry/permit notes.
- Destination directory with 21 detailed destination guides.
- Destination detail view: district, highlights, ideal season, suggested duration, indicative budget tier, how to reach, local food, permits and practical tips.
- Search and filter destinations.
- Interactive North East India map with destination markers.
- Save favourites and build a personal itinerary.
- Budget estimator, share/print itinerary and pre-trip checklist.
- Festival calendar and responsible travel guide.
- Responsive layout for desktop, tablet and mobile.
- Local browser storage for saved places, itinerary and checklist.

## Run locally
Requirements: Node.js 20.19+ or 22.12+.
```bash
npm install
npm run dev
```
Build: `npm run build` (output: `dist/`).

## Export the complete source ZIP
```bash
npm run export:source
```
This creates `public/TravelMateNE-source.zip`. The ZIP includes the project's source, backend, configuration and tests, while excluding dependencies, build output and environment files.

The normal production build also generates the ZIP and publishes it as `/TravelMateNE-source.zip`.

## Deploy to Render
The repository includes `render.yaml` for a Render Static Site.
1. Push this project to a GitHub repository.
2. In Render, choose **New → Blueprint** and connect the repository.
3. Render reads `render.yaml`, runs `npm install && npm run build`, and publishes `dist`.
4. Alternatively, create a Static Site manually with build command `npm install && npm run build` and publish directory `dist`.

## Deploy to GitHub
```bash
git init
git add .
git commit -m "TravelMateNE source"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Important content notes
- This is a tourism discovery and planning guide, not a booking engine or live transport/availability service.
- Permit requirements, access rules, festival dates, road conditions and security advisories can change. Verify with official state tourism departments, district administrations and authorised operators before travel.
- Cost tiers are indicative only; no live rates are supplied.
- Photos are loaded from Unsplash.
- User trip data is stored in the browser; account and server endpoints depend on the deployment platform.

## Structure
```
.
├── backend/
│   └── index.ts
├── scripts/
│   └── export-source.mjs
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── upgrade.css
├── tests/
│   └── tests.json
├── appdeploy.auth-login.json
├── index.html
├── package.json
├── postcss.config.js
├── render.yaml
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```
