import React, { useEffect, useState } from 'react'
import {Sparkles} from 'lucide-react'
import {api} from '../lib/api.js'
import {ProductCard} from '../components/ProductCard.jsx'

const NewArrivals = () => {
   
     const [products , setProducts] = useState([]);
     const [loading , setLoading] = useState(true);

     useEffect(() => {
       const fetchproducts = async() => {
        try{
           const response = await api.products.list();
           const sorted = response.data.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
           setProducts(sorted.slice(0,8));
        }catch(err){
          console.error('Failed to fetch new Arrivals' , err)
        }finally{
          setLoading(false);
        }
       }

       fetchproducts();
     }, []);

     if(loading) return <div className='text-center py-10'>Loading...</div>

     return(
      <>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 py-12'>
           <div className='text-center mb-12'>
              <div className='inline-flex items-center gap-2 mb-4'>
                  <Sparkles className='text-emerald-600 ' size={24}/>
                  <h1 className='text-4xl font-bold text-emerald-800'>New Arrivals</h1>
              </div>
              <p className='text-lg text-gray-500'>Discover our latest collections</p>
           </div>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
               {products.map((product)=>(
                  <ProductCard key={product._id} product={product} />
               ))}
           </div>
        </div>
      </>
     )

}

export default NewArrivals
