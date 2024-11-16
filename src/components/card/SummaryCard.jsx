import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import { listUserCart, saveAdress } from '../../api/user'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { numberFormat } from '../../utils/number';
const SummaryCard = () => {
    const token = useEcomStore((state) => state.token);
    const [products, setProducts] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    const [address, setAddress] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        hdlGetUserCart()

    }, [])

    const hdlGetUserCart = async () => {
        listUserCart(token)
            .then((res) => {
                setProducts(res.data.products)
                setCartTotal(res.data.cartTotal)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const hdlSaveAddress = () => {
        console.log(address);
        if (!address) {
            return toast.warning('Please fill address')
        }
        saveAdress(token, address)
            .then((res) => {
                console.log(res)
                toast.success(res.data.message)
                setAddressSaved(true)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const hdlGoToPayment = () => {
        if (!addressSaved) {
            return toast.warning('กรุณากรอกที่อยู่จัดส่ง');
        }
        navigate('/user/payment');

    }

    return (
        <div className='mx-auto'>
            <div className='flex gap-4'>
                {/* Left */}
                <div className='w-2/4'>
                    <div className='space-y-2 bg-gray-100 p-4 rounded-md border shadow-md'>
                        <h1 className='text-lg font-bold'>ที่อยู้ในการจัดส่ง</h1>
                        <textarea
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder='กรุณากรอกที่อยู่จัดส่ง'
                            className='w-full px-2 rounded-md'
                            name="" id=""
                        />
                        <button
                            onClick={hdlSaveAddress}
                            className='bg-blue-500 text-white rounded-md px-4 py-2 shadow-md hover:bg-blue-700 hover:scale-105 hover:duration-200'>
                            Save Address
                        </button>
                    </div>
                </div>

                {/* Right */}
                <div className='w-2/4'>
                    <div className='bg-gray-100 p-4 rounded-md border shadow-md space-y-4'>
                        <h1 className='text-lg font-bold'>คำสั่งซื้อของคุณ</h1>
                        {/* item list */}

                        {
                            products?.map((item, index) => (
                                <div key={index}>
                                    <div className='flex justify-between items-start'>
                                        <div>
                                            <p className='font-bold'>{item.product.title}</p>
                                            <p className='text-sm '>จำนวน : {item.count} x {numberFormat(item.price)}</p>
                                        </div>
                                        <div>
                                            <p className='text-red-500 font-bold'>{numberFormat(item.count * item.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }




                        <hr />
                        <div>
                            <div className='flex justify-between'>
                                <p>ค่าจัดส่ง :</p>
                                <p>0.00</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>ส่วนลด :</p>
                                <p>0.00</p>
                            </div>
                            <hr />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <p className='font-bold'>ยอดรวมสุทธิ :</p>
                                <p className='text-red-500 font-bold'>{numberFormat(cartTotal)}</p>
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={hdlGoToPayment}
                                // disabled={!addressSaved}
                                className='bg-green-400 w-full p-2 rounded-md shadow-md text-white hover:bg-green-600'>
                                ดำเนินการชำระเงิน
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SummaryCard