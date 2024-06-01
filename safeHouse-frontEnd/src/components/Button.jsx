import React from 'react';

const Button = ({ type, name, value }) => {
    return (
        <>
            <div className='flex w-full justify-center items-center mt-6 2xl:mt-8 2xl:mb-4 '>
                <input type={type} name={name} value={value}
                    className='rounded-full font-popins text-white bg-blue-buttons hover:bg-sky-700 cursor-pointer text-sm xl:text-xl w-28 h-8 sm:w-40 sm:h-10 xl:w-56 xl:h-12' />
            </div>
        </>
    );
};

export default Button;