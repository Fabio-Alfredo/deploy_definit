import React from 'react';
import {getPhaseStyles} from '../../hooks/useColor';
import { formDate, formatTime } from "../../utils/MapDate";

const RequestCard = ({enableTme,disableTime, phase, visitor}) => {

    const {text, color} = getPhaseStyles(phase)

    return (
        <>

            <div className='font-popins group/item flex items-center flex-wrap justify-between px-3 md:hover:px-3 md:px-6  w-full mt-2 py-2 text-lg list-none rounded-xl hover:bg-slate-100 hover:-translate-y-1 duration-500 ' key={2}>
                <div className='flex flex-col justify-start items-start my-1'>
                    <p className='font-popins font-bold text-sm sm:text-lg lg:text-xl items-center p-0 md:px-2 select-none '>Visitante</p>
                    <p className='font-popins text-gray-500  text-sm sm:text-lg lg:text-xl items-center p-0 md:px-2 select-none'>{visitor.name} </p>
                </div>
                <div className=' flex-col justify-end items-end my-1 hidden group-hover/item:flex'>
                    <p className='font-popins font-bold text-sm sm:text-lg lg:text-xl items-center p-0 md:px-2 select-none '>Fecha</p>
                    <p className='font-popins text-center text-xs sm:text-lg lg:text-xl  text-gray-500 select-none'>{formDate(enableTme)}</p>
                </div>
                <div className=' flex-col justify-end items-end my-1 hidden group-hover/item:flex'>
                    <p className='font-popins font-bold text-sm sm:text-lg lg:text-xl items-center p-0 md:px-2 select-none'>Hora</p>
                    <p className='font-popins text-center text-xs sm:text-lg lg:text-xl  text-gray-500 select-none'>{formatTime(enableTme)}</p>
                </div>
                <div className=' items-center w-full md:w-fit justify-center md:justify-end gap-2 my-1'>
                    <p className={`font-popins text-center text-sm sm:text-lg lg:text-xl  text-gray-500 select-none font-semibold ${color}`}>{text}</p>
                </div>
            </div>


        </>
    );

};

export default RequestCard;
