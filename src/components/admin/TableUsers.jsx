import React, { useEffect, useState } from 'react'
import { getListAllUsers, changeUserStatus, changeUserRole } from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify';

const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([])

  useEffect(() => {
    hdlGetListUsers(token)
  }, [])

  const hdlGetListUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        console.log(res)
        setUsers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChangeUserStatus = (userId, userStatus) => {
    console.log(userId, userStatus);
    const value = {
      id: userId,
      enabled: !userStatus
    }
    changeUserStatus(token, value)
      .then((res) => {
        console.log(res)
        hdlGetListUsers(token)
        toast.success('Update status success');
      })
      .catch(err => console.log(err))

  }
  const handleChangeUserRole = (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole
    }
    changeUserRole(token, value)
      .then((res) => {
        console.log(res);
        hdlGetListUsers(token);
        toast.success('Update role success');
      })
      .catch(err => console.log(err))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case true: return 'bg-green-200'
      case false: return 'bg-gray-300'
      default: break;
    }
  }


  return (
    <div className='container mx-auto p-4 bg-white shadow-md '>
      <table className='w-full'>
        <thead>
          <tr>
            <th className='text-left'>ลำดับ</th>
            <th className='text-left'>Email</th>
            <th className='text-left'>สิทธิ์</th>
            <th className='text-left'>สถาณะ</th>
            <th className='text-left'>action</th>
          </tr>
        </thead>
        <tbody>
          {
            users?.map((item, index) => (
              <tr key={index} className=''>
                <td>{index + 1}</td>
                <td>{item.email}</td>

                <td>
                  <select
                    onChange={(e) => handleChangeUserRole(item.id, e.target.value)}
                    value={item.role}
                  >
                    <option>user</option>
                    <option>admin</option>
                  </select>
                </td>


                <td className='py-2'>
                  <span className={`${getStatusColor(item.enabled)} px-4 py-1 rounded-full text-sm `}>
                    {item.enabled ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <button
                    className='bg-yellow-300 px-3 py-1 rounded-md shadow-md text-sm'
                    onClick={() => handleChangeUserStatus(item.id, item.enabled)}>
                    {item.enabled ? 'Disable' : 'Enable'}
                  </button>

                </td>
              </tr>

            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default TableUsers