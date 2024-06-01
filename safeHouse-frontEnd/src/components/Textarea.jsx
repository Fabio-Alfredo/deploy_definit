import React from 'react';

const Textarea = ({ name, label, rows, cols, inputValue, inputOnchange }) => {
    return (
        <>
            <div className='grid grid-cols-3 sm:mx-12 items-center m-2 lg:m-4 sm:m-10'>
                <label htmlFor={name} className='col-span-1 font-popins text-sm sm:text-2xl'> {label} </label> {/* query */}
                <textarea required rows={rows} cols={cols} name={name} value={inputValue} onChange={inputOnchange}
                    className='col-span-2 p-2 resize-none ml-5 shadow-md font-popins bg-input-color rounded-md  text-xs xl:ml-0 sm:text-xl w-10/12' />
            </div>
        </>
    );
};

export default Textarea;