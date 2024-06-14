import React from 'react';
import Header from '../components/Header';
import ContainerGraphics from '../components/graphicsComponents/ContainerGraphics';

const Graphics = () => {
    return (
        <div className='h-screen'>
            <Header/>
            <div className='flex items-center justify-center w-full bg-color-primary px-6 min-h-[90vh]'>
                <ContainerGraphics/>
            </div>
        </div>
    );
};

export default Graphics;