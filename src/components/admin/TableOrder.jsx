import React, { useEffect, useState } from 'react'
import { changeOrderStatus, getOrdersAdmin } from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify';
import { numberFormat } from '../../utils/number';
import moment from 'moment/min/moment-with-locales';
import { dateFormat } from '../../utils/dateFornmat';



const TableOrder = () => {
    const token = useEcomStore((state) => state.token);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        hdlGetOrder(token);
    }, [])

    const hdlGetOrder = (token) => {
        getOrdersAdmin(token)
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const hdlChangeOrderStatus = (token, orderId, orderStatus) => {
        console.log(orderId, orderStatus);
        changeOrderStatus(token, orderId, orderStatus)
            .then((res) => {
                console.log(res)
                toast.success('Status updated')
                hdlGetOrder(token)
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
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <div>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-gray-200 border'>
                            <th>ลำดับ</th>
                            <th>ผู้ใช้งาน</th>
                            <th>วันที่</th>
                            <th>สินค้า</th>
                            <th>รวม</th>
                            <th>สถาณะ</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((item, index) => {
                                console.log(item)
                                return (
                                    <tr key={index} className='border'>
                                        <td className='text-center'>{index + 1}</td>
                                        <td>
                                            <p>{item.orderedBy.email}</p>
                                            <p>{item.orderedBy.address}</p>
                                        </td>
                                        <td>{dateFormat(item.crearedAt)}</td>

                                        <td className='px-2 py-4'>
                                            {
                                                item.products?.map((product, index) => (
                                                    <li key={index}>
                                                        <span>{product.product.title} : </span>
                                                        <span className='text-sm'>{product.count} x  {numberFormat(product.product.price)}</span>
                                                        <br />
                                                    </li>
                                                ))
                                            }
                                        </td>

                                        <td>{numberFormat(item.cartTotal)}</td>


                                        <td>
                                            <span className={`${getStatusColor(item.orderStatus)} px-3 py-1 rounded-full`}>
                                                {item.orderStatus}
                                            </span>
                                        </td>

                                        <td>
                                            <select
                                                value={item.orderStatus}
                                                onChange={(e) => hdlChangeOrderStatus(token, item.id, e.target.value)}
                                            >
                                                <option>Not process</option>
                                                <option>Processing</option>
                                                <option>Completed</option>
                                                <option>Canceled</option>
                                            </select>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div >
        </div >
    )
}

export default TableOrder