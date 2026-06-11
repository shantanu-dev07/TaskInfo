import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from "react"
import { FaArrowRight, FaEdit, FaEye } from "react-icons/fa"
import { MdClose } from 'react-icons/md'
import { toast } from 'react-toastify'
import { axiosClient } from '../utils/axiosClient'
import LoaderComponent from './LoaderComponent'
import TaskUpdateView from './TaskUpdateView'
import TaskView from './TaskView'

const TaskViewModal = ({id}) => {
        let [isOpen, setIsOpen] = useState(false)
        const [isUpdate,setIsUpdate] = useState(false)
        const [loading,setLoading] = useState(true)
        const [task,setTask] = useState({})


        const fetchData = async()=>{
            try {
                console.log("Task ID:", id)
                setLoading(true)
                const response = await axiosClient.get('/task/' +id,{
                    headers:{
                        user:localStorage.getItem("user") || ''
                    }
                })
                const data = response.data
                setTask(data)

                console.log("Response:", response.data)
                setTask(response.data)



            } catch (error) {
                toast.error(error?.response?.data?.message || error.message)
            }
            finally{
                setLoading(false)
            }
        }
       async function open() {
         await fetchData()
    setIsOpen(true)
    }

    function close() {
    setIsOpen(false)
    }

    return(
        <>
        <button onClick={open} className="px-5 py-2 text-white rounded-full flex items-center justify-center bg-indigo-500 cursor-pointer gap-2">
                    <span>View</span> <FaArrowRight/>
        </button>

        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="w-full max-w-2xl rounded-xl bg-white shadow p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
                <DialogTitle as="div" className="text-base/7 font-medium text-black flex items-center justify-between">
                
                <h3 className='flex items-center justify-center gap-x-3'><span>Task {isUpdate?'Edit':'Details'}</span><button className='text-2xl' onClick={()=>setIsUpdate(!isUpdate)} title='update'>
                    {
                        isUpdate ? <FaEye/>:<FaEdit/>

                    }
                </button></h3>
                <button onClick={close} className='text-xl p-1 bg-black rounded-full text-white'><MdClose/></button>
                </DialogTitle>

               {loading ?  <>
               <div className='w-full min-h-[40vh] flex items-center justify-center'>
                <LoaderComponent/>
               </div>
               
               </> :<section className='w-full min-h-[40vh] bg-gray-100 rounded-2xl p-2 py-4 mt-3'>

                {
                    isUpdate?<TaskUpdateView data={task} fetchData={fetchData} close={close}/>: <TaskView data={task} close={close}/>
                }
                </section>}



            
                
            
            </DialogPanel>
            </div>
        </div>
        </Dialog>
        </>
    )
}
export default TaskViewModal