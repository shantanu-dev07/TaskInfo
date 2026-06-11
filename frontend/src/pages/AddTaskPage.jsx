import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import CustomLoaderButton from '../components/CustomLoaderButton'
import { useMainContext } from '../context/MainContext'
import { axiosClient } from '../utils/axiosClient'
import { taskCategories } from '../utils/constant'
const AddTaskPage = () => {

    const[loading,setLoading] = useState(false)
    const categories =Object.keys(taskCategories)
    const{fetchAllTask} = useMainContext()
    const initialValues = {
        title:'',
        description:'',
        category:'',

    }
    const validationSchema =yup.object({
        title:yup.string().required("Title is Required"),
        description:yup.string().required("Description is Required"),
        category:yup.string().required("Category is Required").oneOf(categories,"Choose Valid Category")
    })

    const onSubmitHandler = async(values,helpers)=>{
        try{
            setLoading(true)
            const response = await axiosClient.post("/add-task",values,{
                headers:{
                    'user':localStorage.getItem("user") || ''
                }
            })
            const data=await response.data
            toast.success(data.message)
            helpers.resetFrom()
            await fetchAllTask
        }catch(error){
            toast.error(error.response.data.error || error.message)
        }finally{
            setLoading(false)
        }
    }
    return(
        <>
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
        >
            <Form className="bg-white rounded shadow lg:w-[70%] mx-auto my-10 py-10 px-3 lg:px-10">
                <h1 className="text-start text-4xl font-bold">Add Task</h1>
                <div className='mb-3'>
                    <label htmlFor=''>Title</label>'
                    <Field name='title' type="text" className='w-full py-3 px-4 border rounded' placeholder="Enter Task Title"/>

                    <ErrorMessage name='title' className='text-red-500' component={'p'}/>
                </div>

                <div className='mb-3'>
                    <label htmlFor=''>Description</label>'
                    <Field as='textarea' name='description' type="text" className='w-full py-3 px-4 border rounded' placeholder="Enter Task Description"/>

                    <ErrorMessage name='description' className='text-red-500' component={'p'}/>
                </div>

                <div className='mb-3'>
                    <label htmlFor=''>Categories</label>'
                    <Field name='category' as="select" className='w-full py-3 px-4 border rounded'>
                        <option value="">-----select-----</option>
                        {
                            categories.map((cur,i)=>{
                                return <option key={i} value={cur} className='capitalize'>{cur}</option>
                            })
                        }
                    </Field>

                    <ErrorMessage name='category' className='text-red-500' component={'p'}/>
                </div>
                <div className="mb-3">
                    <CustomLoaderButton isLoading={loading} text={'Add'}/>
                </div>
            </Form>
        </Formik>
        </>
    )
}
export default AddTaskPage