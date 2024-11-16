import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from 'zxcvbn'

const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password ต้องมากกว่า 8 ตัวอักษร' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password ไม่ตรงกัน',
  path: ["confirmPassword"],
})


const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const validatePassword = () => {
    let password = watch().password
    return zxcvbn(password ? password : '').score
  }

  useEffect(() => {
    setPasswordScore(validatePassword())
  }, [watch().password])

  console.log(passwordScore);

  const onSubmit = async (data) => {
    console.log(data);
    // const passwordScore = zxcvbn(data.password).score
    // if (passwordScore < 2) {
    //   toast.warning('Password not strong')
    //   return
    // }
    // console.log('okkkkk');

    try {
      const res = await axios.post('https://ecom2024-api-omega.vercel.app/api/register', data);
      toast.success(res.data)
      console.log(res);
    } catch (error) {
      const errMsg = error.response?.data?.message
      toast.error(errMsg)
    }
  }


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full shadow-md bg-white px-8 max-w-md rounded-md'>

        <h1 className='text-2xl text-center my-4 font-bold'>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4 my-6'>
            <div>
              <input {...register("email")}
                placeholder='Email'
                className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus: ring-blue-500 focus:border-transparent ${errors.email && 'border-red-500'}`}
              />
              {
                errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>
              }
            </div>

            <div>
              <input {...register("password")}
                placeholder='Passsword'
                type='password'
                className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus: ring-blue-500 focus:border-transparent ${errors.email && 'border-red-500'}`}
              />
              {
                errors.password && <p className='text-red-500 text-sm'>{errors.password?.message}</p>
              }

              {
                watch().password?.length > 0 &&
                <div className='flex mt-2'>
                  {
                    Array.from(Array(5).keys()).map((item, index) =>
                      <span className='w-1/5 px-1' key={index}>
                        <div className={`rounded h-2 ${passwordScore <= 2 ? 'bg-red-500' : passwordScore < 4 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                      </span>
                    )
                  }
                </div>
              }

            </div>

            <div>

              <input {...register("confirmPassword")}
                placeholder='Confirm passsword'
                type='password'

                className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus: ring-blue-500 focus:border-transparent ${errors.email && 'border-red-500'}`}
              />
              {
                errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>
              }
            </div>

            <button className='bg-blue-500 rounded-md w-full text-white font-bold py-2 shadow hover:bg-blue-700'>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register