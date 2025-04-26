import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import './landingPage.css'
import FeedPage from '../component/home'
import LandingPage from '../component/landingpage'

function App() {


  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='homepage' element={<FeedPage/>}/>
      </Routes>
    </BrowserRouter>
      
  )
}
export default App
