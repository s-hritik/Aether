import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext.jsx';
import { Loader2 } from "lucide-react";

export const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" size={48} /></div>;
    }

    if (!user) {
        return <Navigate to={'/signin'} state={{ from: location }} replace />;
    }

    if (adminOnly && user.role !== 'admin') {
        return <Navigate to={'/'} replace />;
    }
    
    return children;
};