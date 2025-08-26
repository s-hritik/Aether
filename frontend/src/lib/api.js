import axios from 'axios';

const ApiClient = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL, //my backend url
    withCredentials:true // This is essential for handling auth cookies
})

export const api = {
    // Authentication
    auth :{
        register(userData){
            return ApiClient.post('/users/register',userData);
        },
        login(credential){
            return ApiClient.post('/users/login',credential);
        },
        logout(){
            return ApiClient.post('/users/logout');
        },
        getProfile(){
            return ApiClient.get('/users/profile')
        },
        updateProfile(profileData){
            return ApiClient.put('/users/profile', profileData);
        },
        changePassword(passwordData){
            return ApiClient.post('/users/change-password', passwordData)
        }
    },

    // products 
    products :{
        list(){
            return ApiClient.get('/products');
        },
        getById(id){
            return ApiClient.get(`/products/${id}`)
        }
    },

    //wishlist
    wishlist:{
         get(){
            return ApiClient.get('/users/wishlist')
         },
         add(productId) {
            return ApiClient.post('/users/wishlist', {productId})
         },
         remove(productId){
            return ApiClient.delete(`/users/wishlist/${productId}`)
         }
    },

    // cart
    cart:{
        getcart(){
            return ApiClient.get('/orders/get-cart');
        },
        add(itemData){
            return ApiClient.post('/orders/add-to-cart',itemData)
        },
        update(updateData){
            return ApiClient.put('/orders/update-cart', updateData)
        },
        remove(productId){
            return ApiClient.delete(`/orders/remove-from-cart/${productId}`)
        }
    },

    //orders
    orders : {
         placeOrder(orderData){
            return ApiClient.post('/orders/place-orders',orderData);
         },
         getMyorders(){
            return ApiClient.get('/orders/my-orders')
         }

    },

    //reviews
    reviews: {

       getReview(productId) {
          return ApiClient.get(`/reviews/${productId}`);
        },
        create(productId, reviewData) {
           return ApiClient.post(`/reviews/${productId}`, reviewData);
        }
    },

    //Admin
    admin:{

        // Product Management
        getAllProducts() {
           return ApiClient.get('/products');
        },
        addProduct(formData) {
           return ApiClient.post('/products/add', formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            });
        },
        updateProduct(productId, productData) {
            return ApiClient.put(`/products/${productId}`, productData);
        },
        deleteProduct(productId) {
            return ApiClient.delete(`/products/${productId}`);
        },

        // Order Management
        getAllOrders() {
            return ApiClient.get('/orders/all-orders');
        },
        updateOrderStatus(orderId, status) {
            return ApiClient.put(`/orders/update-status/${orderId}`, { status });
        },

        // User Management
        getAllUsers() {
            return ApiClient.get('/users');
        },
        updateUserRole(userId, role) {
            return ApiClient.put(`/users/update-role/${userId}`, { role });
        }
    },

    // payment
    // payment: {
    //   createOrder(amount) {
    //     return ApiClient.post('/payments/create-order', { amount });
    //   },
    //   verify(data) {
    //     return ApiClient.post('/payments/verify', data);
    //   }
    // },
}