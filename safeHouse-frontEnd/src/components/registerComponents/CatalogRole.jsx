import React from 'react';

export const CatalogRole = () => {
    return (
        <>
            <div className='grid grid-cols-3 mx-12 items-center m-10'>
                <label htmlFor='Role' className='col-span-1 font-popins text-2xl'> Role: </label>
                <select name='Role' className='col-span-2 font-popins text-lg text-center cursor-pointer shadow-md w-40 bg-color-primary rounded-full h-10'>
                    <option value='admin'>Admin</option>
                    <option value='user'>User</option>
                </select>
            </div>
        </>
    );
};




/**<div className='flex items-center mb-4'>
                    <label htmlFor="Name" className='font-popins text-xl'> Email: </label>
                    <input type='text' name='Name' className='rounded-full ml-auto w-96 h-12 p-4' />
                </div> */

