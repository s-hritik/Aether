import React, { useEffect, useState } from 'react'
import {useWish} from '../context/WishlistContext.jsx'
import {api} from '../lib/api.js'
import {ProductCard} from '../components/ProductCard.jsx'
import {Heart} from 'lucide-react'

const Wishlist = () => {

  const {wishlist} = useWish();
  const [WishlistProduct , setWishlistProduct] = useState([])
  const [loading ,setLoading] = useState(true);

  useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true); 
        try {
          if (wishlist.length > 0) {
               const response = await api.products.list();
               const AllProducts = response.data.data;
               setWishlistProduct(AllProducts.filter(p => wishlist.includes(p._id)));
           } else {
               setWishlistProduct([]);
           }
         } catch (err) {
               console.error('Failed to fetch wishlist product details', err);
               setWishlistProduct([]);
         } finally {
               setLoading(false);
         }
      };

  fetchProducts();
}, [wishlist]);

  if(loading) return <div className='text-center py-10'>Loading...</div>

  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-3xl font-bold text-rose-600 flex items-center justify-center gap-3 mb-8'><Heart className='text-red-500 fill-red-500' size={26}/>WishList</h1>
        {WishlistProduct.length === 0 ? (
           <div className='text-center py-16 bg-emerald-100 rounded-lg'>
              <Heart size={48} className='mx-auto text-gray-400 mb-4' />
              <h2 className='text-xl font-semibold text-gray-800'>Wishlist is empty</h2>
           </div>
          ) : (
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {WishlistProduct.map(product =>(<ProductCard key={product._id} product={product} />))}
           </div>
         )
        }
      </div>
    </>
  )
}

export default Wishlist
