import React from 'react';

const InfoUser = ({data}) => {

    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>
                <p className='font-popins pt-5  text-base sm:text-lg xl:py-6 xl:text-xl'>Residente</p>
                <h2 className='font-popins  font-bold text-lg sm:text-xl xl:text-2xl'>Nombre Apelliod</h2>
                <h3 className='font-popins text-sm sm:text-base xl:text-xl'>nombre@gmail.com</h3>
            </div>
        </>
    );
};

export default InfoUser;