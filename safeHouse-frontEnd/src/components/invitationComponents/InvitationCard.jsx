import React from 'react';

const InvitationCard = () => {
    return (
        <div className='font-popins grid grid-cols-2 px-6 pt-2 mt-2 text-lg list-none cursor-pointer rounded-xl hover:bg-slate-100 hover:-translate-y-1 duration-500 ' key={2}>
            <p className='font-popins w-full font-bold px-2'>Invitacion</p>
            <p className='font-popins w-full  font-bold px-2 text-end text-gray-500'>Casa#2</p>
            <p className='font-popins w-full font-bold px-2'>Fecha</p>
            <p className='font-popins w-full px-2 text-end text-gray-500'>12/12/2021 </p>
            <p className='font-popins w-full font-bold px-2'>Hora</p>
            <p className='font-popins w-full px-2 text-end text-gray-500'>12:00 </p>
            <hr className='w-full bg-black col-span-2' />

        </div>
    );
};

export default InvitationCard;