import axios from 'axios';
import React, { useState } from 'react';

const initialUser = {
    name: '',
    email: '',
    password: ''
}

const initialUserErrors = {
    name: '',
    email: '',
    password: '',
    message: ''
}

const AddUser = () => {
    const [user, setUser]= useState([initialUser])
    const [errors, setErrors] = useState(initialUserErrors);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e)=>{
        setUser( (prev)=> ({...prev, [e.target.name]: e.target.value}))
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let tempErrors = {};
        setLoading(true);

        if(!user?.name || !user?.email || !user?.password){
            setErrors((prev)=> ({...prev, name: 'Name is Required', email: 'Email is Required', password: 'Password is Required'}))
            tempErrors= {...tempErrors, name: 'Name is Required', email: 'Email is Required', password: 'Password is Required'}
        }else{
            setErrors((prev)=> ({...prev, name: '', email: '', password: ''}))
            tempErrors= {...tempErrors, name: '', email: '', password: ''}
        }

        /* if(!user?.email){
            setErrors((prev)=> ({...prev, email: 'Email is Required'}))
            tempErrors= {...tempErrors, email: 'Email is Required'}
        }else{
            setErrors((prev)=> ({...prev, email: ''}))
            tempErrors= {...tempErrors, email: ''}
        }

        if(!user?.password){
            setErrors((prev)=> ({...prev, password: 'Password is Required'}))
            tempErrors= {...tempErrors, password: 'Password is Required'}
        }else{
            setErrors((prev)=> ({...prev, password: ''}))
            tempErrors= {...tempErrors, password: ''}
        } */

        if(!tempErrors?.name || !tempErrors?.email || !tempErrors?.password){
            try{
                const {data, status} = await axios.post('http://localhost:4000/user/signup', user)
                if(status === 201){
                    setSuccess(data?.success);
                    setTimeout(()=>{
                        setSuccess('')
                    }, 2000)
                }
            }
            catch(errors){
                setErrors((prev)=>({
                    ...prev, name: errors?.response?.data?.name,
                    email: errors?.response?.data?.email,
                    password: errors?.response?.data?.password,
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
                        <label htmlFor="" className='text-cyan-600 '>Name</label>
                        <input onChange={handleChange} className='bg-gray-100 w-full p-2 outline-0' type="text" name='name' placeholder='Enter Name' />
                        {errors?.name ? <p className='text-red-600'>{errors.name}</p> : null }
                    </div>
                    <div>
                        <label htmlFor="" className='text-cyan-600 '>Email</label>
                        <input onChange={handleChange} className='bg-gray-100 w-full p-2 outline-0' type="text" name='email'  placeholder='Enter Email'/>
                        {errors?.email ? <p className='text-red-600'>{errors.email}</p> : null }
                    </div>
                    <div>
                        <label htmlFor="" className='text-cyan-600 '>Password</label>
                        <input onChange={handleChange} className='bg-gray-100 w-full p-2 outline-0' type="text" name='password'  placeholder='Enter Password '/>
                        {errors?.password ? <p className='text-red-600'>{errors.password}</p> : null }
                    </div>
                    <button 
                    type='submit'
                    disabled={loading}
                    className='bg-cyan-600 w-full py-2 text-white text-center'>{loading ? 'User Adding...' : 'User Add'}</button>
                </form>
            </div>
        </div>
    )
}
export default AddUser;