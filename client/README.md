# SolveIQ Frontend

This directory contains the React-based frontend for SolveIQ, a comprehensive competitive programming progress tracker.

## Stack

- **React 18** with modern hooks for state management
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling
- **React Router** for navigation
- **OpenRouter API** for AI integration with DeepSeek

## Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

2. Create a `.env` file with your API keys:
   ```bash
   VITE_DEEPSEEK_API_KEY=your_api_key_here
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Component Structure

- `App.jsx` - The application container
- `/components` - All React components
  - Platform-specific components in `/codeforces`, `/leetcode`, and `/codechef`
  - `SuggestedQuestions.jsx` - AI-powered question recommendations
  - `Settings.jsx` - User profile configuration
  - `HeaderBar.jsx`, `Sidebar.jsx` - Common UI elements

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

## Features

- Real-time platform data fetching
- Interactive charts and visualizations
- AI-powered question recommendations
- Local storage-based preferences
- Responsive design for all screen sizes
