import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import './landingPage.css'
import FeedPage from '../component/home'
import LandingPage from '../component/landingpage'
import About from '../component/about'
import MyStory from '../component/mystory'

function App() {


  return (
    <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='homepage' element={<FeedPage/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='mystory' element={<MyStory/>}/>
    </Routes>
      
  )
}
export default App
