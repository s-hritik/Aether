import React, { useState, useEffect, useCallback } from 'react';
import {useAuth } from '../context/AuthContext.jsx';
import { User, ShoppingBag, Heart, Settings, LogOut, Shield, Key, CreditCard, HelpCircle} from 'lucide-react';
import { api } from '../lib/api.js';
import {Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Profile = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileInfo, setProfileInfo] = useState({ name: '', email: '' });
  const [orders, setOrders] = useState([]);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
  });
  const [paymentMethods, setPaymentMethods] = useState([
    { id: '1', last4: '4242', expiry: '12/24' },
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const profileResponse = await api.auth.getProfile();
        setProfileInfo(profileResponse.data.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        if (activeTab === 'orders') {
          const ordersResponse = await api.orders.getMyorders();
          setOrders(ordersResponse.data.data);
        }
      } catch (error) {
        console.error(`Failed to fetch ${activeTab} data:`, error);
      }
    };
    fetchData();
  }, [activeTab, user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await api.auth.updateProfile({ name: profileInfo.name });
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile.');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await api.auth.changePassword({ oldPassword, newPassword });
      toast.success('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Failed to change password:', error);
      toast.error('Failed to change password. Check your old password.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
      toast.error('Failed to log out.');
    }
  };


  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Please log in to view your profile
          </h2>
          <button onClick={() => navigate('/login')} className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700">
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="bg-emerald-600 text-white p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <User size={40} className="text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profileInfo.name}</h1>
              <p className="text-emerald-100">{profileInfo.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b">
          <nav className="flex flex-wrap">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${
                activeTab === 'profile'
                  ? 'border-b-2 border-emerald-600 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User size={20} />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'border-b-2 border-emerald-600 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ShoppingBag size={20} />
              Orders
            </button>
            <button
              onClick={() => navigate('/wishlist')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 text-gray-500 hover:text-gray-700`}
            >
              <Heart size={20} />
              Wishlist
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${
                activeTab === 'security'
                  ? 'border-b-2 border-emerald-600 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Shield size={20} />
              Security
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${
                activeTab === 'password'
                  ? 'border-b-2 border-emerald-600 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Key size={20} />
              Change Password
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${
                activeTab === 'payment'
                  ? 'border-b-2 border-emerald-600 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <CreditCard size={20} />
              Payment
            </button>
            <button
              onClick={() => setActiveTab('help')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${
                activeTab === 'help'
                  ? 'border-b-2 border-emerald-600 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <HelpCircle size={20} />
              Help
            </button>
            <button
              onClick={handleLogout}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 text-red-500 hover:text-red-700`}
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Personal Information
                </h3>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileInfo.name}
                        onChange={(e) =>
                          setProfileInfo((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileInfo.email}
                        readOnly
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                My Orders
              </h3>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order._id} className="border rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">
                        Order ID: {order._id.slice(-6)}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          order.status === 'Delivered'
                            ? 'text-emerald-600'
                            : 'text-gray-500'
                        }`}
                      >
                        Status: {order.status}
                      </span>
                    </div>
                    <div className='flex justify-between items-center mb-2'>
                      <p className="text-gray-800 text-sm mb-2">
                         Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-800 text-sm mb-2">
                         Total Amount: ₹{order.amount.toFixed(2)}
                      </p>
                    </div>

                    <ul className="space-y-2">
                      {order.products.map((item) => (
                        <li
                          key={item.productId._id}
                          className="flex items-center gap-4 border-t pt-2"
                        >
                          <Link to={`/products/${item.productId._id}`}>
                              <img
                                   src={item.productId.image[0].url}
                                   alt={item.productId.name}
                                   className="w-12 h-12 object-cover rounded"/>
                          </Link>
                          <div>
                            <Link to={`/products/${item.productId._id}`}>
                              <p className="font-medium">{item.productId.name}</p>
                            </Link>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <ShoppingBag size={48} className="mx-auto mb-4" />
                  <p>No orders yet</p>
                </div>
              )}
            </div>
          )}

          {/* New Sections */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Security Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={security.twoFactor}
                      onChange={(e) =>
                        setSecurity((prev) => ({
                          ...prev,
                          twoFactor: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Login Alerts</h4>
                    <p className="text-sm text-gray-500">
                      Get notified of new login attempts
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={security.loginAlerts}
                      onChange={(e) =>
                        setSecurity((prev) => ({
                          ...prev,
                          loginAlerts: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'password' && (
             <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Change Password
              </h3>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Old Password
                  </label>
                  <input
                    type="password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
                >
                  Change Password
                </button>
              </form>
            </div>
          )}


          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Payment Methods
                </h3>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Add New Card
                </button>
              </div>
              <div className="space-y-4">
                {paymentMethods.map((card) => (
                  <div
                    key={card.id}
                    className="border rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <CreditCard size={24} className="text-gray-400" />
                      <div>
                        <p className="font-medium">
                          •••• •••• •••• {card.last4}
                        </p>
                        <p className="text-sm text-gray-500">
                          Expires {card.expiry}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Settings size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'help' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Help Center
              </h3>
              <div className="space-y-4">
                <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <h4 className="font-medium mb-1">
                    Frequently Asked Questions
                  </h4>
                  <p className="text-sm text-gray-500">
                    Find answers to common questions
                  </p>
                </button>
                <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <h4 className="font-medium mb-1">Contact Support</h4>
                  <p className="text-sm text-gray-500">
                    Get help from our support team
                  </p>
                </button>
                <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <h4 className="font-medium mb-1">User Guide</h4>
                  <p className="text-sm text-gray-500">
                    Learn how to use our platform
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;