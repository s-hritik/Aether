import React, { useEffect, useMemo, useState } from 'react'
import{api} from '../lib/api.js'
import {ProductCard} from '../components/ProductCard.jsx'
import {Filter , SlidersHorizontal, ChevronDown ,Store} from 'lucide-react'

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

const Shop = () => {
   
   const [products , setProducts] = useState([]);
   const [loading , setLoading] = useState(true);
   const [isFilterOpen , setFilterOpen] = useState(false);
   const [sortBy , setSortBy] = useState('Newest');
   const [selectedCategory , setSelectedCategory] = useState('');
   const [priceRange , setPriceRange] = useState({min : 0 , max :1000});
   const [isSortOpen, setSortOpen] = useState(false);
   const [isCategoryOpen, setCategoryOpen] = useState(false);

   useEffect(() => {

      api.products.list()
      .then(response => setProducts(response.data.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

   } , [])// Empty dependency array ensures this runs only once

   const categories = useMemo (() => {

      return [...new Set(products.map(p => p.category))];

   },[products])

   const filteredProducts = useMemo (() => {

      let processedProducts = [...products]
      .filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
      
      if(selectedCategory) {
         processedProducts = processedProducts.filter(p => p.category === selectedCategory)
      }

      switch(sortBy) {
         case 'Price-low': processedProducts.sort((a,b) => a.price - b.price);     break;
         case 'Price-high': processedProducts.sort((a,b) => b.price - a.price); break;
         case 'Newest': processedProducts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)) ; break;   
      }

      return processedProducts;

   },[products , sortBy , selectedCategory , priceRange])


const resetFilter = () => {
   setSortBy('Newest');
   setSelectedCategory('');
   setPriceRange({ min: 0 , max :1000 })
}

const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryOpen(false); 
}

const handleSortSelect = (value) => {
    setSortBy(value);
    setSortOpen(false);
}

if(loading) return <div className='text-center py-20 font-medium'>Loading...</div>

return (
   <>
     <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
       <div className='flex items-center justify-between mb-8'>
         <h1 className="text-3xl font-bold text-emerald-700 flex items-center gap-3">
             <Store size={28} />
             <span>Shop</span>
         </h1>
         <button 
            onClick={() => setFilterOpen(!isFilterOpen)}
            className='flex items-center gap-2 text-emerald-700 font-medium'>
            <Filter size={20}/>Filters
         </button>
       </div>
       <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          <aside className={`lg:col-span-1 bg-white p-6 rounded-xl shadow-sm h-fit ${isFilterOpen ? 'block' : 'block'} lg:block `}>


            {/* Sort By */}
            <div className="mb-8 relative">
                <h3 className="text-lg font-semibold mb-4">Sort By</h3>
                <button
                     onClick={() => setSortOpen(!isSortOpen)}
                     className="w-full text-left px-3 py-2 bg-emerald-600 text-white border border-gray-200 rounded-lg flex justify-between items-center hover:bg-emerald-700">
                        <span>{(sortOptions.find(opt => opt.value === sortBy) || sortOptions[0]).label}</span>
                        <ChevronDown size={20} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>
                {isSortOpen && (
                     <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                         {sortOptions.map(opt => (
                             <button key={opt.value} onClick={() => handleSortSelect(opt.value)} className="w-full text-left px-3 py-2 hover:bg-emerald-600 hover:text-white">
                                  {opt.label}
                             </button>
                         ))}
                     </div>
                )}
            </div>


            {/* Categories */}
            <div className="mb-8 relative">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <button
                onClick={() => setCategoryOpen(!isCategoryOpen)}
                className="w-full text-left px-3 py-2 border border-gray-200 rounded-lg flex justify-between items-center bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <span>{selectedCategory || 'Select'}</span>
                <ChevronDown size={20} className={`transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCategoryOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button onClick={() => handleCategorySelect('')} className="w-full text-left px-3 py-2 hover:bg-emerald-600 hover:text-white">
                    All Categories
                  </button>
                  {categories.map(cat => (
                    <button key={cat} onClick={() => handleCategorySelect(cat)} className="w-full text-left px-3 py-2 hover:bg-emerald-600 hover:text-white"> {cat}</button>
                  ))}
                </div>
              )}
            </div>


            {/* Price Range */}
            <div className='mb-8'>
               <h3 className='text-lg font-semibold mb-4'>Price Range</h3>
               <div className='space-y-4 '>
                  <div>
                     <div className="flex justify-between items-center text-sm text-gray-700 mb-1">
                        <label>Minimum Price</label>
                        <span className="font-semibold text-emerald-600">₹{priceRange.min}</span>
                     </div>
                     <input type="range" min="0" max="1000" value={priceRange.min} onChange={(e) => setPriceRange(p => ({ ...p, min: Number(e.target.value) }))} className="w-full" />
                  </div>
                  <div>
                     <div className="flex justify-between items-center text-sm text-gray-700 mb-1">
                        <label>Maximum Price</label>
                        <span className="font-semibold text-emerald-600">₹{priceRange.max}</span>
                     </div>
                     <input type="range" min="0" max="1000" value={priceRange.max} onChange={(e) => setPriceRange(p => ({ ...p, max: Number(e.target.value) }))} className="w-full" />
                  </div>
               </div>
            </div>

            <br />
            {/* Reset Button */}
            <button 
               onClick={resetFilter}
               className='w-full bg-emerald-600 text-white font-semibold py-2 rounded-lg hover:bg-emerald-700 transition-colors'>
                Reset Filters
            </button>
          </aside>


          {/* Product Grid */}
          <main className='lg:col-span-3'>
              {filteredProducts.length > 0 ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                      {filteredProducts.map(product => <ProductCard key={product._id} product={product} />)}
                  </div>
              ):(
                  <div className='text-center py-20'>
                     <SlidersHorizontal size={48} className='mx-auto text-gray-400 mb-4'/>
                     <h2 className='text-xl font-semibold'>No products Found</h2>
                     <p className='text-gray-500 mt-2'>Try adjusting your filters </p>
                  </div>
              )}
          </main>


       </div>
      </div>
   </>
)

}

export default Shop;
