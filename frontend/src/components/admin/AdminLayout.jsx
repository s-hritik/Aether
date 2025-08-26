import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, Box, Users, LogOut, Home } from 'lucide-react';

export const AdminLayout = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/signin');
    };

    return (
        <div className="flex min-h-screen bg-emerald-50">
            {/* Admin Sidebar Navigation */}
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 text-2xl font-bold text-emerald-600 border-b">
                    Admin panel
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <NavLink
                        to="/admin/products"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 transition-colors ${isActive ? 'bg-emerald-600 text-white font-semibold' : 'hover:bg-gray-200'}`
                        }
                    >
                        <Box size={20} />
                        <span>Products</span>
                    </NavLink>
                    <NavLink
                        to="/admin/orders"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 transition-colors ${isActive ? 'bg-emerald-600 text-white font-semibold' : 'hover:bg-gray-200'}`
                        }
                    >
                        <ShoppingBag size={20} />
                        <span>Orders</span>
                    </NavLink>
                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 transition-colors ${isActive ? 'bg-emerald-600 text-white font-semibold' : 'hover:bg-gray-200'}`
                        }
                    >
                        <Users size={20} />
                        <span>Users</span>
                    </NavLink>
                </nav>
                <div className="p-4 border-t">
                    <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
                        <Home size={20} />
                        <span>Go to Site</span>
                    </Link>
                    <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Admin Content */}
            <div className="flex-1 p-8">
                <div className="bg-white p-6 rounded-lg shadow-sm min-h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};