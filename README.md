# Election Assistant

An interactive assistant that helps users understand the election process, timelines, and steps in an easy-to-follow way.

## Features
- **Step-by-Step Guide**: Interactive stepper UI explaining registration, verification, and voting.
- **Timeline**: Visual chronological timeline of election phases.
- **FAQs**: Expandable accordion list of frequently asked questions.

## How to Run the Application

This is a monorepo containing a React (Vite) frontend and an Express (Node.js) backend.

### Prerequisites
- Node.js (v18+ recommended)
- NPM

### 1. Installation
Run the following command at the root of the project to install all dependencies for both the frontend and backend:
```bash
npm run install:all
```

### 2. Environment Variables
Copy the `.env.example` templates to `.env` in both folders:
- `backend/.env` (Requires PORT and NODE_ENV)
- `frontend/.env` (Requires VITE_API_BASE_URL)

### 3. Start Development Servers
Run the following command at the root to concurrently start the backend API and the Vite frontend with Hot Module Replacement (HMR):
```bash
npm run dev
```
- Frontend will be available at `http://localhost:5173`
- Backend API will be available at `http://localhost:5000/api`

### 4. Build for Production
To build the optimized frontend and serve it securely via the Express backend:
1. Build the frontend assets:
   ```bash
   npm run build
   ```
2. Start the backend in production mode:
   ```bash
   npm start
   ```
   The full application will now be served seamlessly from `http://localhost:5000`.
