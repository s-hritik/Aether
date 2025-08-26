import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {User} from 'lucide-react'
import toast from 'react-hot-toast';

export const AuthPage = () => {
    // State to track if we are on the Sign Up panel
    const [isSignUp, setIsSignUp] = useState(false);
    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();

    // State for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isSignUp) {
                await signUp(name, email, password);
                // On successful sign-up, prompt user to sign in
                toast.success(`Account created successfully! Please sign in.`);
                setIsSignUp(false); 
                // Clear fields
                setName('');
                setEmail('');
                setPassword('');
            } else {
                await signIn(email, password);
                navigate('/'); // Navigate to home on successful sign-in
            }
        } catch (err) {
            setError(isSignUp ? 'Failed to create an account. Please try again.' : 'Failed to sign in. Please check your credentials.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-emerald-50 p-4">
            <div className="relative flex w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
                
                {/* Form Panel */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold flex items-center gap-1 justify-center text-emerald-700 mb-3">
                       <User className='fill-emerald-700' size={28} /> {isSignUp ?  'Create Account' : 'Sign In'}
                    </h2>

                    <hr className=" border-gray-300 mb-8 w-full" />   
                    
                    {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</div>}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {isSignUp && (
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        )}
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-emerald-700 text-white font-bold rounded-full uppercase hover:bg-emerald-800 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                        </button>
                    </form>
                </div>

                {/* Overlay Panel */}
                <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-emerald-700 text-white p-12 text-center">
                    <h2 className="text-3xl font-bold mb-3">{isSignUp ? 'Welcome To Aether' : 'Welcome Back!'}</h2>
                    <p className="mb-8">
                        {isSignUp ? 'To keep connected with Aether please login with your personal info' : 'Enter your personal details and start your journey with Aether'}
                    </p>
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="py-3 px-8 font-bold border-2 border-white rounded-full uppercase hover:bg-white hover:text-emerald-600 transition-all"
                    >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    );
};