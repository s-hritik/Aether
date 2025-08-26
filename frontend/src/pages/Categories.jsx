import React, { useEffect, useMemo, useState } from 'react'
import {Link} from 'react-router-dom'
import {api} from '../lib/api.js'
import {ProductCard} from '../components/ProductCard.jsx'

const Categories = () => {

  const [products , setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

      api.products.list()
         .then(response => setProducts(response.data.data))
         .catch(err => console.error('Failed to fetch products' , err))
         .finally(() => setLoading(false));

  },[])

  const productsByCategory = useMemo(() => {

    return products.reduce((acc , product) => {

        (acc[product.category] = acc[product.category] || []).push(product);
        return acc;

    }, {})

  },[products])

   if(loading) return <div className='text-center py-10'>Loading...</div>

   return(
     <>
       <div className='max-7xl mx-auto pr-4 sm:px-6 lg:px-8 py-12'>
         {Object.keys(productsByCategory).map(category => (
          <section key={category} className='mb-16'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-3xl font-bold text-emerald-800'>{category}</h2>
              <Link to='/Shop' className='text-emerald-600 font-meduim hover:text-emerald-700'>
                View All
              </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {productsByCategory[category].slice(0,3).map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
         ))}
       </div>
     </>
   )




}

export default Categories
