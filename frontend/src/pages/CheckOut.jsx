import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';
import { api } from '../lib/api.js';

const CheckOut = () => {
 
  const navigate = useNavigate();
  const [step , setStep] = useState('Shipping');
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
  })
  const [items , setItems] = useState([]);
  const [total ,setTotal] = useState(0);

  useEffect(()=>{
    const fetchCart = async () => {
      try{
          const response = await api.cart.getcart();
          const cartItems = response.data.data;
          setItems(cartItems);

          const Totalprice = cartItems.reduce((acc,item) => acc + item.product.price * item.quantity, 0);
          setTotal(Totalprice);

      }catch(err){
         console.error('Failed to fetch cart data:', err)
      }
    }

    fetchCart();
  },[])


  const handleShippingSubmit = async(e) => {
    e.preventDefault();
    setStep('Payment');
  }

  const handlePaymentSubmit = async(e) => {
     e.preventDefault();
     try{
       const orderData = {
          shippingAddress : info.address
        };
       await api.orders.placeOrder(orderData);
       setStep('Confirmation');
     }catch(err){
       console.error('Failed to place order', err)
     }
   }  

  return(
    <div className='max-w-4xl mx-auto px-4 py-8'>
       <div className='flex items-center justify-center mb-8'>
         <div className={`flex items-center ${step !== 'Shipping' ? 'text-emerald-600' : 'text-gray-400'}`}>
            <Truck size={24}/>
            <span className='ml-2'>Shipping</span>
         </div>
         <div className='w-16 h-1 mx-4 bg-gray-200'>
           <div className={`h-full bg-emerald-600 transition-all ${step !== 'Shipping' ? 'w-full' : 'w-0'}`}/>
         </div>
         <div className={`flex items-center ${step === 'Payment' ? 'text-emerald-600':'text-gray-400'}`}>
            <CreditCard size={24} />
            <span className='ml-2'>Payment</span>
         </div>
         <div className='w-16 h-1 mx-4 bg-gray-200'>
            <div className={`h-full bg-emerald-600 transition-all ${step === 'Confirmation' ? 'w-full' : 'w-0'}`} />
         </div>
         <div className={`flex items-center ${step === 'Confirmation' ? 'text-emerald-600' : 'text-gray-400'}`}>
            <CheckCircle size={24} />
            <span className="ml-2">Confirmation</span>
         </div>
       </div>


       <div className='bg-white rounded-lg shadow-lg p-6'>
         {step === 'Shipping' && (
            <form onSubmit={handleShippingSubmit} className='space-y-6'>
               <h2 className='text-2xl font-bold text-emerald-800 mb-6'>Shipping Info</h2>
               <div className='grid gridcols-1 md:grid-cols-2 gap-6'>
               <div>
                 <label className='block text-sm font-medium text-gray-700 mb-2'> First Name</label>
                 <input 
                    type="text"
                    required
                    value={info.firstName}
                    onChange={(e) => {
                      setInfo(prev => ({...prev, firstName: e.target.value}))}}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500'/>
               </div>
               <div>
                 <label className='block text-sm font-medium text-gray-700 mb-2'>Last Name</label>
                  <input type="text"
                         required
                         value={info.lastName}
                         onChange={(e) => setInfo(prev => ({...prev , lastName: e.target.value}))} 
                         className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500'/>
               </div>
               <div>
                 <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                  <input type="text"
                         required
                         value={info.email}
                         onChange={(e) => setInfo(prev => ({...prev , email: e.target.value}))} 
                         className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500'/>
               </div>
               <div>
                 <label className='block text-sm font-medium text-gray-700 mb-2'>Address</label>
                  <input type="text"
                         required
                         value={info.address}
                         onChange={(e) => setInfo(prev => ({...prev , address: e.target.value}))} 
                         className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500'/>
               </div>
               <div>
                 <label className='block text-sm font-medium text-gray-700 mb-2'>City</label>
                  <input type="text"
                         required
                         value={info.city}
                         onChange={(e) => setInfo(prev => ({...prev , city: e.target.value}))} 
                         className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500'/>
               </div>
               <div>
                 <label className='block text-sm font-medium text-gray-700 mb-2'>State</label>
                  <input type="text"
                         required
                         value={info.state}
                         onChange={(e) => setInfo(prev => ({...prev , state: e.target.value}))} 
                         className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500'/>
               </div>
               <div>
                 <label className='block text-sm font-medium text-gray-700 mb-2'>Pin Code</label>
                  <input type="text"
                         required
                         value={info.pinCode}
                         onChange={(e) => setInfo(prev => ({...prev , pinCode: e.target.value}))} 
                         className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500'/>
               </div>
               </div>
               <button 
                   type='submit'
                   className='w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors'>
                     Continue
                </button>
            </form>
         )}
         {step === 'Payment' && (
             <form onSubmit={handlePaymentSubmit} className='space-y-6'>
               <h2 className='text-2xl font-bold text-emerald-800 mb-6'>Payment Info</h2>
               <div className='space-y-4'>
                 <div>
                   <label className='block text-sm font-medium text-gray-700 mb-2'>Card Number</label>
                   <input type="text"
                          required
                          placeholder='1234 5678 9012 3456'
                          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500'/>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                     <input type="text"
                            required
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"/>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                     <input type="text"
                            required
                            placeholder="123"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"/>
                    </div>
                 </div>
               </div>
               <div className='border-t pt-6'>
                  <div className='flex justify-between text-lg font-semibold mb-4'>
                     <span>Total :</span>
                     <span>${total.toFixed(2)}</span>
                  </div>
                  <button type='submit' className='w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors'>
                     Place Order
                  </button>
               </div>
             </form>
         )}
         {step === 'Confirmation' && (
            <div className='text-center py-8'>
               <div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center ms-auto mb-6'>
                 <CheckCircle size={32} className='text-emerald-600'/>
               </div>
               <h2 className='text-2xl font-bold text-emerald-800 mb-4'>order Confirmed!</h2>
               <p className='text-gray-600 mb-6'>Your order has been confirmed and will be shipped soon</p>
               <button onClick={() => navigate('/')}
                    className='bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors'>
                 Continue Shopping
               </button>
            </div>
         )}
       </div>

       {step !== 'Confirmation' && (
          <div className='mt-8 bg-white rounded-lg shadow-lg p-6'>
             <h3 className='text-lg font-semibold text-emerald-800 mb-4'>Order Summary</h3>
             <div className='space-y-4'>
               {items.map(item => (
                  <div key={item.product._id} className='flex items-center gap-4'>
                      <Link to={`/products/${item.product._id}`}>
                          <img 
                               src={item.product.image[0].url} 
                               alt={item.product.name} 
                               className='w-16 h-16 object-cover rounded' />       
                      </Link>
                     <div className='flex-1'>
                       <Link to={`/products/${item.product._id}`}><h4 className='font-medium'>{item.product.name}</h4></Link>
                       <p className='text-gray-600'>Quantity : {item.quantity}</p>
                     </div>
                     <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
               ))}
             </div>
             <div className='border-t mt-4 pt4'>
               <div className='flex justify-between font-semibold'>
                 <span>Total :</span>
                 <span>₹{total.toFixed(2)}</span>
               </div>
             </div>
          </div>
       )}
    </div>
  )

}

export default CheckOut;


