import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'  
import Home from './pages/Home'
import Shop from './pages/Shop' 
import Categories from './pages/Categories'
import NewArrivals from './pages/NewArrivals'
import Search from './pages/Search'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Wishlist from './pages/Wishlist'
import CheckOut from './pages/CheckOut'
import Sale from './pages/Sale'
import Cart from './components/cart'

function App() {
  return (
    <Router>
       <div className='min-h-screen flex flex-col bg-emerald-50'>
        <Header/>
        <main>
          <Routes>
             {/* public routes */}
               <Route path='/' element={<Home/>}/>
               <Route path='/Shop' element={<Shop/>}/>
               <Route path='/Categories' element={<Categories/>}/>
               <Route path='/NewArrivals' element={<NewArrivals/>}/>
               <Route path='/Search' element={<Search/>}/>
               <Route path='/SignIn' element={<SignIn/>}/>  
               <Route path='/SignUp' element={<SignUp/>}/>
              {/* protected routes */}
               <Route path='/Profile' element={<Profile/>}/>
               <Route path='/wishlist' element={<Wishlist/>}/>
               <Route path='/checkout' element={<CheckOut/>}/>  
               <Route path='/Sale' element={<Sale/>}/>  
          </Routes>
        </main>
        <Footer/>
        <Cart/>

       </div>
    </Router>
  )
}

export default App
