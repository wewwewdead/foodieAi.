import React, { useState, useEffect, useCallback, useRef, act } from "react";
import { useNavigate, Link } from "react-router-dom";
import foodielogo from '../src/assets/foodie.png'
import { path } from "framer-motion/client";
import { easeInOut, motion } from "framer-motion";

const Navbar = () =>{
    const navigate = useNavigate();
    const [activePath, setActivePath] = useState('');
    const [showSidebar, setShowSidebar] = useState(false)

    const clickLogo = (e) => {
        e.stopPropagation();
        if(location.pathname === '/homepage'){
            window.location.reload();
        }
        return navigate('/homepage');
    }
    const handleMenuClick = (e) => {
        e.stopPropagation();
        setShowSidebar(!showSidebar)
    }

    useEffect(() =>{
        setActivePath(location.pathname)
    }, [location.pathname])

    return(
        <>
        <div className="navbar">
            <div className="logo-container">
            <img onClick={clickLogo} className="foodie-logo"  src={foodielogo}  alt="" />
            <p onClick={clickLogo} className="foodie">Foodie AI.</p>
            </div>
            <div onClick={handleMenuClick} className="menu-bttn">
                {!showSidebar ? <motion.svg
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.2}}
                whiletap={{ scale: 0.9, transition: { type: 'spring', stiffness: 300, damping: 20 } }} 
                xmlns="http://www.w3.org/2000/svg" 
                height="24px" viewBox="0 -960 960 960" 
                width="24px" 
                fill="#000000"
                ><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                </motion.svg> 

                : <svg
                xmlns="http://www.w3.org/2000/svg" 
                height="24px" 
                viewBox="0 -960 960 960" 
                width="24px" 
                fill="#000000"><path 
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>}
            
            </div>
            <div className={"navlinks"}>
                <Link className ={`${activePath === '/homepage' ? 'active-link' : 'links'}`} to='/homepage'>Home</Link>
                <Link className={`${activePath === '/mystory' ? 'active-link' : 'links'}`} to='/mystory'>My story</Link>
                <Link className={`${activePath === '/about' ? 'active-link' : 'links'}`} to='/about'>About</Link>
                <Link className={`${activePath === '/learnabout' ? 'active-link' : 'links'}`} to='/learnabout'>Education</Link>
            </div>
              
        </div>
        <motion.div 
        initial={{opacity: 0, x: 100}}
        whileInView={{opacity:1, x:0}}
        transition={{duration: 0.1}}
        className={!showSidebar ? "hide" : "sidebar"}
        >
        <Link className={`${activePath === '/homepage' ? 'active-link' : 'links'}`} to='/homepage'>Home</Link>
        <Link className={`${activePath === '/mystory' ? 'active-link' : 'links'}`} to='/mystory'>My story</Link>
        <Link className={`${activePath === '/about' ? 'active-link' : 'links'}`} to='/about'>About</Link>
        <Link className={`${activePath === '/learnabout' ? 'active-link' : 'links'}`} to='/learnabout'>Education</Link>
        </motion.div>
        </>
        
    )
}
export default Navbar;