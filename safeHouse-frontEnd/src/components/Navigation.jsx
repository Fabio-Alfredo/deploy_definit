import React from 'react';
import { RiArrowLeftCircleLine } from "react-icons/ri";

const Navigation = ({ title }) => {
    return (
        <>
            <nav className='flex felx-row items-center justify-center p-4 sm:mb-6'> {/* query */}
                <RiArrowLeftCircleLine className='hidden text-5xl flex-shrink-0 md:block cursor-pointer' />
                <h2 className='font-brygada-1918 text-center flex-grow md:mr-12 text-3xl sm:text-5xl select-none'>{title}</h2> {/* query */}
            </nav>
        </>
    );
};

export default Navigation;

