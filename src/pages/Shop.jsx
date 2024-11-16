import React, { useEffect } from 'react'
import useEcomStore from '../store/ecom-store'
import ProductCard from '../components/card/ProductCard'
import SearchCard from '../components/card/SearchCard';
import CartCard from '../components/card/CartCard';

const Shop = () => {
    const getProduct = useEcomStore((state) => state.getProduct);
    const products = useEcomStore((state) => state.products);


    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div className='flex'>

            {/* Serach bar  */}

            <div className='w-1/4 p-4 h-screen bg-gray-100 '>
                <SearchCard />
            </div>

            {/* Product  */}

            <div className='w-1/2 p-4 h-screen overflow-y-auto'>
                <p className='text-2xl font-bold mb-4'>สินค้าทั้งหมด</p>
                <div className='flex flex-wrap gap-4'>
                    {/* Product card */}
                    {
                        products.map((item, index) =>
                            <ProductCard key={index} item={item} />
                        )
                    }
                    {/* Product card */}
                </div>
            </div>
            {/* Cart  */}
            <div className='w-1/4 p-4 h-screen bg-gray-100'>
                <CartCard />
            </div>

        </div>
    )
}

export default Shop