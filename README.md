# SolveIQ

A modern web application for tracking and visualizing competitive programming progress across multiple platforms including CodeForces, LeetCode, and CodeChef.

## Features

- **Multi-Platform Integration:** Track your performance across CodeForces, LeetCode, and CodeChef in one unified dashboard
- **Problem Visualization:** View problems solved by difficulty and tags with intuitive charts
- **Activity Tracking:** Monitor your coding activity with interactive heatmaps
- **Rating History:** Visualize your rating progression over time with detailed graphs
- **Personalized Recommendations:** Get AI-powered question suggestions based on your skill level
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
- AI-powered question recommendations

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
- **AI Features:** Powered by DeepSeek AI for personalized problem recommendations

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/solveiq.git
   cd solveiq
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
      - `/SQ` - SuggestedQuestions components
    - `App.jsx` - Main application component
    - `routes.jsx` - Application routing configuration

## User Settings

You can configure your platform usernames in the Settings page:
1. Navigate to the Settings page
2. Enter your usernames for LeetCode, CodeForces, and CodeChef
3. Save your changes
4. Your profiles will be automatically loaded across the application

## Setting up Environment Variables

For security reasons, API keys and other sensitive information are stored in environment variables.

### Setup

1. Create a `.env` file in the `client/` directory
2. Add your API keys following the format in `.env.example`
3. Make sure `.env` is in your `.gitignore` file

Example:
```
VITE_DEEPSEEK_API_KEY=your_api_key_here
```

## Features in Detail

### Suggested Questions
The Suggested Questions feature uses DeepSeek AI to analyze your LeetCode skills and recommend problems tailored to your strengths and weaknesses. The system:
- Analyzes your solved problems by topic
- Identifies areas for improvement
- Generates balanced recommendations across difficulty levels
- Allows filtering by difficulty and topics

### Coding Activity Tracking
SolveIQ provides comprehensive activity tracking across all platforms, helping you:
- Visualize your coding consistency
- Identify peak productivity periods
- Track your growth over time

## Future Roadmap

- Contest reminders and scheduling
- SDE Sheet tracking and progress
- User authentication and profile management
- Problem recommendation refinements with machine learning

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Important Note
Never commit your `.env` file to Git. The `.env.example` file is provided as a template without actual values.
