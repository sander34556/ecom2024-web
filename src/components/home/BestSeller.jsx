import React, { useEffect, useState } from 'react'
import { listProductBy } from '../../api/product'
import ProductCard from '../card/ProductCard'
import SwiperShowProduct from '../../utils/SwiperShowProduct'
import { SwiperSlide } from 'swiper/react'


const BestSeller = () => {
    const [data, setData] = useState([]);


    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        listProductBy("sold", "desc", 12)
            .then((res) => {
                setData(res.data);
                console.log(data);
            })
            .catch((err) => console.log(err))
    }


    return (
        <SwiperShowProduct>
            {
                data?.map((item, index) => (
                    <SwiperSlide>
                        <ProductCard item={item} key={index} />
                    </SwiperSlide>
                )
                )
            }
        </SwiperShowProduct>
    )
}

export default BestSeller