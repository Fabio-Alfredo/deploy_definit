import React from 'react';

const CatalogRole = ({ inputValue,inputOnchange}) => {
    return (
        <>
            <div className='grid grid-cols-3 sm:mx-12 items-center m-2 lg:m-4 sm:m-10'> {/* query */}
                <label htmlFor='role' className='col-span-1 font-popins text-sm sm:text-2xl'> Role: </label>{/* query */}
                <select name='role' required  value={inputValue} onChange={inputOnchange} className='col-span-2 pl-3 ml-5  shadow-md font-popins  bg-input-color rounded-md text-xs xl:ml-0 sm:text-xl h-6 sm:h-10 w-5/12'> {/* query */}
                <option value='' disabled>Role</option>
                    <option value='user'>User</option>
                    <option value='guest'>Guest</option>
                    <option value='admin'>Admin</option>
                </select>
            </div>
        </>
    );
};

export default CatalogRole;