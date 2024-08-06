import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (Boolean) => {
      setIsAuthenticated(boolean);
  }

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? (<Login setAuth={setAuth} />) : (<Navigate to="/dashboard" />)}></Route>
          <Route path="/register" element={!isAuthenticated ? (<Register setAuth={setAuth} />) : (<Navigate to="/dashboard" />)}></Route>
          <Route path="/dashboard" element={isAuthenticated ? (<Dashboard setAuth={setAuth} />) : (<Navigate to="/login" />)}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
