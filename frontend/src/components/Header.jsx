import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="homepage-header">
      <div className="homepage-logo">Finance Tracker</div>
      <nav className="homepage-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link> 
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;