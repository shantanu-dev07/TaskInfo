import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from 'yup';
import CustomLoaderButton from "../components/CustomLoaderButton";
import Logo from "../components/Logo";
import { useMainContext } from "../context/MainContext";
import { axiosClient } from "../utils/axiosClient";

const Register = () => {
    const[isHide,setIsHide] = useState(true)
    const navigate= useNavigate()
    const {fetchProfile} = useMainContext()
    const [loading,setLoading] = useState(false)
    const onSubmitHandler = async(values,helpers)=>{
        try {
            setLoading(true)
            const response = await axiosClient.post("/register",values)
            const data = await response.data

            toast.success(data.message)
            localStorage.setItem("user0",data.token)
            helpers.resetForm()
            await fetchProfile()
            navigate("/")
        } catch (error) {
            toast.error(error?.response.data.error ||error.message)
        }finally{
            setLoading(false)
        }
    }
    const validationSchema = yup.object({
        name:yup.string().required("Name is Required"),
        email:yup.string().email("Enter Valid Email").required("Email is Required"),
        password:yup.string().required("Password is Required")
    })

    const initialValues = {
        name:"",
        email:"",
        password:""
    }
    return(
    <>
    <div className="min-h-[60vh] flex items-center justify-center flex-col">
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}>

        <Form className="w-[96%] md:w-1/2 lg:w-1/3my-10 bg-white shadow p-10 rounded">
        <div className="mb-3 flex items-center justify-center"><Logo/></div>
        <div className="mb-3">
            <label htmlFor="name">Name</label>
            <Field name="name" id="name" type="text" className="w-full py-2 px-3 rounded border outline-none" placeholder="Enter Your Name" />
            <ErrorMessage name="name" component={'p'} className="text-red-500"/>
            </div>

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
                <CustomLoaderButton isLoading={loading} text='Register'/>
            </div>
            <div className="mb-3">
                <p className="text-end">
                    Already have an account ? <Link to={'/login'}className='font-bold text-blue-700'>Login</Link>
                </p>
            </div>
        </Form>
        </Formik>
    </div>
    </>
    )
}
export default Register