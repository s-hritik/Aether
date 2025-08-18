import React from 'react'
import {Facebook ,Twitter, Instagram , Youtube , Mail} from 'lucide-react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <footer className='bg-gray-900 text-gray-300'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                {/* 1st section */}
                 <div>
                    <h3 className='text-white text-lg font-semibold mb-4'>About App</h3>
                    <p className='text-gray-400 mb-4'>Discover the latest trends in fashion and lifestyle products. Quality meets style at MyStyle.</p>
                    <div className='flex items-center gap-4'>
                        <a href="#" className='text-gray-400 hover:text-white transition-colors'>
                            <Facebook/>
                        </a>
                        <a href="#" className='text-gray-400 hover:text-white transition-colors'>
                            <Twitter/>
                        </a>
                        <a href="#" className='text-gray-400 hover:text-white transition-colors'>
                            <Instagram/>
                        </a>
                        <a href="#" className='text-gray-400 hover:text-white transition-colors'>
                            <Youtube/>
                        </a>
                    </div>
                 </div>
                 {/* 2nd section */}
                 <div>
                    <h3 className='text-white text-lg font-semibold mb-4'>Quick Links</h3>
                    <ul>
                        <li>
                            <Link to={'/about'} className=" text-gray-400 hover:text-white transition-colors">About Us</Link>
                        </li>
                        <li>
                            <Link to={'/contact'} className=" text-gray-400 hover:text-white transition-colors">Contact</Link>
                        </li>
                        <li>
                            <Link to={'/terms'} className=" text-gray-400 hover:text-white transition-colors">Terms And Conditions</Link>
                        </li>
                        <li>
                            <Link to={'/policy'} className=" text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to={'/Query'} className=" text-gray-400 hover:text-white transition-colors">FAQ</Link>
                        </li>
                    </ul>
                 </div>
                 {/* 3rd section */}
                 <div>
                    <h3 className='text-white text-lg font-semibold mb-4'>Customer Service</h3>
                    <ul>
                        <li>
                           <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Information</Link>
                        </li>
                        <li>
                            <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</Link>
                        </li>
                        <li>
                            <Link to="/size-guide" className="text-gray-400 hover:text-white transition-colors">Size Guide</Link>
                        </li>
                        <li>
                            <Link to="/track-order" className="text-gray-400 hover:text-white transition-colors">Track Order</Link>
                        </li>
                    </ul>
                 </div>
                 {/* 4th section */}
                 <div>
                    <h3 className='text-white text-lg font-semibold mb-4'>NewsLetter</h3>
                    <p className='text-gray-400 mb-4'>Subscribe to our newsletter and get 10% off your first purchase.</p>
                    <form className='flex gap-2'>
                        <input 
                          type="email"
                          placeholder='Enter your email'
                          className='flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-emerald-500'
                         />
                         <button 
                           type='submit'
                          className='p-2 bg-emerald-600 txt-white rounded-lg hover:bg-emerald-700 transition-colors'>
                            <Mail/>
                         </button>
                    </form>
                 </div>
            </div>
        </div>     
    </footer>
  )
}

export default Footer
