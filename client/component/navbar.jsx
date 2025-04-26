import { div } from "framer-motion/client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import foodielogo from '../assets/foodie.png'

const Navbar = () =>{
    return(
        <div className="navbar">
            <img className="foodie-logo"  src={foodielogo}  alt="" />
            <p className="foodie">Foodie AI.</p>
        </div>
    )
}
export default Navbar;