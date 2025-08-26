import React, { useState } from 'react';
import { api } from '../../lib/api';
import { X, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';

export const ProductFormModal = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        stock: product?.stock || '',
        category: product?.category || '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (imageFile) {
            data.append('image', imageFile);
        }

        try {
            if (product) {
                await api.admin.updateProduct(product._id, formData);
                toast.success("Product updated successfully!");
            } else {
                await api.admin.addProduct(data);
                toast.success("Product created successfully!");
            }
            onSave();
            onClose();
        } catch (error) {
            toast.error("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Grid layout for inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="w-full p-2 border border-gray-200 rounded-lg" required />
                        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border border-gray-200 rounded-lg" required />
                        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price (₹)" className="w-full p-2 border border-gray-200 rounded-lg" required />
                        <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" className="w-full p-2 border border-gray-200 rounded-lg" required />
                    </div>
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border border-gray-200 rounded-lg h-24" required />
                    
                    {/* Custom File Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Product Image</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="image" type="file" onChange={handleFileChange} className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">{imageFile ? imageFile.name : 'PNG, JPG, GIF up to 10MB'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={loading} className="bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:bg-emerald-300">
                            {loading ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};