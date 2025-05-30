import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import DailyTracker from "./component/DailyTracker";
import Layout from "./component/Layout";
import MinimalLayout from "./component/MinimalLayout";
import About from "./pages/About/About";
import Education from "./pages/Education/Education";
import HomePage from "./pages/HomePage/HomePage";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import MyStory from "./pages/MyStory/MyStory";
import ProtectedRoute from './ProtecteRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<MinimalLayout />}>
        <Route path="/" element={<Navigate to="/landingpage" replace />} />
        <Route path="/landingpage" element={<LandingPage />} />
      </Route>

      <Route element={<Layout />}>
        <Route path="/homepage" element={
        <ProtecteRoute>
          <HomePage/>
        </ProtecteRoute>} />
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
