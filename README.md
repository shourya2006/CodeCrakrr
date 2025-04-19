# CodeCracker

A modern web application for tracking and visualizing competitive programming progress across multiple platforms including CodeForces, LeetCode, and CodeChef.

## Features

- **CodeForces Integration:** Track your CodeForces performance, submissions, and contest history
- **Problem Visualization:** View problems solved by difficulty and tags
- **Activity Tracking:** See your coding activity with an interactive heatmap
- **Rating History:** Visualize your rating progression over time
- **Clean UI:** Modern, responsive interface built with React and Tailwind CSS

## Tech Stack

- **Frontend:** React, React Router DOM
- **Styling:** Tailwind CSS
- **Data Visualization:** Custom-built visualization components
- **API Integration:** Direct integration with competitive programming platforms

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
    - `App.jsx` - Main application component
    - `routes.jsx` - Application routing configuration

## Roadmap

- LeetCode profile integration
- CodeChef profile integration
- SDE Sheet tracking
- Daily coding challenge suggestions
- User authentication and profile management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 