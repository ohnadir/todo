import axios from 'axios';
import React from 'react';
import { useState } from 'react';


const initialCategories = {
    title: '',
    desc: '',
    category: ''
}

const initialCategoriesErrors = {
    title: '',
    desc:'',
    category: '',
    message: ''
}
const AddCategories = () => {
    const [categories, setCategories] = useState([initialCategories]);
    const [errors, setErrors] = useState(initialCategoriesErrors);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setCategories((prev)=> ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let tempErrors = {};
        setLoading(true);
        if(!categories?.title || !categories?.desc){
            setErrors((prev)=> ({...prev, title: 'Title is Required', desc: 'Description is Required'}))
            tempErrors= {...tempErrors, title: 'Title is Required', desc: 'Description is Required'}
        }else{
            setErrors((prev)=> ({...prev, name: '', email: '', password: ''}))
            tempErrors= {...tempErrors, name: '', email: '', password: ''}
        }
        /* if(!categories?.title){
            setErrors((prev)=> ({...prev, title: 'Title is Required'}))
            tempErrors= {...tempErrors, title: 'Title is Required'}
        }else{
            setErrors((prev)=> ({...prev, title: ''}))
            tempErrors= {...tempErrors, title: ''}
        }

        if(!categories?.desc){
            setErrors((prev)=> ({...prev, desc: 'Description is Required'}))
            tempErrors= {...tempErrors, desc: 'Description is Required'}
        }else{
            setErrors((prev)=> ({...prev, desc: ''}))
            tempErrors= {...tempErrors, desc: ''}
        } */

        if(!tempErrors?.title || !tempErrors?.desc){
            try{
                const {data, status} = await axios.post('http://localhost:4000/category', categories)
                if(status === 201){
                    setSuccess(data?.success);
                    setTimeout(()=>{
                        setSuccess('')
                    }, 2000)
                }
            }
            catch(error){
                setErrors((prev)=>({
                    ...prev, title: errors?.response?.data?.title,
                    desc: errors?.response?.data?.desc,
                }));
                setLoading(false);
            }
        }
        setLoading(false);
    }
    return(
        <div className='w-[500px] mx-auto mt-20'>
        {success ? <h5 className='text-green-200'>{success}</h5> : null}
        <div className=''>
            <form className='grid grid-cols-1 gap-3' onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="" className='text-cyan-600 '>Title</label>
                    <input onChange={handleChange} className='bg-gray-100 w-full p-2 outline-0' type="text" name='title' placeholder='Enter Title' />
                    {errors?.title ? <p className='text-red-600'>{errors.title}</p> : null }
                </div>
                <div>
                    <label htmlFor="" className='text-cyan-600 '>Description</label>
                    <input onChange={handleChange} className='bg-gray-100 w-full p-2 outline-0' type="text" name='desc'  placeholder='Enter Description'/>
                    {errors?.desc ? <p className='text-red-600'>{errors.desc}</p> : null }
                </div>
                
                <button 
                type='submit'
                disabled={loading}
                className='bg-cyan-600 w-full py-2 text-white text-center'>{loading ? 'Adding Category...' : 'Add Category'}</button>
            </form>
        </div>
    </div>
    )
}
export default AddCategories;