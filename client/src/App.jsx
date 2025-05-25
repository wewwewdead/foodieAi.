// import { Routes, Route, BrowserRouter} from 'react-router-dom'
import { Route, Routes } from "react-router-dom";

import "./App.css";
import About from "./component/About";
import DailyTracker from "./component/DailyTracker";
import Education from "./component/Education-temp";
import Home from "./component/Home";
import LandingPage from "./component/LandingPage";
import Login from "./component/Login";
import MyStory from "./component/MyStory";
import "./landingPage.css";

function App() {
  return (
    <Routes>
      <Route path="/landingpage" element={<LandingPage />} />
      <Route path="/" element={<Home />} />
      <Route path="homepage" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="mystory" element={<MyStory />} />
      <Route path="learnabout" element={<Education />} />
      <Route path="login" element={<Login />} />
      <Route path="dailytracker" element={<DailyTracker />} />
    </Routes>
  );
}

export default App;

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       <Route index element={<LandingPage />}></Route>
//     </Route>
//   )
// );

// export default function App() {
//   return <RouterProvider router={router} />;
// }
