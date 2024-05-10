import React from 'react';
import { RiArrowLeftCircleLine } from "react-icons/ri";

export const Navigation = ({ title }) => {
    return (
        <>
            <nav className='flex felx-row items-center justify-center p-4 mb-24'>
                <RiArrowLeftCircleLine className='hidden text-5xl flex-shrink-0 md:block' />
                <h2 className='font-brygada-1918 text-center flex-grow text-5xl '>{title}</h2>
            </nav>
        </>
    );
};

/**
 * 
 * 
 */

