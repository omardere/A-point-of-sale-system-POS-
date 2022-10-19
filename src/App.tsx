import React from 'react';
import './App.css';
import 'antd/dist/antd.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;