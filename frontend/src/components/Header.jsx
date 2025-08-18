
import { Menu ,ShoppingCart,Search ,Heart, Blinds ,ArrowLeft , User} from 'lucide-react'
import{Link ,NavLink} from 'react-router-dom'
import React , { useState } from 'react'


function Header() {
     const [Visible , setVisible] = useState(false);
     const [searchVisible , setSearchVisible] = useState(false);
  return (
    <>
      <div className='px-4 sm:px-6 lg:px-8 py-4'>
         <div className='flex items-
         center justify-between'>
            <div className='flex items-center gap-6'>
               <button
                  onClick={()=>setVisible(!Visible)}
                  className='lg:hidden text-gray-600' >
                  <Menu/>
               </button>
               <Link to={'/'} className='text-2xl font-bold text-emerald-600'><Blinds/></Link>
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
              <button onClick={()=> setSearchVisible(!searchVisible)} className='p-2 text-gray-600 hovenr:text-gray-900'>
                 <Search />
              </button>
              <Link to={'Wishlist'} className='p-2 text-gray-600 hover:text-gray-900 relative'>
                 <Heart />
              </Link>
              <Link to={'/profile'} className='p-2 text-gray-600 hover:text-gray-900'>
                 <User/>
              </Link>
              <button className='realtive p-2 text-gray-600 hover:text-gray-900'>
                <ShoppingCart size={24}/>
              </button>
            </div>
         </div>

         {/* Search Bar */}
         {/* {searchVisible && (
             <div className='mt-4'>
                <SearchBar onClick={()=>setSearchVisible(false)}/>
             </div>
         )} */}

         {/* Mobile Menu */}
            
               <div className= {`absolute top-0 right-0 bottom-0 overflow-hidden bg-emerald-50 transition-all ${Visible ? 'w-full':'w-0' }`}>
                   <div className='flex flex-col text-gray-600 '>
                      <div onClick={()=> setVisible(false)} className='flex item-center gap-4 p-3 cursor-pointer'>
                        <ArrowLeft />
                        <p>Back</p>
                      </div>
                      <NavLink onClick={()=> setVisible(false)} className={'py-2 pl-6 border'} to='/'> <p>Home</p> </NavLink>
                      <NavLink onClick={()=> setVisible(false)} className={'py-2 pl-6 border'} to='/Shop' > <p>Shop</p></NavLink>
                      <NavLink onClick={()=> setVisible(false)} className={'py-2 pl-6 border'} to='/Categories' ><p>Categories</p></NavLink>
                      <NavLink onClick={()=> setVisible(false)} className={'py-2 pl-6 border'} to='/NewArrivals' ><p>NewArrivals</p></NavLink>
                      <NavLink onClick={()=> setVisible(false)} className={'py-2 pl-6 border'} to='/Sale' ><p>Sale</p></NavLink>
                   </div>
                </div>
            
         

      </div>
    </>
          
  )
}

export default Header




    
