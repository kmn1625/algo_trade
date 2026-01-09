import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './style.css'
import AOS from "aos";
import "aos/dist/aos.css";
import Landing_page from './pages/Landing_page'
import Loginpage from './pages/Loginpage'
import Features from './pages/Features';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Responsive from './pages/Slick';
import Courses from './pages/Courses';
import Blogs from './pages/Blogs';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: false,     // animation happens only once per element
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing_page/>}/>
        <Route path='/sign_in' element={<Loginpage/>}/>
        <Route path='/slick' element={<Responsive/>}/>
        <Route path='/features/*' element={<Features/>}/>
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
