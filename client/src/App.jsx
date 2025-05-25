import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./component/About";
import DailyTracker from "./component/DailyTracker";
import Education from "./component/Education";
import Home from "./component/Home";
import LandingPage from "./component/LandingPage";
import Login from "./component/Login";
import MyStory from "./component/MyStory";
import "./landingPage.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="homepage" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="mystory" element={<MyStory />} />
      <Route path="education" element={<Education />} />
      <Route path="login" element={<Login />} />
      <Route path="dailytracker" element={<DailyTracker />} />
    </Routes>
  );
}
export default App;
