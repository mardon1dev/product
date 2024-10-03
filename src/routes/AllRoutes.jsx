import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SingleProduct from '../pages/SingleProduct'
import Home from '../pages/Home'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<SingleProduct />} />
    </Routes>
  )
}

export default AllRoutes