import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from 'yup';
import CustomLoaderButton from "../components/CustomLoaderButton";
import Logo from "../components/Logo";
import { useMainContext } from "../context/MainContext";
import { axiosClient } from "../utils/axiosClient";

const LoginPage = () => {
    const[isHide,setIsHide] = useState(true)
    const navigate = useNavigate()
    const {fetchProfile} = useMainContext()
    const [loading,setLoading] = useState(false)
    const onSubmitHandler = async(values,helpers)=>{
            try {
                setLoading(true)
                const response = await axiosClient.post("/login",values)
                const data = response.data
    
                toast.success(data.message)
                localStorage.setItem("user",data.token)
                helpers.resetForm()
                fetchProfile()
                navigate("/")
            } catch (error) {
                toast.error(error?.response.data.error ||error.message)
            }finally{
                setLoading(false)
            }
        }
    const validationSchema = yup.object({
        email:yup.string().email("Enter Valid Email").required("Email is Required"),
        password:yup.string().required("Password is Required")
    })

    const initialValues = {
        email:"",
        password:""
    }
    return(
    <>
    <div className="flex items-center justify-center py-10">
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}>

        <Form className="w-[96%] md:w-1/2 lg:w-1/3 bg-white shadow my-10 p-10 rounded">
        <div className="mb-3 flex items-center justify-center"><Logo/></div>

            <div className="mb-3">
            <label htmlFor="email">EMail</label>
            <Field name="email" id="email" type="email" className="w-full py-2 px-3 rounded border outline-none" placeholder="Enter Your Email" />
            <ErrorMessage name="email" component={'p'} className="text-red-500"/>
            </div>

            <div className="mb-3">
            <label htmlFor="password">Password</label>
            <div className="w-full py-2 px-3 rounded border flex">
            <Field name="password" id="password" type={isHide?"password":"text"} className="w-full outline-none" placeholder="Enter Your Password" />
            <button onClick={()=>setIsHide(!isHide)} className="text-zinc-500 cursor-pointer text-sm font-bold" type="button">
                {
                    isHide?'SHOW':'HIDE'
                }
            </button>
            </div>
            <ErrorMessage name="password" component={'p'} className="text-red-500"/>
            </div>

            <div className="mb-3">
                <CustomLoaderButton isLoading={loading} text='Login'/>
            </div>
            <div className="mb-3">
                <p className="text-end">
                    Don't have an account ? <Link to={'/register'}className='font-bold text-blue-700'>Register</Link>
                </p>
            </div>
        </Form>
        </Formik>
    </div>
    </>
    )
}
export default LoginPage