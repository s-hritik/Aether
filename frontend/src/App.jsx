import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import React from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'  
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx' 
import Categories from './pages/Categories.jsx'
import NewArrivals from './pages/NewArrivals.jsx'
import Profile from './pages/Profile.jsx'
import Wishlist from './pages/Wishlist.jsx'
import CheckOut from './pages/CheckOut.jsx'
import Sale from './pages/Sale.jsx'
import Cart from './components/Cart.jsx'
import ProductPage from  './pages/ProductPage.jsx'
import { AdminLayout } from './components/admin/AdminLayout.jsx';
import {AdminUsers} from './pages/admin/AdminUsers.jsx'
import { AdminProducts } from './pages/admin/AdminProducts.jsx';
import {AdminOrders} from './pages/admin/AdminOrders.jsx'
import {ProtectedRoute} from './components/ProtectedRoute.jsx'
import {AuthPage} from './pages/AuthPage.jsx'

function App() {

  return (
    <Router>
       <Toaster position="top-center" reverseOrder={false} />
       <div className='min-h-screen flex flex-col bg-emerald-50'>
          <Header/>
          <main className='flex-grow'>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/products/:id' element={<ProductPage/>}/>
                <Route path='/Shop' element={<Shop/>}/>
                <Route path='/Categories' element={<Categories/>}/>
                <Route path='/NewArrivals' element={<NewArrivals/>}/>
                <Route path='/login' element={<AuthPage />} />
                <Route path='/Profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
                <Route path='/Wishlist' element={<Wishlist/>}/>
                <Route path='/Checkout' element={<CheckOut/>}/>  
                <Route path='/Sale' element={<Sale/>}/> 
                <Route path='/Cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/admin" element=  {<ProtectedRoute><AdminLayout adminOnly={true} /></ProtectedRoute>}>
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="users" element={<AdminUsers />} />
                </Route>
            </Routes>
          </main>
          <Footer/>
       </div>     
    </Router>
  )
}

export default App
