import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import TaskCard from "../components/TaskCard"
import { useMainContext } from "../context/MainContext"



const Dashboard = () => {
    const{tasks} = useMainContext()
    const [search,setSearch] = useState('')
    const filterResults = tasks.length>0 ? tasks.filter((cur)=>{
        const x = search.toLowerCase()
        const y =cur.title.trim().toLowerCase()
        const z =cur.description.trim().toLowerCase()
        return y.includes(x) || y.startsWith(x) || y.endsWith(x) || z.includes(x) || z.startsWith(x) || z.endsWith(x)
    }) :[]

    return (
    <>

        <div className="mb-3 flex items-center justify-center bg-white hover:shadow outline-none px-10">
        <CiSearch className="text-2xl"/>    <input onChange={(e)=>setSearch(e.target.value)} value={search} type="text" className="w-full py-3 outline-none px-4 "
        placeholder="Search Task" />
        </div>
       <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 w-[97%] lg:w-[80%] mx-auto py-10">
        {
            filterResults.length>0 ? filterResults.map((cur,i)=>{
                return <TaskCard data={cur} key={i}/>
            }):
            <>
            <div className="col-span-3 text-center">
                <h1 className="text-center text-3xl font-black">No Task Have</h1>
            </div>
            </>
        }
       </div>
    </>
    )
}
export default Dashboard