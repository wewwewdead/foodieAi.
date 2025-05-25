import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import About from "./component/About";
import DailyTracker from "./component/DailyTracker";
import Education from "./component/Education";
import HomePage from "./component/HomePage";
import LandingPage from "./component/LandingPage";
import Layout from "./component/Layout";
import Login from "./component/Login";
import MinimalLayout from "./component/MinimalLayout";
import MyStory from "./component/MyStory";

import "./landingPage.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Routes without Navbar and Footer */}
      <Route element={<MinimalLayout />}>
        <Route path="/" element={<Navigate to="/landingpage" replace />} />
        <Route path="/landingpage" element={<LandingPage />} />
      </Route>

      {/* Routes with Navbar and Footer */}
      <Route element={<Layout />}>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/mystory" element={<MyStory />} />
        <Route path="/education" element={<Education />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dailytracker" element={<DailyTracker />} />
      </Route>
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
