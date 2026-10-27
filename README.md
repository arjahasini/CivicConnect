# Citizen–Politician Communication Platform (demo rebuild)

A responsive React demo for citizens to submit local issues, view community announcements, and track request statuses.

## Run
1. Install Node.js (LTS).
2. Open a terminal in this folder.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL printed by Vite.

## Features
- Issue submission form with basic required-field validation
- Request list with status filter
- Demo status cycle action (Submitted → In Progress → Resolved)
- Announcements panel
- `localStorage` persistence in the same browser

## Limitations
This is a frontend-only practice MVP; it has no authentication, real politician/admin accounts, server API, or shared database. Data stays in the current browser. Do not describe these features as production-ready.
