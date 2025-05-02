import React, { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import '../src/education.css'
import { motion } from "framer-motion";
import { fetchFoodLogs } from "../services/api";
import supabase from "../client/supabase";
import { useNavigate } from "react-router-dom";

const DailyTracker = () =>{
    const [data, setData] = useState(null);

    const navigate = useNavigate();

    const fetchData = async() => {
        const {data: {session}} = supabase.auth.getSession();
        if(!session){
            return navigate('/login');
        }
        const userId = session.user.id
        const response = await fetchFoodLogs(userId)
        console.log(response)
    }

    useEffect(() =>{
        fetchData();
    }, [])
    
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