import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ()=>{
    return(
        <div>
            <div className='flex gap-6 bg-cyan-700 text-white py-2 justify-end px-2'>
                <Link to='/addCategories'>Add Categories</Link>
                <Link to='/addTodo'>Add Todo</Link>
                <Link to='/addUser'>Add User</Link>
            </div>
        </div>
    )
}
export default Navbar;