import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom'
import routes from './routes'
import { AuthProvider } from './context/AuthContext'

const AppRoutes = () => {
  const routeElements = useRoutes(routes);
  return routeElements;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
