# TravelMateNE – North East India Tourism Explorer

**Discover the beauty, culture, festivals and destinations of North East India — all in one place.**

TravelMateNE is a tourism discovery and trip-planning web application designed to make exploring the eight states of North East India easier, more informative and more accessible. It helps travellers discover destinations, explore local culture, estimate trip expenses, prepare itineraries and organise their travel essentials through a single platform.

---

## 🌏 About the Project

North East India is known for its beautiful landscapes, rich cultural heritage, diverse communities, traditional festivals and unique local products. However, travellers often face difficulties finding reliable destination information, understanding travel requirements and planning affordable trips.

TravelMateNE aims to address these challenges by bringing useful tourism information and trip-planning tools together in one user-friendly platform.

The platform covers all eight North Eastern states:

1. Arunachal Pradesh
2. Assam
3. Manipur
4. Meghalaya
5. Mizoram
6. Nagaland
7. Sikkim
8. Tripura

## ✨ Key Features

### 1. Explore Destinations
- Discover tourist destinations across North East India.
- Browse destination information and travel highlights.
- Search and filter destinations.
- Learn about the best visiting seasons and suggested trip durations.
- Explore local food, culture and practical travel information.

### 2. Interactive Explore Map
- Explore North East India through an interactive map.
- View destination markers.
- Select a destination from the destination index to locate it on the map.
- Select map markers to access destination information.

### 3. State Explorer
- Explore all eight North Eastern states.
- View state profiles, capitals and general information.
- Learn about regional culture, food and travel considerations.
- Discover destinations associated with each state.

### 4. Personal Trip Planner
- Build a personalised travel itinerary.
- Add destinations to your trip.
- Organise selected places into a travel plan.
- Review your planned destinations.
- Share or print your itinerary.

### 5. Budget Estimator
- Estimate the approximate cost of a trip.
- Use destination and trip information to plan expenses.
- Understand indicative budget requirements before travelling.

*All displayed estimates are indicative and should not be treated as live quotations.*

### 6. Shopping List
- Discover notable local products and souvenirs.
- Organise items you may want to purchase during your journey.
- Maintain a personal shopping list.

### 7. Saved Destinations
- Save favourite destinations.
- Access saved places conveniently.
- Keep track of locations you may want to visit later.

### 8. Festival Calendar
- Explore festivals celebrated across North East India.
- Discover regional cultural celebrations.
- Use festival information to plan culturally enriching visits.

*Festival dates may vary by year. Verify dates with official organisers before travelling.*

### 9. Travel Guide
- Access practical travel information.
- Review permit and entry considerations.
- Understand destination-specific travel tips.
- Prepare for a more organised journey.

### 10. Pre-Trip Checklist
- Organise important travel essentials.
- Check documents and confirmations.
- Prepare clothing, medicines and other necessary items.
- Keep track of preparations before departure.

### 11. Responsive User Interface
- Designed for desktop, tablet and mobile screens.
- Simple navigation and organised sections.
- User-friendly layout for easier exploration.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | Frontend user interface |
| TypeScript | Type-safe application development |
| Vite | Development server and production build |
| Tailwind CSS | Utility-first styling |
| CSS | Custom styling and responsive layouts |
| Lucide React | Interface icons |
| Axios | HTTP request support |
| Node.js | JavaScript runtime and project tooling |
| AppDeploy SDK | Backend route and database integration |

## 📁 Project Structure

```text
TravelMateNE/
│
├── .github/
│
├── backend/
│   └── index.ts
│
├── scripts/
│   └── export-source.mjs
│
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── upgrade.css
│
├── tests/
│   └── tests.json
│
├── appdeploy.auth-login.json
├── backend.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── render.yaml
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── .gitignore
├── .npmrc
└── README.md
```

**Main directories and files**

- `src/` – Main frontend application, entry point and styling.
- `backend/` – Backend route definitions and application data operations.
- `scripts/` – Utility scripts, including source ZIP generation.
- `tests/` – Project test configuration and test-related data.
- `package.json` – Project dependencies and npm scripts.
- `package-lock.json` – Locked dependency versions.
- `vite.config.ts` – Vite configuration.
- `render.yaml` – Render deployment configuration.
- `.npmrc` – npm registry configuration.
- `backend.js` – Generated backend bundle included in the project.

---

## 💻 Getting Started

Follow these instructions to run TravelMateNE on your computer.

### Prerequisites

Install the following:

- Node.js 20.19+ or Node.js 22.12+
- npm (included with Node.js)
- Git (optional, for repository management)
- A code editor such as Visual Studio Code

Check your installed versions:

```bash
node -v
npm -v
```

### 1. Clone the Repository

```bash
git clone https://github.com/soumyadeepmahato2008/Travelmate-NE.git
```

### 2. Open the Project Folder

```bash
cd Travelmate-NE
```

### 3. Configure npm Registry

The project uses the public npm registry.

The root `.npmrc` should contain:

```ini
registry=https://registry.npmjs.org/
```

This prevents npm from trying to download packages through an unavailable local registry.

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Development Server

```bash
npm run dev
```

Vite will display a local development URL in the terminal. Open that URL in your browser.

### 6. Create a Production Build

```bash
npm run build
```

The production frontend files will be generated in:

```text
dist/
```

### 7. Preview the Production Build

```bash
npm run preview
```

---

## 🚀 Deployment on Render

TravelMateNE includes a `render.yaml` configuration for deployment as a Render Static Site.

### Deployment Steps

1. Push the complete project to GitHub.
2. Sign in to your Render account.
3. Select **New → Blueprint**.
4. Connect your GitHub account if required.
5. Select the `Travelmate-NE` repository.
6. Allow Render to read the `render.yaml` configuration.
7. Start deployment.
8. Wait for the build and publish process to complete.

### Render Configuration

The included configuration uses:

| Setting | Value |
|---|---|
| Service type | Static Site |
| Runtime | Static |
| Build command | `npm install && npm run build` |
| Publish directory | `./dist` |

You can also create a Static Site manually and enter these settings.

**Important:** The static-site configuration publishes the frontend. The backend routes use the AppDeploy SDK and its database integration; they should not be assumed to run automatically as a separate backend service on Render. Any backend functionality requiring those routes needs a compatible backend deployment and configuration.

---

## 📦 Generate the Source ZIP

The project includes a script for generating a ZIP archive of the source code.

Run:

```bash
npm run export:source
```

The archive will be generated at:

```text
public/TravelMateNE-source.zip
```

The normal production build also runs the ZIP export script before building the frontend.

The export script excludes dependency folders, generated build output, Git metadata and environment files.

---

## 🔐 Security and Configuration

- Do not commit API keys, passwords, access tokens or private credentials.
- Keep secret values in environment variables or the hosting platform's secret-management settings.
- Do not upload `.env` files containing private information.
- Do not replace the public npm registry with a local-only registry in deployment configuration.
- Review backend authentication and database permissions before enabling account-based features in production.

---

## ⚠️ Important Information for Travellers

TravelMateNE is a tourism discovery and trip-planning platform. It is not a live booking engine.

- Budget estimates are approximate.
- Transport fares and accommodation prices may change.
- Permit requirements and entry restrictions may change.
- Road conditions and weather can affect travel plans.
- Festival dates may change from year to year.
- Travellers should confirm important details through official tourism departments, local authorities and authorised service providers.

Map information and map tiles require an internet connection.

---

## 🎯 Project Objective

The main objective of TravelMateNE is to encourage tourism across North East India by making regional destinations, culture and travel information easier to discover.

The platform aims to:

- Promote lesser-known tourist destinations.
- Encourage cultural exploration.
- Make travel planning more accessible.
- Help travellers organise their itineraries.
- Support better budget awareness.
- Increase awareness of regional festivals and local products.

## 🔮 Future Scope

Potential future improvements include:

- Live weather information.
- Verified hotel and transport information.
- More detailed destination guides.
- Improved route and distance planning.
- Multilingual interface support.
- Verified local tourism service listings.
- Enhanced accessibility features.
- More detailed festival and shopping information.
- Optional cloud-based itinerary synchronisation.

These are possible future enhancements, not claims that all such services are currently implemented.

---

## 👨‍💻 Project Information

**Project Name:** TravelMateNE – North East India Tourism Explorer

**Domain:** Tourism & Culture

**Project ID:** PS08

**GitHub Repository:**  
https://github.com/soumyadeepmahato2008/Travelmate-NE

**Project Category:** Tourism Discovery and Travel Planning

---

## 📄 License

No specific open-source license is currently declared in this project. Add a `LICENSE` file before distributing or reusing the source code under an open-source license.

---

**TravelMateNE – Explore More. Discover North East.** 🌄
