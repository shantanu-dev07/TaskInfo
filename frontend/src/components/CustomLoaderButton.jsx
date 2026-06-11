import { CgSpinner } from "react-icons/cg"
import { FaArrowRight } from "react-icons/fa"

const CustomLoaderButton = ({text,isLoading,type='submit'}) => {
    return(
        <>
        <button type={type} disabled={isLoading} className='w-full py-2 px-3 disabled:bg-indigo-400 text-white rounded bg-indigo-700 flex cursor-pointer items-center justify-center gap-x-2 duration-100'><span>{text}</span>{
            isLoading ? <CgSpinner className='text-xl animate-spin duration-75' />:
            <FaArrowRight/>
        
        }</button>
    </>
    )
}
export default CustomLoaderButton