import { div } from "framer-motion/client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () =>{
    return(
        <div className="navbar">
            <img className="foodie-logo"  src="../src/assets/foodie.png"  alt="" />
            <p className="foodie">Foodie AI.</p>
        </div>
    )
}
export default Navbar;