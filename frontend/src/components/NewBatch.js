import React, { useEffect, useState } from 'react'
import loadingSvg from '../images/loading.svg'
import { GrFormClose } from 'react-icons/gr'

const totalBatches = ['Dec', 'Jan', 'Feb', 'Mar', 'April', 'May'];
const data = {
    name: 'Abhishek Sharma',
    email: 'abhisheksharmayt2@gmail.com',
    dob: '12-07-2000',
    batches: [
        {
            id: '1',
            month: 'Jan',
            timing: '6-7AM',
        },
        {
            id: '2',
            month: 'Feb',
            timing: '5-6PM'
        },
        // {
        //     id: '3',
        //     month: 'Mar',
        //     timing: '6-7AM',
        // }
    ]
};

const NewBatch = ({closeJoinMenu}) => {
    const [monthsLeft, setMonthsLeft] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000)

        setTimeout(()=>{
            const months = totalBatches.filter((curr) => {
                return !data.batches.find(m => m.month === curr)
            })
            setMonthsLeft(months)
        },200)
    }, [])

    // useEffect(() => {
    // }, [])
    // console.log(monthsLeft);

    if (loading) {
        return (
            <div className='absolute z-10 h-screen w-screen flex justify-center items-center bg-gray-100'>
                <img className='h-48 w-48 overflow-hidden' src={loadingSvg} alt="" />
            </div>
        )
    }
    else {
        return (
            <div className='flex justify-center items-center w-screen h-screen font-Monst p-5 bg-[#000000b8] fixed z-10'>
                <section className='relative flex flex-col items-center bg-white w-full max-w-lg p-5 rounded-lg'>
                    <button className='absolute right-0 top-0 m-2 flex p-1 bg-white rounded-full text-3xl hover:text-purple-500' onClick={closeJoinMenu}><GrFormClose/></button>
                    <h1 className='text-center font-semibold tracking-wide text-xl mt-3 md:text-3xl md:mb-3 '>Available Batches</h1>
                    <div className="flex flex-col items-center justify-around w-full max-w-lg mt-5 p-4 sm:flex-row">
                        <div className='w-full bg-white mb-5 max-w-lg flex gap-3 items-center justify-center'>
                            <label className='font-medium' htmlFor="name">Batch: </label>
                            <select className='drop-shadow-md border-none rounded-md focus:outline-0' name="batch" id="batch">
                                <option value="first">6-7AM</option>
                                <option value="second">7-8AM</option>
                                <option value="third">8-9AM</option>
                                <option value="fourth">5-6PM</option>
                            </select>
                        </div>
                        <div className='w-full bg-white mb-5 max-w-sm flex items-center gap-3 justify-center'>
                            <label className='font-medium' htmlFor="name">Month: </label>
                            <select className='drop-shadow-md border-none rounded-md focus:outline-0' name="batch" id="batch">
                                {
                                    monthsLeft.map((curr, index) => {
                                        return <option key={index} value={curr}>{curr}</option>
                                    })
                                }
                                {/* <option value="second">7-8AM</option>
                            <option value="third">8-9AM</option>
                        <option value="fourth">5-6PM</option> */}
                            </select>
                        </div>
                    </div>
                    <button className='bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-2 px-5 rounded-full mb-5 font-medium hover:scale-110 transtion duration-200 translate-y-1 md:text-xl'>Pay ₹500</button>
                </section>
            </div>
        )
    }
}

export default NewBatch