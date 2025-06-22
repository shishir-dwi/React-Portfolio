import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/react.svg';
// import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;