import React, { useState } from 'react';
import { FaCirclePlus } from "react-icons/fa6";

const MenuRequest = () => {

    const [state, setstate] =
        useState(false)

    const handleEvent = () => {
        setstate(!state)
    }

    return (
        <div className='w-full flex justify-end items-center '>

            <div onClick={handleEvent} className='relative pr-4 sm:pr-8 pb-2 cursor-pointer group/item'>
                <ul className={`absolute right-7 sm:right-11  top-7 mt-2 p-1 rounded-lg bg-slate-100 shadow-md ${state ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} z-50`}>
                    <li className='font-popins text-sm flex sm:text-lg lg:text-xl items-center select-none py-2 px-4 hover:bg-white duration-500 rounded-lg'>Casual</li>
                    <li className='font-popins text-sm flex sm:text-lg lg:text-xl items-center select-none py-2 px-4 hover:bg-white  duration-500 rounded-lg'>Repetitiva</li>
                </ul>
                <p className='font-popins text-sm flex sm:text-lg lg:text-xl items-center select-none py-2 px-4 rounded-full hover:bg-slate-100 duration-500 '>
                    Nueva solicitud
                    <FaCirclePlus className='text-xl pl-2 sm:text-2xl lg:text-3xl group-hover/item:scale-110 duration-300' />

                </p>
            </div>
        </div>
    );
};

export default MenuRequest;