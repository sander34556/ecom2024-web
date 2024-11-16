import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();

    const actionLogin = useEcomStore((state) => state.actionLogin);
    const user = useEcomStore((state) => state.user);

    console.log(user);
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await actionLogin(form);
            const role = res.data.payload.role
            roleRedirect(role);
            toast.success('Welcome back');
        } catch (error) {
            console.log(error);
            const errMsg = error.response?.data?.message;
            toast.error(errMsg)
        }
    }

    const roleRedirect = (role) => {
        if (role === 'admin') {
            navigate('/admin');
        } else {
            navigate(-1);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='w-full shadow-md bg-white px-8 max-w-md rounded-md'>
                <h1 className='text-2xl text-center my-4 font-bold'>Login</h1>

                <form onSubmit={handleSubmit}> 
                    <div className='space-y-4 my-6'>

                        <input onChange={handleOnChange}
                            placeholder='Email'
                            className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus: ring-blue-500 focus:border-transparent}`}
                            name='email' type='email'
                        />


                        <input onChange={handleOnChange}
                            className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus: ring-blue-500 focus:border-transparent}`}
                            placeholder='password'
                            name='password'
                            type='password' />

                        <button className='bg-green-500 rounded-md w-full text-white font-bold py-2 shadow hover:bg-blue-700'>
                            Login
                        </button>
                    </div >
                </form>
            </div>
        </div >
    )
}

export default Login