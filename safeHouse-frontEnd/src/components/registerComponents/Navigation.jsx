import React from 'react';
import { RiArrowLeftCircleLine } from "react-icons/ri";

export const Navigation = ({ title }) => {
    return (
        <>
            <nav className='flex felx-row items-center justify-center mb-5 lg:mb-10'>
                <RiArrowLeftCircleLine className='text-3xl hidden md:mx-4 md:block  md:text-5xl lg:text-5xl lg:ml-5 md:flex-shrink-0' />
                <h2 className='font-brygada-1918 text-xl font-bold md:ml-16  md:flex-grow md:text-4xl lg:text-5xl'>{title}</h2>
            </nav>
        </>
    );
};

