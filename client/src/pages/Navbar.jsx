import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <React.Fragment>
            <li className="nav-item">
                <NavLink to="/" className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/about" className="nav-link">About</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/contact" className="nav-link">Contact</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/logout" className="nav-link">Logout</NavLink>
            </li>
            <li className="nav-item"> {/* Need to move later */}
                <NavLink to="/register" className="nav-link">Register</NavLink>
            </li>
        </React.Fragment>
    );
};




