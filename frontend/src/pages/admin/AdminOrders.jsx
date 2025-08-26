import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { Loader2, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

// Helper to get color classes for different statuses
const statusColors = {
    Pending: 'bg-amber-400 text-white',
    Processing: 'bg-amber-500 text-white',
    Shipped: 'bg-cyan-600  text-white',
    Delivered: 'bg-lime-600 text-white',
    Cancelled: 'bg-rose-600 text-white',
};

export const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.admin.getAllOrders()
            .then(res => setOrders(res.data.data))
            .catch(err => toast.error("Failed to fetch orders."))
            .finally(() => setLoading(false));
    }, []);

    const handleStatusChange = async (orderId, status) => {
        try {
            await api.admin.updateOrderStatus(orderId, status);
            setOrders(prevOrders => prevOrders.map(o => o._id === orderId ? { ...o, status } : o));
            toast.success("Order status updated!");
        } catch (error) {
            toast.error("Failed to update status.");
        }
    };

    if (loading) return <div className="flex justify-center items-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Orders :</h1>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Order ID</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Date</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Amount</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 font-mono text-xs text-gray-700">{order._id}</td>
                                <td className="py-3 px-4 text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="py-3 px-4 font-semibold text-gray-800">₹{order.amount.toFixed(2)}</td>
                                <td className="py-3 px-4">
                                    <div className="relative">
                                        <select 
                                            value={order.status} 
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            className={`appearance-none font-semibold text-sm w-full p-2 rounded-md border-transparent focus:ring-2 focus:ring-emerald-500 ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}
                                        >
                                            <option>Pending</option>
                                            <option>Processing</option>
                                            <option>Shipped</option>
                                            <option>Delivered</option>
                                            <option>Cancelled</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};