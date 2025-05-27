import { useEffect } from "react";
import "./about.css";

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="about">
      <div className="about__title">
        <h1 className="about__title-name">Foodie Ai.</h1>
        <p className="about__title-description">
          A food analyzer tool that use multi modal AI, powerful and efficient.
        </p>
      </div>

      <div className="about__content">
        <div className="card">
          <h2>How It Works</h2>
          <div>
            <p className="text">(1) Upload a photo</p>
            <p className="text">(2) Ai analyze your photo</p>
          </div>
          <p>
            I use Google's gemini-2.5-flash-preview-04-17. An AI model that can
            generate text from image and optimized for adaptive thinking and
            reasoning
          </p>

          <p className="output">&#10003; Get instant and structured results</p>
        </div>

        <div className="card">
          <h2>Why I built this</h2>
          <p className="text">
            I believe that healthy eating should be accessible to everyone.
            FoodieAI helps users make smarter food choices with just a photo.
          </p>

          <p className="output">
            By helping users understand the nutritional value of their meals and
            make more informed food choices.
          </p>
        </div>

        <div className="card">
          <h2>
            How I built <span>foodieAi.</span>
          </h2>
          <p className="text">Built with purpose and passion.</p>
          <p className="text">
            I combine cutting edge technology (GOOGLE GEMINI) with my knowledge
            on programming to make food analysis fast and accessible.
          </p>

          <p className="output">
            Every line of code was written with one goal: to help people make
            better food choices effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
};
export default About;
