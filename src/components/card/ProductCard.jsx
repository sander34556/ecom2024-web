import React from 'react'
import useEcomStore from '../../store/ecom-store';
import { ShoppingCart } from 'lucide-react';
import { numberFormat } from '../../utils/number';
import { motion } from "framer-motion"

const ProductCard = ({ item }) => {

    const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart)


    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
        >
            <div className='border rounded-md shadow-md p-2 w-48 hover:scale-110 hover:duration-200'>
                <div>
                    {
                        item.images && item.images.length > 0
                            ? < img
                                src={item.images[0].url}
                                alt={item.title}
                                className='w-full h-36 object-cover bg-gray-200 rounded-md text-center flex items-center justify-center shadow'
                            />
                            : <div className='w-full h-36 bg-gray-200 rounded-md text-center flex items-center justify-center shadow'>
                                No Image
                            </div>
                    }



                </div>

                <div className='py-2'>
                    <p className='text-xl font-bold truncate'>{item.title}</p>
                    <p className='text-sm text-gray-500 truncate'>{item.description}</p>
                </div>

                <div className='flex justify-between items-end'>
                    <span className='text-sm font-bold'>{numberFormat(item.price)}</span>
                    <button
                        onClick={() => actionAddtoCart(item)}
                        className='bg-blue-500 rounded-md p-2 hover:bg-blue-700 shadow-md'>
                        <ShoppingCart />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard