import { SiGoogletasks } from "react-icons/si";
import { Link } from 'react-router-dom';
const Logo = () => {
    return(
        <>
        <Link to={'/'} className='flex items-center gap-x-1 text-2xl'>
        <SiGoogletasks className='text-2xl text-green-600'/><span className='font-bold text-2xl'>Taskinfo</span>
        <span className="w-2 h-2 bg-orange-500 animate-spin"></span>
        </Link>

        </>
    )
}
export default Logo