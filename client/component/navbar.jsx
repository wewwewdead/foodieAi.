import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import foodielogo from '../src/assets/foodie.png'
import { path } from "framer-motion/client";

const Navbar = () =>{
    const navigate = useNavigate();
    const [activePath, setActivePath] = useState('');

    const clickLogo = (e) => {
        e.stopPropagation();
        if(location.pathname === '/homepage'){
            window.location.reload();
        }
        return navigate('/homepage');
    }

    useEffect(() =>{
        setActivePath(location.pathname)
    }, [location.pathname])

    return(
        <div className="navbar">
            <div className="logo-container">
            <img onClick={clickLogo} className="foodie-logo"  src={foodielogo}  alt="" />
            <p onClick={clickLogo} className="foodie">Foodie AI.</p>
            </div>
            <div className="navlinks">
                <Link className={`${activePath === '/mystory' ? 'active-link' : 'links'}`} to='/mystory'>My story</Link>
                <Link className={`${activePath === '/about' ? 'active-link' : 'links'}`} to='/about'>About</Link>
            </div>
              
        </div>
    )
}
export default Navbar;