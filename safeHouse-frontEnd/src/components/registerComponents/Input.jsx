import React from 'react';

export const Input = ({name, label, type}) => {
    return (
        <>
            <div className='grid grid-cols-3 mx-10 items-center m-10'>
                <label htmlFor={name} className='col-span-1 font-popins text-2xl'> {label} </label>
                <input type={type} name={name} className='col-span-2 shadow-md w-96 bg-color-primary rounded-md h-10' />
            </div>
        </>
    );
};
