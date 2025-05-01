import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom'
import routes from './routes'
import { AuthProvider } from './context/AuthContext'
import { HandleProvider } from './context/HandleContext'
const AppRoutes = () => {
  const routeElements = useRoutes(routes);
  return routeElements;
};

function App() {
  return (
    <AuthProvider>
      <HandleProvider>
        <Router>
          <AppRoutes />
        </Router>
      </HandleProvider>
    </AuthProvider>
  )
}

export default App
