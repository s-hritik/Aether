import React, { useEffect, useMemo, useState } from 'react'
import {api} from '../lib/api.js'
import {ProductCard} from '../components/ProductCard.jsx'
import {Tag} from 'lucide-react'


const Sale = () => {

  const [products , setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error , setError] = useState(null);

  useEffect(() => {
      const fetchSaleProducts = async () => {
        try{
          // setLoading(true);
          const response = await api.products.list();
          setProducts(response.data.data);

          // const saleProducts = response.data.data.filter((product) => product.isOnSale === true);
          // setProducts(saleProducts);

        }catch(error){
          setError('Failed to load sale items')
        }finally{
          setLoading(false);
        }
      }
      fetchSaleProducts();
  } ,[]);


  const saleProducts = useMemo(() => {
    return products.map((product) => ({
      ...product,
      originalPrice : product.price,
      price : product.price * 0.7 // 30% discount simulation
    }))
  }, [products])


  if(loading) return <p className='text-center py-20'>Finding the best deals</p>
  if(error) return <p className='text-center py-20 text-red-500'>{error}</p>

  return(
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='bg-gradient-to-r from-rose-500 to-rose-600 rounded-3xl p-8 md:p-12 mb-12 text-white text-center'>
           <h1 className='text-4xl font-extrabold mb-2'>Summer Sale</h1>
           <p className='text-xl opacity-90 mb-4'>Up to 30% off on the selected items</p>
           <div className='inline-flex items-center gap-2 text-lg font-bold bg-white/20 px-4 py-2 rounded-full'>
             <Tag size={20}/>
             <span>Limited Time Offer</span>
           </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
           {saleProducts.map(product => (
            <ProductCard key={product._id} product={product}/>
           ))}
        </div>
        {/* {products.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 mg:grid-cols-4 gap-8'>
            {products.map((product) => (
              <ProductCard key={product._id} product={product}/>
            ))}
          </div>
        ):(
          <p className='text-center py-20'>No items are currently on sale.</p>
        )} */}
      </div>
    </>
  )


}

export default Sale
