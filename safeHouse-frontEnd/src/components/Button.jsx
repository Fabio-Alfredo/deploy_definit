import React from 'react';

const Button = ({type, name, value}) => {
    return (
        <>
            <div className='flex w-full justify-center items-center mt-36'>
                <input type={type} name={name} value={value} className='w-56 h-12 rounded-full font-popins text-white bg-blue-buttons hover:bg-sky-700 cursor-pointer' />
            </div>
        </>
    );
};

export default Button;