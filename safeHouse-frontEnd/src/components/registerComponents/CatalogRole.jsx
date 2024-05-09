import React from 'react';

export const CatalogRole = () => {
    return (
        <>
            <div className='grid grid-cols-3 py-2 md:py-4 lg:py-8 items-center'>
                <label htmlFor='Role' className='col-span-1 pl-4 font-popins text-lg md:text-2xl lg:text-3xl'> Role: </label>
                <select name='Role' className='rounded-md col-span-2 shadow-md text-center bg-color-primary w-24 h-7 md:w-1/3 md:h-8  md:text-xl lg:text-xl lg:h-11'>
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

