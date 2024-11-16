import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useEcomStore from '../store/ecom-store'
import { ChevronDown } from 'lucide-react'

function MainNav() {
    const carts = useEcomStore((state) => state.carts);
    const user = useEcomStore((state) => state.user);
    const logout = useEcomStore((state) => state.logout);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdowm = () => {
        setIsOpen(!isOpen)
    }

    const hdlLogout = () => {
        setIsOpen(!isOpen)
        logout()
    }

    return (
        <nav className='bg-white shadow-md'>
            <div className='mx-auto px-4'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center gap-6'>

                        <Link to={'/'} className='text-2xl font-bold'>LOGO</Link>

                        <NavLink to={'/'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-gray-200 rounded-md px-3 py-1 text-sm font-medium'
                                    : 'hover:bg-gray-200 rounded-md px-3 py-1 text-sm font-medium '
                            }>
                            Home
                        </NavLink>
                        <NavLink to={'/shop'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-gray-200 rounded-md px-3 py-1 text-sm font-medium'
                                    : 'hover:bg-gray-200 rounded-md px-3 py-1 text-sm font-medium '
                            }>
                            Shop
                        </NavLink>
                        <NavLink to={'/cart'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-gray-200 rounded-md px-3 py-1 text-sm font-medium'
                                    : 'hover:bg-gray-200 rounded-md px-3 py-1 text-sm font-medium'
                            }>
                            Cart
                            {carts.length > 0 &&
                                (
                                    <span className='absolute top-0 bg-red-500 rounded-full px-2 text-sm text-white'>{carts.length}</span>
                                )
                            }
                        </NavLink>

                    </div>

                    {
                        user
                            ? // Avatar/logout
                            <div className='flex items-center gap-4'>
                                <button onClick={toggleDropdowm}
                                    className='flex items-center gap-2 hover:bg-gray-200 px-2 py-3 rounded-md'
                                >
                                    <img
                                        className='w-8 h-8'
                                        src="https://cdn-icons-png.flaticon.com/128/1326/1326377.png"
                                    />
                                    <ChevronDown />
                                </button>
                                {
                                    isOpen &&
                                    <div className='absolute top-16 bg-white shadow-md z-50'>
                                        <Link className='block px-4 py-2 hover:bg-gray-200'>
                                            History
                                        </Link>
                                        <button
                                            onClick={() => hdlLogout()}
                                            className='block px-4 py-2 hover:bg-gray-200'>
                                            Logout
                                        </button>
                                    </div>
                                }

                            </div>
                            : // Login / register
                            <div className='flex items-center gap-4'>
                                <NavLink to={'/register'}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-gray-200 rounded-md px-3 py-1 text-sm font-medium'
                                            : 'hover:bg-gray-200 rounded-md px-3 py-1 text-sm font-medium'
                                    }>Register
                                </NavLink>

                                <NavLink to={'/login'}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-gray-200 rounded-md px-3 py-1 text-sm font-medium'
                                            : 'hover:bg-gray-200 rounded-md px-3 py-1 text-sm font-medium'
                                    }>Login
                                </NavLink>
                            </div>
                    }

                </div>
            </div>
        </nav>
    )
}

export default MainNav