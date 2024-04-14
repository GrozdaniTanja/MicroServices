import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";

const Header = ({ isLoggedIn, firstName, onLogout }) => {
    return (
        <header className="site-header">
            <div className="container">
                <h1 className="site-title">Online Market Place App</h1>
                <nav className="horizontal-nav">
                    <Link to="/">Home</Link>
                    <Link to="/product">Products</Link>
                    <Link to="/order">
                        <FaShoppingCart /> Order
                    </Link>
                    {!isLoggedIn ? (
                        <>
                            <Link to="/user/register" className="nav-link">Register</Link>
                            <Link to="/user/login" className="nav-link">Login</Link>
                        </>
                    ) : (
                        <>
                            <div className="user-info">
                                <span className="user-icon">
                                    <FaUser />
                                </span>
                                <span className="first-name">{firstName}</span>
                            </div>
                            <button onClick={onLogout} className="logout-button">Logout</button>
                        </>
                    )}
                </nav>
            </div>
        </header >
    );
};

export default Header;