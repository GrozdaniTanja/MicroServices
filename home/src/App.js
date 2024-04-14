import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './page/home.jsx';

const Product = lazy(() => import('ProductApp/Product'));
const Order = lazy(() => import('OrderApp/Order'));
const User = lazy(() => import('UserApp/User'));
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setFirstName(parsedUser.firstname);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setFirstName('');
  };

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} firstName={firstName} />
      <React.Suspense
        fallback={<div>Loading ...</div>}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/*" element={<Product />} />
          <Route path="/order/*" element={<Order isLoggedIn={isLoggedIn} user={user} />} />
          <Route path="/user/*" element={<User onLogout={handleLogout} />} />
        </Routes>
      </React.Suspense>
      <Footer />
    </div>
  );
}

export default App;
