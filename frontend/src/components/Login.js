import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import loadingSvg from '../images/loading.svg'

const Login = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [])
    if (loading) {
        return (
            <div className='h-screen w-screen flex justify-center items-center bg-gray-100'>
                <img className='h-48 w-48 overflow-hidden' src={loadingSvg} alt="" />
            </div>
        )
    }
  return (
      <main className='bg-purple-50 flex justify-center items-center w-screen min-h-screen'>
          <section className='bg-white my-10 mx-4 rounded-lg overflow-hidden p-4 lg:flex drop-shadow-md'>
              <div className='h-fit lg:w-1/2'>
                  <img className='w-full max-w-lg object-cover rounded-lg lg:h-full' src='https://img.freepik.com/free-vector/meditation-illustration-concept_23-2148552131.jpg?w=1380&t=st=1670779514~exp=1670780114~hmac=0e2eea61cf54ee26dc4e22a6ed9f029d8b7ac249008e5309bd32ef5962b8ed3d' alt="yoga_img" />
              </div>
              <div className='w-full pt-6 flex flex-col lg:mx-10 items-center lg:justify-center lg:pl-4 lg:w-1/2 h-fit'>
                  <h1 className='text-xl md:text-3xl font-medium'>Welcome to YOGALAND!</h1>
                  <form className='w-full h-full py-5 text-gray-600 flex flex-col items-center justify-center' action="">
                      <div className='w-full bg-white mb-5 max-w-sm'>
                          <label className='block font-medium pb-3' htmlFor="email">Email: </label>
                          <input className='w-full border-none rounded-lg overflow:hidden drop-shadow-md' id="email" type="email" placeholder='something@mail.com' name="email" />
                      </div>
                      <div className='w-full bg-white mb-5 max-w-sm'>
                          <label className='block font-medium pb-3' htmlFor="password">Password: </label>
                          <input className='w-full border-none rounded-lg overflow:hidden drop-shadow-md' id="password" type="password" placeholder='**********' name="password" />
                      </div>
                      <Link className='w-full max-w-sm' to='/signup'>
                          <p className='text-gray-500 text-sm mb-5'>Not a member? <span className='text-purple-500 underline decoration-1 hover:no-underline'>SignUp</span>
                          </p>
                      </Link>
                      <button className='w-full max-w-sm text-center rounded-lg bg-purple-500 hover:bg-purple-600 text-white py-3 font-medium text-lg transition-all ease-in-out'>
                          Submit
                      </button>
                  </form>
              </div>
          </section>
      </main>
  )
}

export default Login