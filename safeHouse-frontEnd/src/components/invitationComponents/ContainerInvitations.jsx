import React from 'react';
import Navigation from '../Navigation';

const ContainerInvitations = () => {
    return (
        <>
            <div className='w-full p-4 sm:p-8 shadow-2xl rounded-3xl bg-white h-fit lg:w-2/3  xl:w-1/2' > {/* query */}
                <Navigation title={"Invitaciones"} />
                <hr className='h-0.5 bg-black mb-8' />
                <div className='overflow-y-auto max-h-[50vh]'>
                    <div className='font-popins grid grid-cols-2 px-6 pt-2 mt-2 text-lg list-none cursor-pointer rounded-xl hover:bg-slate-100' key={2}>
                        <p className='font-popins w-full font-bold px-2'>Invitacion</p>
                        <p className='font-popins w-full  font-bold px-2 text-end'>Casa#2</p>
                        <p className='font-popins w-full grid grid-cols-2 font-bold px-2'>Fecha</p>
                        <p className='font-popins w-full  font-bold px-2 text-end'>12/12/2021 </p>
                        <p className='font-popins w-full grid grid-cols-2 font-bold px-2'>Hora<span className='text-end text-gray-500 font-normal'>12:00 </span></p>

                    </div>
                    <hr className='w-full bg-black' />
                    <div className='font-popins px-6 pt-2 mt-2 text-lg list-none cursor-pointer rounded-xl hover:bg-slate-100' key={2}>
                        <p className='font-popins w-full grid grid-cols-2 font-bold px-2'>Invitacion<span className='text-end text-gray-500'>Casa#2</span></p>
                        <p className='font-popins w-full grid grid-cols-2 font-bold px-2'>Fecha<span className='text-end text-gray-500 font-normal'>12/12/2021 </span></p>
                        <p className='font-popins w-full grid grid-cols-2 font-bold px-2'>Hora<span className='text-end text-gray-500 font-normal'>12:00 </span></p>
                        <hr className='w-full bg-black' />
                    </div>
                    <div className='font-popins px-6 pt-2 mt-2 text-lg list-none cursor-pointer rounded-xl hover:bg-slate-100' key={2}>
                        <p className='font-popins w-full grid grid-cols-2 font-bold px-2'>Invitacion<span className='text-end text-gray-500'>Casa#2</span></p>
                        <p className='font-popins w-full grid grid-cols-2 font-bold px-2'>Fecha<span className='text-end text-gray-500 font-normal'>12/12/2021 </span></p>
                        <p className='font-popins w-full grid grid-cols-2 font-bold px-2'>Hora<span className='text-end text-gray-500 font-normal'>12:00 </span></p>
                        <hr className='w-full bg-black' />
                    </div>
                    <div className='font-popins px-6 pt-2 mt-2 text-lg list-none cursor-pointer rounded-xl hover:bg-slate-100' key={2}>
                        <p className='font-popins w-full grid grid-cols-2 font-bold px-2'>Invitacion<span className='text-end text-gray-500'>Casa#2</span></p>
                        <p className='font-popins w-full grid grid-cols-2 font-bold px-2'>Fecha<span className='text-end text-gray-500 font-normal'>12/12/2021 </span></p>
                        <p className='font-popins w-full grid grid-cols-2 font-bold px-2'>Hora<span className='text-end text-gray-500 font-normal'>12:00 </span></p>
                        <hr className='w-full bg-black' />
                    </div>
                    <div className='font-popins px-6 pt-2 mt-2 text-lg list-none cursor-pointer rounded-xl hover:bg-slate-100' key={2}>
                        <p className='font-popins w-full grid grid-cols-2 font-bold px-2'>Invitacion<span className='text-end text-gray-500'>Casa#2</span></p>
                        <p className='font-popins w-full grid grid-cols-2 font-bold px-2'>Fecha<span className='text-end text-gray-500 font-normal'>12/12/2021 </span></p>
                        <p className='font-popins w-full grid grid-cols-2 font-bold px-2'>Hora<span className='text-end text-gray-500 font-normal'>12:00 </span></p>
                        <hr className='w-full bg-black' />
                    </div>
                </div>

                <hr className='h-0.5 bg-black my-8' />
            </div>
        </>
    );
};

export default ContainerInvitations;