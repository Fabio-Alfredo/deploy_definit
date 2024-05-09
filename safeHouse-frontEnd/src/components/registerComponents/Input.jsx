import React from 'react';

export const Input = ({name, label, type}) => {
    return (
        <>
            <div className='grid grid-cols-3 py-2 md:py-4  items-center'>
                <label htmlFor={name} className='col-span-1 pl-4 font-popins text-lg md:text-2xl lg:text-3xl'> {label} </label>
                <input type={type} name={name} className='col-span-2 shadow-md bg-color-primary h-7 rounded-md p-1  md:w-[300px] md:h-9 md:text-xl lg:h-12 lg:text-2xl' />
            </div>
        </>
    );
};
