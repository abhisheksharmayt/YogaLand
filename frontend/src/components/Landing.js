import React from 'react'
import mainBg from '../images/mainBg.jpeg'
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className={`flex flex-col justify-center items-center font-Monst text-4xl text-white w-screen h-screen bg-cover bg-center bg-[url(https://images.pexels.com/photos/169789/pexels-photo-169789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)] sm:text-5xl md:text-6xl lg:text-7xl`}>
            <h2 className='font-bold mb-2'>WELCOME TO</h2>
            <h1 className='font-Inter font-thin'>YOGALAND</h1>
            <Link to='/signup'>
                <button className='text-xl mt-10 lg:mt-16 bg-gradient-to-r from-violet-500 to-fuchsia-500 py-5 px-16 rounded-full transition-all ease-in-out duration-500 hover:scale-110'>Get Started!</button>
            </Link>
        </div>
    )
}

export default Landing