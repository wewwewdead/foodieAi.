import React, { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import '../src/education.css'
import { motion } from "framer-motion";

const DailyTracker = () =>{
    return (
        <>
        <Navbar/>
        <div className="parent-container">
            <div className="app-container">
                <div className="app-body-container">
                    <p>Hi!!!</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default DailyTracker;