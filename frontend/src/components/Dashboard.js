import React, { useEffect, useState } from 'react'
import useFetchGet from '../hooks/useFetchGet';
import loadingSvg from '../images/loading.svg'
import EditBatch from './EditBatch';
import NewBatch from './NewBatch';
const baseUrl = process.env.REACT_APP_BASE_URL;
const totalBatches = ['December', 'January', 'Feburary', 'March', 'April', 'May'];
const allMonths = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Dashboard = () => {
    const d = new Date;
    const [showJoin, setShowJoin] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editInfo, setEditInfo] = useState({batchId: -1, month: "", timing: ""});
    const { data, loading } = useFetchGet(`/api/user/me`);
    const response2 = useFetchGet(`/api/batch`, showJoin, showEdit);
    const openJoinMenu = () => { setShowJoin(true) };
    const openEditMenu = () => { setShowEdit(true) };
    const closeJoinMenu = () => { setShowJoin(false) };
    const closeEditMenu = () => { setShowEdit(false) };

    const [monthsLeft, setMonthsLeft] = useState([]);

    if (loading || response2.loading) {
        return (
            <div className='h-screen w-screen flex justify-center items-center bg-gray-100'>
                <img className='h-48 w-48 overflow-hidden' src={loadingSvg} alt="" />
            </div>
        )
    }
    const months = totalBatches.filter((curr) => {
        return !response2.data.batch.find(m => m.month === curr)
    })
    return (
        <>
            <main className={`relative bg-purple-50 flex justify-center items-center w-screen min-h-screen font-Monst`} disabled={(showJoin)}>
                {(showJoin) && (<NewBatch batches={response2.data.batch} closeJoinMenu={closeJoinMenu} monthsLeft={months}/>)}
                {(showEdit && editInfo.batchId != -1) && (<EditBatch editInfo={editInfo} closeEditMenu={closeEditMenu}/>)}
                <section className='bg-white h-fit w-full max-w-2xl  drop-shadow-md rounded-lg p-5 m-5 flex flex-col items-center'>
                    <h1 className='text-center font-semibold tracking-wide text-xl mt-5 md:text-3xl md:mb-3 '>DASHBOARD</h1>
                    <h2 className='text-center w-full text-lg mt-3 md:text-xl md:mb-3'>Hi, <span className='font-medium text-purple-400'>{data.user.name}</span></h2>
                    <div className='flex flex-col w-full p-2 font-medium md:flex-row md:justify-between md:px-14 md:mb-5'>
                        <p className='text-gray-800 text-sm text-center mb-1'>Email: {data.user.email}</p>
                        <p className='text-gray-800 text-sm text-center'>DOB: {data.user.dob}</p>
                    </div>
                    <div className='flex flex-col w-full p-2 items-center'>
                        <h3 className='text-lg font-medium md:mb-3 md:text-xl'>Current Enrolled Batches</h3>
                        <ul className='my-2 w-full max-w-lg md:mb-5'>
                            {
                                response2.data.batch.map((batch) => {
                                    const { id, month, timing } = batch;
                                    // console.log(id,month, timing);
                                    return (
                                        <li key={id} className='w-full p-2 flex justify-around my-2 border-2 border-purple-200 rounded-lg hover:scale-105 transition-all duration-200'>
                                            <p>{month}</p>
                                            <p>{timing}</p>
                                            {
                                                (month != allMonths[d.getMonth()]) && 
                                                (<button className='text-purple-500 underline underline-offset-2 hover:no-underline transition-all' onClick={()=>{
                                                    setEditInfo({batchId: id, month: month, timing:timing})
                                                    openEditMenu()
                                                }}>edit</button>)
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        {
                            (monthsLeft.length == 0) &&
                            (
                                <button className='bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-2 px-5 rounded-full font-medium hover:scale-110 transtion duration-200 translate-y-1 md:text-xl' onClick={openJoinMenu}>Join Batches</button>
                            )
                        }
                    </div>
                </section>
            </main>
        </>
    )
}

export default Dashboard