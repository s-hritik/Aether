import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Loader2, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const StarRating = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'} />
        ))}
    </div>
);

export const ProductDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { addToCart, itemLoading } = useCart();
    
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchProductAndReviews = async () => {
            try {
                setLoading(true);
                const productRes = await api.products.getById(id);
                setProduct(productRes.data.data);
                const reviewsRes = await api.reviews.getReview(id);
                setReviews(reviewsRes.data.data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductAndReviews();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product); 
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.reviews.create(id, { rating: newRating, comment: newComment });
            setReviews(prev => [response.data.data, ...prev]);
            setNewComment('');
            setNewRating(5);
            toast.success("Thank you for your review!");
        } catch (error) {
            toast.error("Failed to submit review.");
            console.error(error);
        }
    };

    if (loading) return <div className="text-center py-20"><Loader2 className="mx-auto animate-spin" size={48} /></div>;
    if (!product) return <div className="text-center py-20">Product not found.</div>;

    const isLoading = itemLoading === product._id;

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                        <img src={product.image[0]?.url} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
                    </div>
                    
                    <div>
                        <p className="text-sm text-emerald-600 font-semibold mb-2">{product.category}</p>
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <p className="text-3xl font-bold text-gray-800 mb-6">₹{product.price.toFixed(2)}</p>
                        <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                        
                        <div className="border-t pt-6">
                            <div className="flex items-center gap-4 mb-2">
                                <label htmlFor="quantity" className="font-semibold">Quantity:</label>
                                <select 
                                  id="quantity"
                                  value={quantity} 
                                  onChange={(e) => setQuantity(Number(e.target.value))} 
                                  className="border rounded-md p-2"
                                >
                                    {[...Array(Math.min(product.stock, 5)).keys()].map(i => 
                                        <option key={i+1} value={i+1}>{i+1}</option>
                                    )}
                                </select>
                            </div>

                            {product.stock > 0 ? (
                              <p className={`text-sm ${product.stock <= 5 ? 'text-red-500' : 'text-gray-500'}`}>
                                Only {product.stock} left in stock!
                              </p>
                            ) : (
                              <p className="text-sm text-red-500">Out of stock</p>
                            )}
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={isLoading || product.stock === 0}
                            className="w-full mt-6 flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <><ShoppingCart /> Add to Cart</>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews Section*/}
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                {/* Write a review */}
                  {user && (
                    <form onSubmit={handleReviewSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-8">
                      <h3 className="font-semibold mb-4">Write a Review</h3>
                      <div className="mb-4">
                         <label className="block mb-2">Rating</label>
                         <div className="flex">
                            {[...Array(5)].map((_, i) => (
                               <Star key={i} size={24} className={`cursor-pointer ${i < newRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} onClick={() => setNewRating(i + 1)} />
                             ))}
                         </div>
                      </div>
                      <div className="mb-4">
                         <label className="block mb-2">Comment</label>
                         <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} required className="w-full p-2 border rounded-lg h-24"></textarea>
                      </div>
                      <button onClick={handleReviewSubmit} type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">Submit Review</button>
                    </form>
                  )}


            {/* Display existing reviews */}
                <div className="space-y-6 ml-2">
                   {reviews.length > 0 ? reviews.map(review => (
                     <div key={review._id} className="border-b pb-4 px-4 flex items-center justify-between">
                       <div className="flex items-center mb-2">
                         <p className="font-semibold">{review.userId?.name || 'Anonymous'} :</p>
                         <p className="ml-4 text-gray-600">{review.comment}</p>
                         <div className="ml-4">
                           <StarRating rating={review.rating} />
                         </div>
                       </div>
                     </div>
                    )) : (
                     <p>No reviews yet. Be the first to write one!</p>
                      )}
                </div>


            </div>
        </div>
    );
};

export default ProductDetail;