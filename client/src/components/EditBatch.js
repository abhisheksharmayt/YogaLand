import React,{useState} from 'react'
import loadingSvg from '../images/loading.svg'
import { GrFormClose } from 'react-icons/gr'

const EditBatch = ({ closeEditMenu, editInfo }) => {
    const {batchId, month, timing} = editInfo;
    const [loading, setLoading] = useState(false);
    const d = new Date;
    const [userData, setUserData] = useState({batchId:batchId, timing:timing });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log(userData);
            setLoading(true);
            let res = await fetch('/api/batch/change', {
                method: "PATCH",
                body: JSON.stringify(userData),
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            // console.log(JSON.stringify(userData))
            // console.log(res);
            let resJson = await res.json();
            if (res.status === 201) {
                setLoading(false);
                closeEditMenu()
            } else {
                setLoading(false);
                // console.log(resJson);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({...userData, [name]: value });
    }

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
                    <button className='absolute right-0 top-0 m-2 flex p-1 bg-white rounded-full text-3xl hover:text-purple-500' onClick={()=>{
                        closeEditMenu()
                    }}><GrFormClose /></button>
                    <h1 className='text-center font-semibold tracking-wide text-xl mt-3 md:text-3xl md:mb-3 '>Edit {month} Timing</h1>
                    <div className="flex flex-col items-center justify-around w-full max-w-lg mt-5 p-4 sm:flex-row">

                        <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                            <div className='w-full bg-white mb-5 max-w-lg flex gap-3 items-center justify-center'>
                                <label className='font-medium' htmlFor="timing">Batch: </label>
                                <select className='drop-shadow-md border-none rounded-md focus:outline-0' name="timing" id="timing" defaultValue={userData.timing} onChange={handleChange}>
                                    <option value="6-7AM">6-7AM</option>
                                    <option value="7-8AM">7-8AM</option>
                                    <option value="8-9AM">8-9AM</option>
                                    <option value="5-6PM">5-6PM</option>
                                </select>
                            </div>
                            
                            <button className='bg-gradient-to-r from-violet-500 to-fuchsia-500 w-24 text-white py-2 px-5 rounded-full mb-5 font-medium hover:scale-110 transtion duration-200 translate-y-1 md:text-xl'>Edit</button>
                        </form>
                    </div>
                </section>
            </div>
        )
    }
}

export default EditBatch