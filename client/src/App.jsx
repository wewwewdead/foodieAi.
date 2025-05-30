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
import About from "./pages/About/About";
import Education from "./pages/Education/Education";
import HomePage from "./pages/HomePage/HomePage";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import MyStory from "./pages/MyStory/MyStory";
import {useAuth} from './AuthProvider';

function App() {
  const {user, loading: authLoading} = useAuth();

  if(authLoading){
    return(
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
        Loading Application...
      </div>
    )
  }
  return(
    <>
      {user ? <NavbarLogin/> : <Navbar/>}
    </>
  )

      <Route element={<Layout />}>
        <Route path="/homepage" element={<HomePage/>} />
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
