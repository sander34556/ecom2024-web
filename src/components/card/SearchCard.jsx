import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { numberFormat } from '../../utils/number';
const SearchCard = () => {
    const getProduct = useEcomStore((state) => state.getProduct);
    const products = useEcomStore((state) => state.products);
    const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters);

    const getCategory = useEcomStore((state) => state.getCategory);
    const categories = useEcomStore((state) => state.categories);

    const [text, setText] = useState('');
    const [categorySelected, setCategorySelected] = useState([]);

    const [price, setPrice] = useState([1000, 30000]);
    const [ok, setOk] = useState(false);



    // console.log(categories);
    useEffect(() => {
        getCategory()
    }, [])


    // step 1 search text
    useEffect(() => {
        const delay = setTimeout(() => {
            if (text) {
                actionSearchFilters({ query: text });
            } else {
                getProduct();

            }
        }, 300);
        return () => clearTimeout(delay);
    }, [text]);

    // step 1 search category
    // step 1 search price [min,max]

    const handleCheck = async (e) => {
        const inCheck = e.target.value;             // ค่าที่เรา ติ๊ก
        const inState = [...categorySelected];      // [ ]
        const findCheck = inState.indexOf(inCheck); // ถ้าไม่เจอจะ return -1

        if (findCheck === -1) {
            inState.push(inCheck);
        } else {
            inState.splice(findCheck, 1);
        }
        setCategorySelected(inState);

        if (inState.length > 0) {
            actionSearchFilters({ category: inState });
        } else {
            getProduct()
        }
    }

    // console.log(categorySelected);

    useEffect(() => {
        actionSearchFilters({ price })
    }, [ok])

    const handlePrice = (value) => {
        // console.log(value);
        setPrice(value)
        setTimeout(() => {
            setOk(!ok)
        }, 300);
    }


    return (
        <div>
            {/* search by text */}
            <h1 className='text-xl font-bold mb-4'>ค้นหาสินค้า</h1>
            <input
                onChange={(e) => setText(e.target.value)}
                className='border rounded-md w-full mb-4 px-2 py-1'
                placeholder='ค้นหาสินค้า...'
                type="text"
            />
            <hr />

            {/* search by category */}
            <div className='mb-4'>
                <h1 className='my-3'>หมวดหมู่สินค้า</h1>
                <div>
                    {
                        categories.map((item, index) =>
                            <div className='flex gap-2' key={index}>
                                <input
                                    onChange={handleCheck}
                                    value={item.id}
                                    type='checkbox'
                                />
                                <label>{item.name}</label>
                            </div >
                        )
                    }
                </div>
            </div>
            <hr />
            {/* search by price */}
            <div>
                <h1>ค้นหาราคา</h1>
                <div>
                    <div className='flex justify-between'>
                        <span>min : {numberFormat(price[0])}</span>
                        <span>max : {numberFormat(price[1])}</span>
                    </div>

                    <Slider
                        onChange={handlePrice}
                        range
                        min={0}
                        max={100000}
                        step={100}
                        defaultValue={[1000, 30000]}
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchCard