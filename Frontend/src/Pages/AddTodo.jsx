import axios from 'axios';
import React, { useState } from 'react';



const initialTodo = {
    title: '',
    desc: '',
    category: ''
}

const initialTodoErrors = {
    title: '',
    desc:'',
    category: '',
    message: ''
}
const AddTodo = ()=>{
    const [todo, setTodo]= useState([initialTodo])
    const [errors, setErrors] = useState(initialTodoErrors);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);


    const handleChange = (e)=>{
        setTodo( (prev)=> ({...prev, [e.target.name]: e.target.value}))
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let tempErrors = {};
        setLoading(true);

        if(!todo?.title || !todo?.desc || !todo?.category){
            setErrors((prev)=> ({...prev, title: 'Title is Required', desc: 'Description is Required', category: 'Category is Required'}))
            tempErrors= {...tempErrors, title: 'Title is Required', desc: 'Description is Required', category: 'Category is Required'}
        }else{
            setErrors((prev)=> ({...prev, name: '', email: '', password: ''}))
            tempErrors= {...tempErrors, name: '', email: '', password: ''}
        }
        /* if(!todo?.title){
            setErrors((prev)=> ({...prev, title: 'Title is Required'}))
            tempErrors= {...tempErrors, title: 'Title is Required'}
        }else{
            setErrors((prev)=> ({...prev, title: ''}))
            tempErrors= {...tempErrors, title: ''}
        }

        if(!todo?.desc){
            setErrors((prev)=> ({...prev, desc: 'Description is Required'}))
            tempErrors= {...tempErrors, desc: 'Description is Required'}
        }else{
            setErrors((prev)=> ({...prev, desc: ''}))
            tempErrors= {...tempErrors, desc: ''}
        }

        if(!todo?.category){
            setErrors((prev)=> ({...prev, category: 'Category is Required'}))
            tempErrors= {...tempErrors, category: 'Category is Required'}
        }else{
            setErrors((prev)=> ({...prev, category: ''}))
            tempErrors= {...tempErrors, category: ''}
        } */

        if(!tempErrors?.title || !tempErrors?.desc || !tempErrors?.category){
            try{
                const {data, status} = await axios.post('http://localhost:4000/todos', todo)
                if(status === 201){
                    setSuccess(data?.success);
                    setTimeout(()=>{
                        setSuccess('')
                    }, 2000)
                }
                
            }
            catch(error){
                setErrors((prev)=>({
                    ...prev, title: error?.response?.data?.title,
                    desc: error?.response?.data?.desc,
                    category: error?.response?.data?.category,
                    
                }));
                console.log(error);
                setLoading(false);
            }
        }
        setLoading(false)
        console.log(todo);
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
                    <div>
                        <label htmlFor="" className='text-cyan-600 '>Category</label>
                        <input onChange={handleChange} className='bg-gray-100 w-full p-2 outline-0' type="text" name='category'  placeholder='Enter Category '/>
                        {errors?.category ? <p className='text-red-600'>{errors.category}</p> : null }
                    </div>
                    <button 
                    type='submit'
                    disabled={loading}
                    className='bg-cyan-600 w-full py-2 text-white text-center'>{loading ? 'Todo Adding...' : 'Todo Add'}</button>
                </form>
            </div>
        </div>
    )
}
export default AddTodo;