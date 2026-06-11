import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import CustomLoaderButton from '../components/CustomLoaderButton'
import { useMainContext } from '../context/MainContext'
import { axiosClient } from '../utils/axiosClient'
import { taskCategories } from '../utils/constant'
const TaskUpdateView = ({data,fetchData,close}) => {

    const[loading,setLoading] = useState(false)
    const categories =Object.keys(taskCategories)
    const {fetchAllTask} = useMainContext()
    const initialValues = {
        title:data.title ||'',
        description:data.description || '',
        category:data.category || '',

    }
    const validationSchema =yup.object({
        title:yup.string().required("Title is Required"),
        description:yup.string().required("Description is Required"),
        category:yup.string().required("Category is Required").oneOf(categories,"Choose Valid Category")
    })

    const onSubmitHandler = async(values)=>{
        try{
            setLoading(true)
            const response = await axiosClient.put("/task/"+data._id,values,{
                headers:{
                    'user':localStorage.getItem("user") || ''
                }
            })
            const res=await response.data
            toast.success(res.message)
            await fetchAllTask()
            await fetchData()
            close()
        
        }catch(error){
            toast.error(error.response.data.error || error.message)
        }finally{
            setLoading(false)
        }
    }
    return(
        <>
        <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
        >
            <Form className="bg-white mx-auto px-3">
                <div className='py-10 px-2'>
                <div className='mb-3'>
                    <label >Title</label>'
                    <Field name='title' type="text" className='w-full py-3 px-4 border rounded' placeholder="Enter Task Title"/>

                    <ErrorMessage name='title' className='text-red-500' component={'p'}/>
                </div>

                <div className='mb-3'>
                    <label>Description</label>'
                    <Field as='textarea' name='description' type="text" className='w-full py-3 px-4 border rounded' placeholder="Enter Task Description"/>

                    <ErrorMessage name='description' className='text-red-500' component={'p'}/>
                </div>

                <div className='mb-3'>
                    <label>Categories</label>'
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
                    <CustomLoaderButton isLoading={loading} text={'Update Task'}/>
                </div>
                </div>
            </Form>
        </Formik>
        </>
    )
}
export default TaskUpdateView