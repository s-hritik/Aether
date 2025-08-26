import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import {useNavigate} from 'react-router-dom'
import {useWish} from '../context/WishlistContext.jsx';
import {useCart} from '../context/CartContext.jsx';

export const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist } = useWish();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const isWishlisted = wishlist.includes(product._id);
  const isSale = product.originalPrice && product.originalPrice > product.price;

  const handleNavigation = () => {
    navigate(`/products/${product._id}`)
  }

  return (
     
        <div onClick={handleNavigation} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
           <div className="relative">
             <img
                src={product.image[0].url}
                alt={product.name}
                className="w-full h-56 object-cover"/>
             <button 
                onClick={(e) => {e.stopPropagation(); toggleWishlist(product._id);}}
                className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-full backdrop-blur-sm hover:bg-white transition">
                  <Heart 
                     size={20} 
                     className={`transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}/>
             </button>
           </div>
           <div className="p-4">
              <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2 h-10">{product.description}</p>
              <div className="flex items-center justify-between mt-4">
                <div>
                  {isSale ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-400 line-clamp-1 line-through">₹{product.originalPrice.toFixed(2)}</span>
                      <span className="text-xl font-bold text-rose-500">₹{product.price.toFixed(2)}</span>
                    </div>
                ) : (
                <span className="text-xl font-bold text-gray-800">₹{product.price.toFixed(2)}</span>
                )}
                </div>
                <button
                  onClick={(e) => {e.stopPropagation(); addToCart(product);}}
                  className="flex items-center gap-1.5 bg-emerald-600 text-white font-medium px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors" >
                    <ShoppingCart size={16} />
                    Add
                </button>
              </div>
           </div>
        </div>
  
  );
};

export default ProductCard;