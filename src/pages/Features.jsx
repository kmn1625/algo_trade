import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Category from './features/Category'

const Features = () => {
  return (
    <div>
      <Routes>
        <Route path='/:category' element={<Category/>}/>
      </Routes>
    </div>
  )
}

export default Features
