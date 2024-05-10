import React from 'react';
import { Navigation, Input, CatalogRole } from '../components/registerComponents';
import Button from '../components/Button';
import logo from '../assets/Logo.svg';

const ResiterPage = () => {
    return (
        <div className='h-screen'>
            <header className='bg-color-primary  flex justify-center sm:justify-start h-[10vh]'>
                <img className='sm:p-2 pt-5 scale-75 ml-3 ' src={logo} />
            </header>
            <div className='flex items-center justify-center w-full bg-color-primary px-6 h-[90vh]'>
                <div className='h-2/3 w-1/2 p-8 shadow-lg rounded-2xl bg-white' >
                    <Navigation title={"Registrar usuario"} />
                    <Input name={"Name"} label={"Nombre:"} type={"text"} />
                    <Input name={"Email"} label={"Email:"} type={"email"}/>
                </div>
            </div>
        </div>
    );
};

/**                <Navigation title={"Registrar usuario"} />
                <Input name={"Name"} label={"Nombre:"} type={"text"} />
                <Input name={"Email"} label={"Email:"} type={"email"} />
                <CatalogRole /> */

export default ResiterPage;