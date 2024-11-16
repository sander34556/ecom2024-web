import React, { useEffect, useState } from 'react'
import { getOrders } from '../../api/user';
import useEcomStroe from '../../store/ecom-store'
import { dateFormat } from '../../utils/dateFornmat';
import { numberFormat } from '../../utils/number';

const HistoryCard = () => {
    const token = useEcomStroe((state) => state.token)
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        hdlGetOrders(token)
    }, [])

    const hdlGetOrders = (token) => {
        getOrders(token)
            .then((res) => {
                setOrders(res.data.orders)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Not process": return 'bg-gray-200'
            case "Processing": return 'bg-blue-300'
            case "Completed": return 'bg-green-300'
            case "Canceled": return 'bg-red-400'
            default: break;
        }
    }


    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold'>ประวัติการสั่งซื้อ</h1>

            <div className='space-y-4'>
                {/* Card */}

                {
                    orders?.map((item, index) => {
                        return (
                            <div key={index} className='bg-gray-100 p-4 rounded-md shadow-md'>
                                {/* header */}
                                <div className='flex justify-between mb-2'>
                                    <div>
                                        <p className='text-sm'>Order date</p>
                                        <p className='font-bold'>{dateFormat(item.updatedAt)}</p>
                                    </div>
                                    <div className=''>
                                        <span className={`${getStatusColor(item.orderStatus)} px-3 p-1 rounded-full`}>
                                            {item.orderStatus}
                                        </span>
                                    </div>
                                </div>

                                {/* table */}
                                <div>
                                    <table className='border w-full'>
                                        <thead>
                                            <tr className='bg-gray-200'>
                                                <th className='text-left'>สินค้า</th>
                                                <th className='text-left'>ราคา</th>
                                                <th className='text-left'>จำนวน</th>
                                                <th className='text-left'>รวม</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                item.products?.map((product, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{product.product.title} </td>
                                                            <td>{numberFormat(product.product.price)} </td>
                                                            <td>{product.count}</td>
                                                            <td>{numberFormat(product.count * product.product.price)}</td>
                                                        </tr>)
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                {/* total */}
                                <div className=''>
                                    <div className='text-right'>
                                        <p>ราคาสุทธิ</p>
                                        <p>{numberFormat(item.cartTotal)}</p>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }




            </div>
        </div>
    )
}

export default HistoryCard