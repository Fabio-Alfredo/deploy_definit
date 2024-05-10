import React from 'react';

export const CatalogRole = ({ inputValue,inputOnchange}) => {
    return (
        <>
            <div className='grid grid-cols-3 sm:mx-12 items-center m-4 sm:m-10'> {/* query */}
                <label htmlFor='role' className='col-span-1 font-popins text-sm sm:text-2xl'> Role: </label>{/* query */}
                <select name='role' value={inputValue} onChange={inputOnchange} className='col-span-2 p-1 shadow-md  bg-input-color rounded-md text-xs sm:text-xl h-6 sm:h-10 w-5/12'> {/* query */}
                    <option value='user'>User</option>
                    <option value='guest'>Guest</option>
                    <option value='admin'>Admin</option>
                </select>
            </div>
        </>
    );
};




/**<div className='flex items-center mb-4'>
                    <label htmlFor="Name" className='font-popins text-xl'> Email: </label>
                    <input type='text' name='Name' className='rounded-full ml-auto w-96 h-12 p-4' />
                </div> */

