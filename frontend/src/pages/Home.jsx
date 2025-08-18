import React from 'react'
import{ useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  return (
   <>
   <div>
    {/* hero section */}
     <section className='relative h-[600px] bg-gray-900 text-white'>
         <img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&auto=format&fit=crop&q=60" alt="Hero" 
         className='absolute inset-0 w-full h-full object-cover opacity-50'/>
         <div className='absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent '>
           <div className='absolute inset-0 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full '> 
             <div className='max-w-xl'>
                  <h1 className='text-5xl font-bold mb-4 leading-tight'>Discover Your Style</h1>
                  <p className='text-xl mb-8 '>Curated Collections That Define Modern Elegance </p>
                  <button onClick={()=>navigate('/shop')}
                     className='bg-white text-black px-8 py-3 rounded-full '>
                      Explore Collection
                      
                  </button>
             </div>
           </div>
         </div>   
     </section>
     {/* Featured Products */}

     {/* Categories */}
     <section className='bg-gray--100 py-16'>
       <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-8'>Shop by Category</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 '>
            <div onClick={()=>navigate('/Categories')} className='relative h-64 rounded-lg overflow-hidden group cursor-pointer'>
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60" alt="Electronics" 
              className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'/>
              <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
                <h3 className='text-2xl font-bold text-white'>Electronics</h3>
              </div>
            </div>
            <div onClick={()=>navigate('/Categories')}
            className='relative h-64 rounded-lg overflow-hidden group cursor-pointer'>
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60" alt="Accessories" 
              className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'/>
              <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
                <h3 className='text-2xl font-bold text-white'>Accessories</h3>
              </div>
            </div>
            <div onClick={()=>navigate('/Categories')} className='relative h-64 rounded-lg overflow-hidden group cursor-pointer'>
                <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=60" alt="Fashion" 
                className='w-full h-full object-cover group-hover:scale-110 trantition-transform duration-300' />
                <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
                  <h3 className='text-2xl font-bold text-white'>Fashion</h3>
                </div>
            </div>
          </div>
       </div>

     </section>
   </div>



   {/* membership */}
   
    
   </>
  )
}

export default Home
