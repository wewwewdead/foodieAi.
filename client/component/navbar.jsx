import React, { useState, useEffect, useCallback, useRef, act } from "react";
import { useNavigate, Link } from "react-router-dom";
import foodielogo from '../src/assets/foodie.png'
import { motion } from "framer-motion";
import supabase from "../client/supabase";
import { label, path, tr } from "framer-motion/client";

const PUBLIC_URL = [
    {path: '/homepage', label: 'Home'},
    {path: '/mystory', label: 'My Story'},
    {path: '/about', label: 'About'},
    {path: '/learnabout', label: 'Education'},
];
const AUTH_URL  = [
    {path: '/homepage', label: 'Home'},
    {path: '/dailytracker', label: 'Daily Tracker'}
]

const Navbar = () =>{
    const navigate = useNavigate();
    const [activePath, setActivePath] = useState('');
    const [showSidebar, setShowSidebar] = useState(false)
    const [session, setSession] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const fetchUser = async() =>{
        setIsLoading(true)
        if(session){
            setLoggedIn(true)
        } else {
            const {data: {session}} = await supabase.auth.getSession();
            setSession(session);
        }
        setIsLoading(false)
    }

    const clickLogo = (e) => {
        e.stopPropagation();
        if(location.pathname === '/homepage'){
            window.location.reload();
        }
        return navigate('/homepage');
    }
    const handleMenuClick = (e) => {
        e.stopPropagation();
        e.preventDefault()
        setShowSidebar(!showSidebar)
    }
    const handleLogin = async(e) => {
        e.stopPropagation();
        e.preventDefault()
        if(!session){
            return navigate('/login');
        }
        await supabase.auth.signOut();
        return navigate('/login');
    }

    useEffect(() =>{
        setActivePath(location.pathname)
        
    }, [location.pathname])

    useEffect(() =>{
        fetchUser()
    }, [session])

    const navLinks = session ? AUTH_URL : PUBLIC_URL; //conditional for auth users or public users
    return(
        <>
        <div className="navbar">
            <div className="logo-container">
            <img onClick={clickLogo} className="foodie-logo"  src={foodielogo}  alt="" />
            <p onClick={clickLogo} className="foodie">Foodie AI.</p>
            </div>

            <div className={"navlinks"}>
                {navLinks.map(({path, label}) => (
                    <Link
                    key={path}
                    className={location.pathname === path ? 'active-link' : 'links'}
                    to={path}
                    >
                        {label}
                    </Link>
                ))}
            </div>

            {isLoading ? null : (
                !loggedIn ? (
                    <>
                    <button onClick={handleLogin} className='sign-up-bttn'>Join foodieAi</button>
                    <button onClick={handleLogin} className='sign-up-bttn-mobile'>Join foodieAi</button>
                    </>
                ) : (
                    <>
                     <button onClick={handleLogin} className='sign-up-bttn'>Logout</button>
                    </> 
                )
            )}
            

            <div onClick={handleMenuClick} className="menu-bttn">

                {!showSidebar ? <svg
                xmlns="http://www.w3.org/2000/svg" 
                height="24px" viewBox="0 -960 960 960" 
                width="24px" 
                fill="#000000"
                ><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                </svg> 

                : <svg
                xmlns="http://www.w3.org/2000/svg" 
                height="24px" 
                viewBox="0 -960 960 960" 
                width="24px" 
                fill="#000000"><path 
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>}
            
            </div>
            
              
        </div>
        <motion.div 
        initial={{opacity: 0, x: 100}}
        whileInView={{opacity:1, x:0}}
        transition={{duration: 0.1}}
        viewport={{once: true}}
        className={!showSidebar ? "hide" : "sidebar"}
        >
            {navLinks.map(({path, label}) => (
                <Link
                key={path}
                className={location.pathname === path ? 'active-link' : 'links'}
                to={path}
                >
                {label}
                </Link>
            ))}
        {loggedIn && (
                <button onClick={handleLogin} className='sign-up-bttn-mobile'>Logout</button>
            )}
        </motion.div>
        </>
        
    )
}
export default Navbar;