import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import './landingPage.css'
import HomePage from '../component/home'
import LandingPage from '../component/landingpage'
import About from '../component/about'
import MyStory from '../component/mystory'
import Login from '../component/login'
import AboutFood from '../component/education'
import DailyTracker from '../component/dailytracker'

function App() {


  return (
    <Routes>
        <Route path='/landingpage' element={<LandingPage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='homepage' element={<HomePage/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='mystory' element={<MyStory/>}/>
        <Route path='learnabout' element={<AboutFood/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='dailytracker' element={<DailyTracker/>}/>
    </Routes>
      
  )
}
export default App
