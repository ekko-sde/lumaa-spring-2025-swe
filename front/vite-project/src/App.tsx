// src/App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Tasks from "./components/Tasks";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <Router>
      <nav>
        {isAuthenticated ? <button onClick={handleLogout}>log out</button> : null}
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={isAuthenticated ? <Tasks /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/tasks" />} />
      </Routes>
    </Router>
  );
};

export default App;
