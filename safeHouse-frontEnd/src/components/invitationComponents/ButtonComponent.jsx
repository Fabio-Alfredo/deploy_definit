import React from 'react';

const ButtonComponent = ({onClick, value, className}) => {
    return (
        <>
            <input onClick={onClick} type="button" value={value} className= {className + ' px-2 py-1 rounded-xl h-fit w-fit text-white cursor-pointer'} />
        </>
    );
};

export default ButtonComponent;