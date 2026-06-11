import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useMainContext } from "../context/MainContext";
import { axiosClient } from '../utils/axiosClient';
import { taskCategories } from "../utils/constant";


const TaskView = ({data,close}) =>{

    const category = data.category;
    const categoryClass = taskCategories[category]
    const [loading,setLoading] = useState(false)
    const {fetchAllTask} = useMainContext()
    const deleteHandler = async()=>{
        try{
                setLoading(true)
                const response = await axiosClient.delete("/task/"+data._id,{
                    headers:{
                        'user':localStorage.getItem("user") || ''
                    }
                })
                const res=await response.data
                toast.success(res.message)

                await fetchAllTask()
                close()  
                }catch(error){
                    toast.error(error?.response?.data?.error || error.message)
                }finally{
                    setLoading(false)
                }
    }
    return(
        <>
            <h3 className="text-3xl font-bold text-black mb-3">{data.title}</h3>
            <p className="text-3xl font-semibold text-zinc-700 mb-3">{data.description}</p>
            <p>Category:
                <span className={`${categoryClass}capitalize mb-3`}>status:{category}</span>
            </p>

            <div className="flex items center justify-center">
                <button onClick={deleteHandler} disabled={loading} className="flex items-center justify-center gap-x-2 bg-red-600 text-white px-4 py-2
                cursor-pointer disabled:bg-red-700 rounded shadow">Delete {
                loading? <CgSpinner className="animate-spin"/>:<FaTrash/>}</button>
            </div>
        </>

    )
}
export default TaskView