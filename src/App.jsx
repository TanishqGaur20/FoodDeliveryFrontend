import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Signup from './Components/Registration/Signup'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Registration/Login'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import AdminOrders from './Components/Admin/AdminOrders'
import OrderStatus from './Components/OrderStatus/OrderStatus'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'
import AddItem from './Components/Admin/AddItem'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/adminOrders' element={<AdminOrders />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/OrderStatus' element={<OrderStatus />} />
        <Route path='/addItem' element={<AddItem />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App