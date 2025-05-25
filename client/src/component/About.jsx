import { useEffect } from "react";
import "../about.css";
import Footer from "./Footer";
import Navbar from "./NavBar";

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Navbar />
      <div className="parent-container">
        <div className="app-container">
          <div className="app-body-container">
            <div className="title-container">
              <h1>Foodie Ai.</h1>
              <p>
                A food analyzer that use multi modal Ai, powerful and efficient.
              </p>
            </div>
            <div className="content-container">
              <div className="cards">
                <h2>How It Works (Simple)</h2>
                <p className="text">
                  Upload a photo{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -1200 960 960"
                    width="20px"
                    fill="#000000"
                  >
                    <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                  </svg>
                </p>
                <p className="text">
                  Ai analyze your photo{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -1200 960 960"
                    width="20px"
                    fill="#000000"
                  >
                    <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                  </svg>
                </p>
                <p className="text">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -1020 960 960"
                    width="16px"
                    fill="#000000"
                  >
                    <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z" />
                  </svg>{" "}
                  Get instant and structured results
                </p>
                <br />
                <p className="text">
                  I use Google's gemini-2.5-flash-preview-04-17.
                </p>
                <p className="text">
                  It is optimized for adaptive thinking and reasoning. It is
                  multi modal that can generate text from image.{" "}
                </p>
              </div>
              <div className="cards">
                <h2>Why I built this</h2>
                <p className="text">
                  I believe that healthy eating should be accessible to
                  everyone. FoodieAI helps users make smarter food choices with
                  just a photo.
                </p>
                <h2>It promotes healthy eating</h2>
                <p className="text">
                  By helping users understand the nutritional value of their
                  meals and make more informed food choices."
                </p>
              </div>
              <div className="cards">
                <h2>
                  How I built <span>foodieAi.</span>
                </h2>
                <p className="text">
                  "foodiAi" was built with purpose and passion.
                </p>
                <p className="text">
                  I combine cutting edge technology (GOOGLE GEMINI) with my
                  knowledge on programming to make food analysis fast and
                  accessible.
                </p>
                <p className="highlights">
                  Every line of code was written with one goal: to help people
                  make better food choices effortlessly."
                </p>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
