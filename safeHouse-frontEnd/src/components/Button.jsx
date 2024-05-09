import React from 'react';

const Button = ({type, name, value}) => {
    return (
        <>
            <div className='grid grid-cols-3 py-2 lg:py-8 items-center'>
                <input type={type} name={name} value={value} className='col-span-2 shadow-md bg-color-primary' />
            </div>
        </>
    );
};

export default Button;