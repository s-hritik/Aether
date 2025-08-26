import React from 'react';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { api } from '../../lib/api';
import { Loader2, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { ProductFormModal } from '../../components/admin/ProductFormModel.jsx';
import toast from 'react-hot-toast';

export const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await api.admin.getAllProducts();
            setProducts(response.data.data);
        } catch (error) {
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await api.admin.deleteProduct(productId);
                toast.success("Product deleted!");
                fetchProducts(); 
            } catch (error) {
                toast.error("Failed to delete product");
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };
    
    const handleAddNew = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    if (loading) return <div className="flex justify-center items-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold ml-4 text-gray-800">Products :</h1>
                <button onClick={handleAddNew} className="flex items-center mr-20 gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    <PlusCircle size={20} />
                    Add New Product
                </button>
            </div>
            <div className="space-y-4">
                <div className="grid grid-cols-6 gap-4 px-4 py-4 rounded-lg font-semibold bg-gray-200 text-gray-600 text-sm">
                    <div className="col-span-2">PRODUCT</div>
                    <div className="text-right">PRICE</div>
                    <div className="text-right">STOCK</div>
                    <div className="text-center col-span-2">ACTIONS</div>
                </div>
                {products.map(product => (
                    <div key={product._id} className="grid grid-cols-6 gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
                        <div className="col-span-2 flex items-center gap-4">
                            <Link to={`/products/${product._id}`}>  
                              <img src={product.image[0]?.url} alt={product.name} className="h-12 w-12 object-cover rounded-md" />
                            </Link>
                            <Link to={`/products/${product._id}`}>  
                              <span className="font-medium text-gray-800">{product.name}</span>
                            </Link>
                        </div>
                        <div className="text-right font-mono">₹{product.price.toFixed(2)}</div>
                        <div className="text-right font-mono">{product.stock}</div>
                        <div className="text-center col-span-2">
                            <div className="flex justify-center gap-4">
                                <button onClick={() => handleEdit(product)} className="flex items-center gap-1 px-5 py-1.5 rounded-xl bg-lime-600 text-white font-medium">
                                    <Edit size={16} /> Edit
                                </button>
                                <button onClick={() => handleDelete(product._id)} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-600 text-white  font-medium">
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    </div> 
                ))}
            </div>

            {isModalOpen && (
                <ProductFormModal
                    product={editingProduct}
                    onClose={() => setIsModalOpen(false)}
                    onSave={fetchProducts}
                />
            )}
        </div>
    );
};
