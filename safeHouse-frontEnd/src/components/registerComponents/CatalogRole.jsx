import React, { useState } from 'react';

const CatalogRole = ({ inputValue, inputOnchange, house }) => {


    return (
        <>
            <div className='grid grid-cols-4 sm:mx-12  items-center m-2 lg:m-4 xl:m-8'> {/* query */}
                <label htmlFor='role' className='col-span-1 font-popins  text-sm sm:text-2xl text-wrap '> Asignar/eliminar: </label>{/* query */}
                <select  name='role' required value={inputValue} onChange={inputOnchange} className='col-span-2 justify-self-center pl-3 sm:ml-11 shadow-md font-popins  bg-input-color rounded-md text-xs sm:text-xl h-6 sm:h-10 w-1/2'> {/* query */}
                    <option value='' disabled>Role</option>
                    <option value='EMPL'>Empleado</option>
                    <option value='RESD'>Residente</option>
                    <option value='RSAD'>Resd. Admin</option>
                    <option value='VIST'>Visitante</option>
                </select>
                <p className={`${house? '':'hidden'} font-bold sm:text-3xl text-gray-500`} > Casa #{house}.</p>
            </div>
        </>
    );
};

export default CatalogRole;