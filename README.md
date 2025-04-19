# CodeCracker

A modern web application for tracking and visualizing competitive programming progress across multiple platforms including CodeForces, LeetCode, and CodeChef.

## Features

- **Multi-Platform Integration:** Track your performance across CodeForces, LeetCode, and CodeChef in one dashboard
- **Problem Visualization:** View problems solved by difficulty and tags
- **Activity Tracking:** See your coding activity with interactive heatmaps
- **Rating History:** Visualize your rating progression over time
- **Clean UI:** Modern, responsive interface built with React and Tailwind CSS

## Platforms Supported

### CodeForces
- User profile statistics and rating
- Problems solved by difficulty and tags
- Recent contest performance
- Activity heatmap visualization
- Rating graph over time

### LeetCode
- Problem solving statistics by difficulty
- Activity heatmap visualization
- Recent submissions history
- Maximum streak tracking
- Global ranking

### CodeChef
- User rating and profile information
- Contest participation history
- Rating progression visualization
- Activity heatmap

## Tech Stack

- **Frontend:** React, React Router DOM
- **Styling:** Tailwind CSS, Font Awesome icons
- **Data Visualization:** Custom-built visualization components
- **API Integration:** Integration with competitive programming platform APIs

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/codecracker.git
   cd codecracker
   ```

2. Install dependencies
   ```bash
   # Navigate to the client directory
   cd client
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

- `/client` - Frontend React application
  - `/src` - Source code
    - `/components` - React components
      - `/codeforces` - CodeForces-specific components
      - `/leetcode` - LeetCode-specific components
      - `/codechef` - CodeChef-specific components
    - `App.jsx` - Main application component
    - `routes.jsx` - Application routing configuration

## Customization

To change the usernames for each platform, modify the following files:
- CodeForces: Update the username variable in `client/src/components/CodeForces.jsx`
- LeetCode: Update the username variable in `client/src/components/LeetCode.jsx`
- CodeChef: Update the username variable in `client/src/components/CodeChef.jsx`

## Future Roadmap

- User authentication and profile management
- SDE Sheet tracking and progress
- Daily coding challenge suggestions
- Unified search across platforms
- Problem recommendation engine based on skill level

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
