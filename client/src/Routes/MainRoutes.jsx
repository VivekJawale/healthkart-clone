import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home"
import Admin from '../Pages/Admin/Admin';
import Cart from '../Pages/Cart';
import Protiens from '../Pages/Product-Pages/Protiens';
import Wishlist from '../Pages/Wishlist';
import SingleProduct from "../Pages/SingleProduct";
import Gainer from '../Pages/Product-Pages/Gainer';
import ProtienFoods from '../Pages/Product-Pages/ProtienFoods';
import PrePost from '../Pages/Product-Pages/PrePost';
import WorkoutEssential from '../Pages/Product-Pages/WorkoutEssential';
import SearchPage from '../Pages/Product-Pages/SearchPage';
const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/products/protiens' element={<Protiens />}></Route>
        <Route path='/products/gainers' element={<Gainer />}></Route>
        <Route path='/products/protienfoods' element={<ProtienFoods />}></Route>
        <Route path='/products/prepostworkout' element={<PrePost />}></Route>
        <Route path='/products/workoutessential' element={<WorkoutEssential />}></Route>
        <Route path='/products/search/:search' element={<SearchPage />}></Route>
        <Route path='/products/:id' element={<SingleProduct />}></Route>
        <Route path='/wishlist' element={<Wishlist />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>
    </div>
  )
}

export default MainRoutes
