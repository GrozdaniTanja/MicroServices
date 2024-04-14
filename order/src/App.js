import React, { useState, useEffect } from 'react';
import './App.css';
import Order from './page/order.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUser(loggedInUser);
    }
  }, []);

  return (
    <div className="OrderApp">
      <Order isLoggedIn={isLoggedIn} user={user} />
    </div>
  );
}

export default App;
