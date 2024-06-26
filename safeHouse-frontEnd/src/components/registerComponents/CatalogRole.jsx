import React from 'react';

const CatalogRole = ({ inputValue,inputOnchange}) => {
    return (
        <>
            <div className='grid grid-cols-3 sm:mx-12 items-center m-2 lg:m-4 xl:m-8'> {/* query */}
                <label htmlFor='role' className='col-span-1 font-popins  text-sm sm:text-2xl text-wrap '> Asignar/eliminar: </label>{/* query */}
                <select name='role' required  value={inputValue} onChange={inputOnchange} className='col-span-2 pl-3 sm:ml-11 shadow-md font-popins  bg-input-color rounded-md text-xs sm:text-xl h-6 sm:h-10 w-5/12'> {/* query */}
                <option value='' disabled>Role</option>
                    <option value='EMPL'>Empleado</option>
                    <option value='RESD'>Residente</option>
                    <option value='RSAD'>Residente A.</option>
                    <option value='VIST'>Visitante</option>
                </select>
                
            </div>
        </>
    );
};

export default CatalogRole;