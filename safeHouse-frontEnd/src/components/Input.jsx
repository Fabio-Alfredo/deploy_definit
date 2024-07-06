import React from 'react';


const Input = ({ name, label, type, inputValue, inputOnchange, readOnly=false }) => {

    return (
        <>

            <div className='grid grid-cols-3 sm:mx-12 items-center m-4 lg:m-4 xl:m-8 '>
                <label htmlFor={name} className='col-span-1 font-popins text-sm sm:text-2xl'> {label} </label> 
                <input readOnly={readOnly} required autoComplete='off' type={type} name={name} value={inputValue} onChange={inputOnchange}
                    className= {`col-span-2 pl-3 sm:ml-11 shadow-md font-popins bg-input-color rounded-md text-xs  sm:text-xl h-6 sm:h-10 ${readOnly ? 'text-gray-500':''}`} />
            </div>
        </>
    );
};

export default Input;