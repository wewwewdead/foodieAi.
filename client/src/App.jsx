import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import './landingPage.css'
import FeedPage from '../component/home'
import LandingPage from '../component/landingpage'
import About from '../component/about'
import MyStory from '../component/mystory'
import Login from '../component/login'
import AboutFood from '../component/education'

function App() {


  return (
    <Routes>
        <Route path='/' element={<FeedPage/>}/>
        <Route path='/landingpage' element={<LandingPage/>}/>
        <Route path='homepage' element={<FeedPage/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='mystory' element={<MyStory/>}/>
        <Route path='learnabout' element={<AboutFood/>}/>
        <Route path='login' element={<Login/>}/>
    </Routes>
      
  )
}
export default App
