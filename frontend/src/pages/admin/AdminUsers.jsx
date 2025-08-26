import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { Loader2, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.admin.getAllUsers()
            .then(res => setUsers(res.data.data))
            .catch(err => toast.error("Failed to fetch users."))
            .finally(() => setLoading(false));
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await api.admin.updateUserRole(userId, newRole);
            setUsers(prevUsers => prevUsers.map(u => u._id === userId ? { ...u, role: newRole } : u));
            toast.success("User role updated!");
        } catch (error) {
            toast.error("Failed to update role.");
        }
    };

    if (loading) return <div className="flex justify-center items-center"><Loader2 className="animate-spin" /></div>;
    
    return (
        <div>
            <h1 className="text-2xl font-bold ml-4 mb-6 text-gray-800">Users :</h1>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Name</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Email</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium text-gray-800">{user.name}</td>
                                <td className="py-3 px-4 text-gray-600">{user.email}</td>
                                <td className="py-3 px-4">
                                    <div className="relative w-32">
                                        <select 
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            className={`appearance-none font-semibold w-full p-2 rounded-md  focus:ring-2 focus:ring-white  ${user.role === 'admin' ? 'bg-emerald-700 text-white' : 'bg-cyan-700 text-white'}`}
                                        >
                                            <option value="user">user</option>
                                            <option value="admin">admin</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-black pointer-events-none" />
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
