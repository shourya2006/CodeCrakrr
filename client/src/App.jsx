import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom'
import routes from './routes'


const AppRoutes = () => {
  const routeElements = useRoutes(routes);
  return routeElements;
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
