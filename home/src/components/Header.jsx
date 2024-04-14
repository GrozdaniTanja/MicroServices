import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";

const Header = ({ isLoggedIn, id }) => {
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
                </nav>
                {isLoggedIn ? (
                    <>
                        <div className="user-info">
                            <span className="user-icon">
                                <FaUser />
                            </span>
                            <span className="first-name">{id}</span>
                        </div>
                    </>
                ) : (
                    <Link to="user/login" className="user-info">
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
