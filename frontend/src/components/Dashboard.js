import React, { useEffect, useState } from 'react'
import loadingSvg from '../images/loading.svg'
import NewBatch from './NewBatch';
const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const data = {
    name: 'Abhishek Sharma',
    email: 'abhisheksharmayt2@gmail.com',
    dob: '12-07-2000',
    batches: [
        {
            id: '0',
            month: 'Dec',
            timing: '6-7AM',
        },
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

const Dashboard = () => {
    const d = new Date;
    const currentMonth = d.getMonth();
    const [loading, setLoading] = useState(true);
    const [showJoin, setShowJoin] = useState(false);
    const openJoinMenu = () => { setShowJoin(true) };
    const closeJoinMenu = () => { setShowJoin(false) };
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
    // ${(!showJoin) ? ('') : ''}
    return (
        <>
            <main className={`relative bg-purple-50 flex justify-center items-center w-screen min-h-screen font-Monst`} disabled={(showJoin)}>
                {(showJoin) && (<NewBatch closeJoinMenu={closeJoinMenu} />)}
                <section className='bg-white h-fit w-full max-w-2xl  drop-shadow-md rounded-lg p-5 m-5 flex flex-col items-center'>
                    <h1 className='text-center font-semibold tracking-wide text-xl mt-5 md:text-3xl md:mb-3 '>DASHBOARD</h1>
                    <h2 className='text-center w-full text-lg mt-3 md:text-xl md:mb-3'>Hi, <span className='font-medium text-purple-400'>{data.name}</span></h2>
                    <div className='flex flex-col w-full p-2 font-medium md:flex-row md:justify-between md:px-14 md:mb-5'>
                        <p className='text-gray-800 text-sm text-center mb-1'>Email: {data.email}</p>
                        <p className='text-gray-800 text-sm text-center'>DOB: {data.dob}</p>
                    </div>
                    <div className='flex flex-col w-full p-2 items-center'>
                        <h3 className='text-lg font-medium md:mb-3 md:text-xl'>Current Enrolled Batches</h3>
                        <ul className='my-2 w-full max-w-lg md:mb-5'>
                            {
                                data.batches.map((batch) => {
                                    const { id, month, timing } = batch;
                                    return (
                                        <li key={id} className='w-full p-2 flex justify-around my-2 border-2 border-purple-200 rounded-lg hover:scale-105 transition-all duration-200'>
                                            <p>{month}</p>
                                            <p>{timing}</p>
                                            {
                                                (month != months[currentMonth]) && 
                                                (<button className='text-purple-500 underline underline-offset-2 hover:no-underline transition-all'>edit</button>)
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <button className='bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-2 px-5 rounded-full font-medium hover:scale-110 transtion duration-200 translate-y-1 md:text-xl' onClick={openJoinMenu}>Join Batches</button>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Dashboard