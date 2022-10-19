import React from 'react';
import './App.css';
import 'antd/dist/antd.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import Categories from './pages/categores/Categories';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/Categories" element={<Categories />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;