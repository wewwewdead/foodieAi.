import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import '../src/mystory.css'
import { motion } from "framer-motion";
import MyProfile from '../src/assets/profileFb.jpg'
import Ig from '../src/assets/Instagram_Glyph_Gradient.png'
import Fb from '../src/assets/Facebook_Logo_Primary.png'
import Twitter from '../src/assets/logo-black.png'

const MyStory = () =>{
    useEffect(()=>{
        window.scrollTo({top:0, left:0, behavior: 'smooth'})
    }, [])
    return(
        <>
        <Navbar/>
        <div className="parent-container">
            <div className="app-container">
                <div className="app-body-container">
                    <div className="content-container-myprofile">
                        <div className="my-story">
                            <div className="my-profile">
                                <img  loading="lazy" className="my-profile-img" src={MyProfile} alt="profile pic of the founder" />
                                <div className="my-socmed-links">
                                    <Link to={'https://www.instagram.com/johnmathewloren/'}>
                                    <motion.img
                                    loading="lazy"
                                    whileHover={{scale:1.5}}
                                    className="socmed-icons" 
                                    src={Ig} 
                                    alt="instagram link" 
                                    />
                                    
                                    </Link>
                                    <Link to={'https://www.facebook.com/johnmathew.loren/'}>
                                    <motion.img 
                                    loading="lazy"
                                    whileHover={{scale:1.5}}
                                    className="socmed-icons" 
                                    src={Fb} 
                                    alt="facebook link" 
                                    />
                                    </Link>

                                    <Link to={'https://x.com/LorenJohnmathew'}>
                                    <motion.img 
                                    loading="lazy"
                                    whileHover={{scale:1.5}}
                                    className="socmed-icons" 
                                    src={Twitter} 
                                    alt="twitter link" 
                                    />
                                    </Link>
                                    
                                </div>
                            </div>
                            <div className="my-story-content-container">
                                <div className="my-story-title">
                                    <h2>Hi! it's Loren</h2>
                                    <p>(founder of foodieAI.)</p>     
                                </div>
                                <div className="my-story-content">
                                        <p style={{fontStyle: 'italic'}}>"It all started when I went grocery shopping one day.
                                        I was standing in the bread aisle, wondering: <span>"Can this bread cause diabetes?"</span>
                                        </p>
                                        <br />
                                        <p>I was curious to the point that I grab my phone and ask <span>chatGPT</span> to analyze the bread for me.</p>
                                        <p>The results were helpful, but it made me think: hmmh? <span>"What if I could hack this process and build something that more accessible and easy?</span></p>
                                        <br />
                                        <p>Using my little programming skills, I decided to build a Ai assistant where I could simply upload or capture any food,
                                            and immediately get well structured, and easy to read informations.
                                        </p>
                                        <br />
                                        <span>And that's how FoodieAi. was born!</span>
                                        <p>An app that can turn a simple food image into instant food knowledge.</p>
                                        <br />
                                        <span>Today, it's not just for me. It's for everyone who wants to make smarter, healthier food choices using a cutting edge technology!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                <Footer/>
                </div>        
            </div>
        </div>
        </>
    )
}
export default MyStory;