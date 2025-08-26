import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true); // For the initial cart fetch
    const [itemLoading, setItemLoading] = useState(null); // To track which item is being updated

    useEffect(() => {
        const fetchCart = async () => {
            if (user) {
                setLoading(true);
                try {
                    const response = await api.cart.getcart();
                    setCartItems(response.data.data || []);
                } catch (err) {
                    console.error('Failed to fetch Cart', err);
                    setCartItems([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setCartItems([]);
                setLoading(false);
            }
        };
        fetchCart();
    }, [user]);

    const addToCart = async (product) => {
        if (!user) {
            toast.error('Please log in to add items to your cart.');
            return;
        }
        setItemLoading(product._id);
        try {
            const response = await api.cart.add({ productId: product._id, quantity: 1 });
            setCartItems(response.data.data);
            toast.success(`${product.name} added to cart!`);
        } catch (err) {
            console.error('Failed to add items in cart', err);
            toast.error('Failed to add item.');
        } finally {
            setItemLoading(null);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        if (quantity === 0) {
            return removeItem(productId);
        }
        setItemLoading(productId);
        try {
            const response = await api.cart.update({ productId, quantity });
            setCartItems(response.data.data);
        } catch (err) {
            console.error('Failed to update quantity', err);
            toast.error('Failed to update quantity.');
        } finally {
            setItemLoading(null);
        }
    };

    const removeItem = async (productId) => {
        setItemLoading(productId);
        try {
            const response = await api.cart.remove(productId);
            setCartItems(response.data.data);
            toast.success('Item removed from cart.');
        } catch (err) {
            console.error('Failed to remove items', err);
            toast.error('Failed to remove item.');
        } finally {
            setItemLoading(null);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, loading, itemLoading }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);