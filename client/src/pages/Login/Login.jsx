import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../client/supabase";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  const fetchUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setSession(session);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetchUser();

    if (session) {
      navigate("/homepage");
    }
  }, [navigate, session]);

  // const handleHome = (e) => {
  //   e.stopPropagation();
  //   navigate("/homepage");
  // };

  return (
    <div className="login">
      <div className="member__benefits">
        {/* <div onClick={handleHome} className="back-home">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
          Home
        </div> */}

        <div className="member__title">
          <h1 className="member__title-name">Become a member now!</h1>

          <motion.div
            animate={{
              y: [0, -8, 0, -4, 1, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              },
            }}
          >
            <p className="free">for free!</p>
          </motion.div>
        </div>

        <div className="signin">
          <div style={{ width: "50%" }}>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={["google"]}
              onlyThirdPartyProviders
            />
          </div>
        </div>

        <div className="benefits__content">
          <div className="card">
            <h2>Daily tracker:</h2>
            <p>track your</p>
            <ul>
              <li style={{ textAlign: "left" }}>calories</li>
              <li style={{ textAlign: "left" }}>sugar</li>
              <li style={{ textAlign: "left" }}>carbs</li>
            </ul>
            <p className="highlights">
              Save your food and track it{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -1060 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            </p>
            <p className="highlights">
              Personalized profile{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -1060 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            </p>
          </div>

          <div className="card">
            <h2>Health goals</h2>
            <p className="highlights">Set a goal(example options):</p>
            <p>"Lose weight"</p>
            <p>"Control sugar"</p>
            <p>"Build muscle"</p>
            <p className="highlights">When Ai analyze your food:</p>
            <p>
              It will show{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -1160 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>{" "}
              badge if it fits your goal.
            </p>
            <p>
              Warn{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -1060 960 960"
                width="20px"
                fill="#000000"
              >
                <path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114 56 56Zm-2 110h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
              </svg>{" "}
              if the food is risky (e.g., "too much sugar for diabetic goal").
            </p>
          </div>

          <div className="card">
            <h2>Save scanned food:</h2>
            <p className="highlights">After analysis:</p>
            <p>Save food in your profile and it resets daily.</p>
            <p className="highlights">See all food you scan today:</p>
            <ul>
              <li>Food name</li>
              <li>Calories</li>
              <li>Carbs</li>
              <li>Sugar</li>
            </ul>
            <p>
              Sum totals for today's food [your total calories], [your total
              sugar] and [your total carbs].
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
