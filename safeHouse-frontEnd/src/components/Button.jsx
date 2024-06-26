/* eslint-disable react/prop-types */
import React from 'react';

const Button = ({ onClick ,type, name, value, classStyle}) => {
    return (
        <>

            <input onClick={onClick} type={type} name={name} value={value}
                className={`rounded-full font-popins text-white bg-blue-buttons hover:bg-sky-700 cursor-pointer text-sm xl:text-xl w-28 h-8 2xl:mt-8 2xl:mb-4 sm:w-40 sm:h-10 xl:w-56 xl:h-12 ${classStyle? classStyle:''}`} />

        </>
    );
};

export default Button;