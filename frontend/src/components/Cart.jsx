import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, Plus, Minus, Loader2 } from 'lucide-react';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, loading, itemLoading } = useCart();
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 500 ? 0 : 50;
  const total = subtotal + shippingFee;

  if (loading) {
    return <div className="text-center py-20"><Loader2 className="mx-auto animate-spin" size={48} /></div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/Shop" className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-emerald-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.product._id} className="flex items-center bg-white p-4 rounded-lg shadow-sm relative">
                {itemLoading === item.product._id && (
                  <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
                    <Loader2 className="animate-spin text-emerald-500" />
                  </div>
                )}

                <Link to={`/products/${item.product._id}`}><img src={item.product.image[0]?.url} alt={item.product.name} className="w-24 h-24 object-cover rounded-md" /></Link>
                <div className="flex-1 ml-4">
                  <Link to={`/products/${item.product._id}`}><h2 className="font-semibold text-gray-800">{item.product.name}</h2></Link>
                  <p className="text-sm text-gray-500">{item.product.category}</p>
                  <p className="font-bold text-lg text-emerald-600 mt-1">₹{item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="p-1 border rounded-full hover:bg-gray-100 disabled:opacity-50" disabled={itemLoading}>
                    <Minus size={16} />
                  </button>
                  <span className="font-semibold w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="p-1 border rounded-full hover:bg-gray-100 disabled:opacity-50" disabled={itemLoading}>
                    <Plus size={16} />
                  </button>
                </div>
                <button onClick={() => removeItem(item.product._id)} className="ml-6 text-red-500 hover:text-red-700 disabled:opacity-50" disabled={itemLoading}>
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
              <h2 className="text-xl font-semibold border-b pb-4 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Shipping Fee</span><span>₹{shippingFee.toFixed(2)}</span></div>
                <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
              </div>
              <Link to="/checkout" className="w-full block text-center mt-6 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;