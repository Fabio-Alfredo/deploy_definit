import React from 'react';

const InvitationCard = () => {
    return (
        <>
            <div className='font-popins grid grid-cols-3 grid-rows-2 px-3 mt-2 pt-2 text-lg list-none cursor-pointer rounded-xl hover:bg-slate-100 hover:-translate-y-1 duration-500 ' key={2}>
                <p className='font-popins font-bold items-center px-2'>Invitacion</p>
                <p className='font-popins text-gray-500 font-semibold text-center'>Casa#2</p>
                <div className='row-span-2 flex items-center justify-end gap-2'>
                    <input type="button" value="aceptar" className='px-2 py-1 rounded-xl h-fit w-fit bg-green-300' />
                    <input type="button" value="rechazar" className='px-2 py-1 rounded-xl h-fit w-fit bg-red-500' />
                </div>
                <p className='font-popins items-center px-2'>Fecha</p>
                <p className='font-popins text-center  text-gray-500'>12/12/2021 </p>
                <hr className='w-full justify-self-center bg-black col-span-3' />
            </div>
        </>
    );
};

export default InvitationCard;



{/* <div className='font-popins grid grid-cols-2 px-6 pt-2 mt-2 text-lg list-none cursor-pointer rounded-xl hover:bg-slate-100 hover:-translate-y-1 duration-500 ' key={2}>
            <p className='font-popins w-full font-bold px-2'>Invitacion</p>
            <p className='font-popins w-full  font-bold px-2 text-end text-gray-500'>Casa#2</p>
            <p className='font-popins w-full font-bold px-2'>Fecha</p>
            <p className='font-popins w-full px-2 text-end text-gray-500'>12/12/2021 </p>
            <p className='font-popins w-full font-bold px-2'>Hora</p>
            <p className='font-popins w-full px-2 text-end text-gray-500'>12:00 </p>
            <hr className='w-full bg-black col-span-2' />

        </div> */}