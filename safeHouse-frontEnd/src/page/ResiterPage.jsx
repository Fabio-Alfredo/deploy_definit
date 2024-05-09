import React from 'react';
import { Navigation, Input, CatalogRole } from '../components/registerComponents';
import Button from '../components/Button';

const ResiterPage = () => {
    return (
        <div className='flex items-center justify-center w-full h-screen bg-color-primary p-4'>
            <div className='md:w-3/4 lg:w-1/2 w-full p-8 shadow-lg rounded-lg bg-white'>
                <Navigation title={"Registrar usuario"} />
                <Input name={"Name"} label={"Nombre:"} type={"text"} />
                <Input name={"Email"} label={"Email:"} type={"email"} />
                <CatalogRole />
                
            </div>
        </div>
    );
};

export default ResiterPage;