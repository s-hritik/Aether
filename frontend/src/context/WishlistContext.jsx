import React, { createContext, useContext, useEffect, useState } from 'react'
import {useAuth} from '../context/AuthContext.jsx'
import {api} from '../lib/api.js'

const  WishlistContext = createContext();

export const WishProvider =  ({children}) => {
    const [wishlist , setWishlist] = useState([]);
    const [loading ,setLoading] = useState(true);
    const {user} = useAuth();

    useEffect(() => {
      if(user){  
        const fetchWishList = async() => {
          setLoading(true);
           try{
              const response = await api.wishlist.get();
              setWishlist(response.data.data.map(item => item._id))
           }catch(err){
              console.error('Failed to fetch list ',err)
              setWishlist([]);
           }
           finally{
            setLoading(false);
           }
        }
        fetchWishList();
      }
      else{
        setWishlist([]);
        setLoading(false);
      }
        
    },[user])

    const toggleWishlist = async(productId) => {

        const isWishlisted = wishlist.includes(productId);
        try{
           if(isWishlisted){
               await api.wishlist.remove(productId);
               setWishlist(prev => prev.filter(id => id != productId));
           }else{
                await api.wishlist.add(productId);
                setWishlist(prev => [...prev , productId])
           }
        }catch(err){
           console.error('Failed to update wishlist',err)
        }
    }

    return (
        <WishlistContext.Provider value={{wishlist , toggleWishlist}}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWish = () => useContext(WishlistContext);