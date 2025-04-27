import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import foodielogo from '../src/assets/foodie.png'
import { path } from "framer-motion/client";

const Navbar = () =>{
    const navigate = useNavigate();

    const clickLogo = (e) => {
        e.stopPropagation();
        if(location.pathname === '/homepage'){
            window.location.reload();
        }
        return navigate('/homepage');
    }
    return(
        <div className="navbar">
            <div className="logo-container">
            <img onClick={clickLogo} className="foodie-logo"  src={foodielogo}  alt="" />
            <p onClick={clickLogo} className="foodie">Foodie AI.</p>
            </div>
            <div className="navlinks">
                <Link className="links" to='/mystory'>My story</Link>
                <Link className="links" to='/about'>About</Link>
            </div>
              
        </div>
    )
}
export default Navbar;