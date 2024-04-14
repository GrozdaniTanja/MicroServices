import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './page/home.jsx';

const Product = lazy(() => import('ProductApp/Product'));
const Order = lazy(() => import('OrderApp/Order'));
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      setFirstName(user);
    }
  }, []);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} firstName={firstName} />
      <React.Suspense
        fallback={<div>Loading ...</div>}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/*" element={<Product />} />
          <Route path="/order/*" element={<Order />} />
        </Routes>
      </React.Suspense>
      <Footer />
    </div>
  );
}

export default App;
