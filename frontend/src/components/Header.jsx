import React , { useState } from 'react'
import{Link ,NavLink , useNavigate} from 'react-router-dom'
import { Menu ,ShoppingCart,Search ,Heart, LogOut, LogIn,  Shield , User ,UserPen} from 'lucide-react'
import { SearchBar } from './SearchBar.jsx'
import {useAuth} from '../context/AuthContext.jsx'
import {useCart} from '../context/CartContext.jsx'


function Header() {

     const [Visible , setVisible] = useState(false);
     const [isSearchVisible, setIsSearchVisible] = useState(false);
     const [isProfileOpen , setIsProfileOpen] = useState(false);

     const{user ,signOut} = useAuth();
     const navigate = useNavigate();

     const { cartItems } = useCart();
     const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  

     const handleSignOut = async() => {
      try{
         await signOut();
         setIsProfileOpen(false);
         navigate('/login');
      }
      catch(err){
         console.log('Error signing out', err)
      }
     };


  return (
    <header className="relative shadow-md z-20" >
      <div className='px-4  sm:px-6 lg:px-8 py-4'>
         <div className='flex items-
         center justify-between'>
            <div className='flex items-center gap-6'>
               <button
                  onClick={()=>setVisible(!Visible)}
                  className='lg:hidden text-gray-600' >
                  <Menu/>
               </button>
               <Link to={'/'} className='text-2xl font-bold text-emerald-700'>Aether</Link>
               <nav className='hidden lg:flex items-center gap-6'>
                 <NavLink to={'/'} className='text-gray-600 hover:text-gray-900'>
                    <p>Home</p>
                    <hr className='w-full border-none h-[1.5px] bg-gray-900 hidden'/>
                 </NavLink>
                 <NavLink to={'/Shop'} className='text-gray-600 hover:text-gray-900'>
                    <p>Shop</p>
                    <hr className='w-full border-none h-[1.5px] bg-gray-900 hidden' />
                 </NavLink>
                 <NavLink to={'/Categories'} className='text-gray-600 hover:text-gray-900'>
                    <p>Categories</p>
                    <hr className='w-full border-none h-[1.5px] bg-gray-900 hidden' />
                  </NavLink>
                 <NavLink to={'/NewArrivals'} className='text-gray-600 hover:text-gray-900'>
                    <p>New Arrivals</p>
                    <hr className='w-full border-none h-[1.5px] bg-gray-900 hidden' />
                  </NavLink>
                 <NavLink to={'/Sale'} className='text-gray-600 hover:text-gray-900'>
                    <p>Sale</p>
                    <hr className='w-full border-none h-[1.5px] bg-gray-900 hidden' />
                 </NavLink>
               </nav>
            </div>

            <div className='flex items-center gap-4'>
              <button 
                  onClick={() => setIsSearchVisible(!isSearchVisible)} 
                  className='p-2 text-gray-600 hover:text-gray-900'>
                 <Search />
              </button>

            {user? (
               <>
                  <Link to={'Wishlist'} className='p-2 text-gray-600 hover:text-gray-900 relative'>
                     <Heart />
                  </Link>

                  <div className='relative'>
                     <button onClick={() => setIsProfileOpen(!isProfileOpen)} className='p-2 text-gray-600 hover:text-gray-900'>
                        <User/>
                     </button>
                     {isProfileOpen && (
                        <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5'
                        onClick={() => setIsProfileOpen(false)}>
                           <Link to={'/Profile'} className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            onClick={() => setIsProfileOpen(false)}>
                              <UserPen size={16}/> My Profile 
                           </Link>
                           {user?.role === 'admin' && (
                              <Link
                                  to="/admin/products"
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => setIsProfileOpen(false)} >
                                    <Shield size={16} /> Admin Profile
                              </Link>
                           )}
                           <div className='border-t my-1'></div>
                              <button onClick={handleSignOut}
                              className='w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                 <LogOut size={16}/> Sign Out
                              </button>
                          </div>
                     )}
                  </div>
                 
               </>
            ) : (
               <>
                  <Link to={'/login'} className='p-2 text-gray-600 hover:text-gray-900'>
                     <LogIn/>
                  </Link>
               </>
            )}

   
            <Link to="/Cart" className='relative p-2 text-gray-600 hover:text-gray-900'>
               <ShoppingCart size={24} />
               {totalItems > 0 && (
                  <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center">
                      {totalItems}
                  </span>
               )}
            </Link>
       
            </div>
         </div>

         {/* Search Bar */}
          {isSearchVisible && (
            <div className="mt-4">
              <SearchBar onClose={() => setIsSearchVisible(false)} />
            </div>
          )}

           {/* Mobile View */}
             {Visible && ( 
                <nav className="lg:hidden mt-4 border-t pt-4"> 
                   <div className="flex flex-col gap-4"> 
                       <Link to="/" className="py-0.5 pl-2 rounded-xl text-gray-600 hover:bg-emerald-600 hover:text-white">Home</Link> 
                       <Link to="/Shop" className="py-0.5 pl-2 rounded-xl text-gray-600 hover:bg-emerald-600 hover:text-white">Shop</Link> 
                       <Link to="/Categories" className="py-0.5 pl-2 rounded-xl text-gray-600 hover:bg-emerald-600 hover:text-white">Categories</Link> 
                       <Link to="/NewArrivals" className="py-0.5 pl-2 rounded-xl text-gray-600 hover:bg-emerald-600 hover:text-white">New Arrivals</Link> 
                       <Link to="/Sale" className="py-0.5 pl-2 rounded-xl text-gray-600 hover:bg-emerald-600 hover:text-white">Sale</Link> 
                   </div> 
                </nav> 
              )}
                
      </div> 
       <hr className=" border-gray-300" />       
    </header> 
  )
}

export default Header




    
