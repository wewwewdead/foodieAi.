// import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import foodielogo from "../assets/foodie.png";
import Footer from "./Footer";

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.stopPropagation();
    navigate("/homepage");
  };
  return (
    <div className="container">
      <div className="landing-container">
        <div className="logo-container">
          <motion.img
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="foodie-logo"
            src={foodielogo}
            alt=""
          />
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="foodie"
          >
            Foodie
          </motion.p>
        </div>
        <div className="slogan">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Your food is your medicine,{" "}
            <span>know your nutrients and learn what's in your food!</span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Curious about your meal? Foodie uses a little AI magic to break down
            what you're eating.
          </motion.h2>
        </div>

        <div>
          <motion.button
            className="shiny-button"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 0.9 }}
            onClick={handleClick}
          >
            <motion.span
              className="shine"
              style={{
                position: "absolute",
                top: 0,
                left: "-50%",
                width: "150%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.54), transparent)",
                transform: "skewX(-25deg)",
              }}
              animate={{ left: "150%" }}
              transition={{
                type: "tween",
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            Try for FREE
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="sub-header"
        >
          <h1>Imagine having a technology </h1>
          <h2>who analyze your food instantly with accuracy</h2>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
