import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { WishProvider } from './context/WishlistContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
        <WishProvider>
          <CartProvider>
              <App/>
              <Toaster/>
           </CartProvider>
        </WishProvider>
      </AuthProvider>
  </StrictMode>,
)


       