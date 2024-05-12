import React from 'react';
import CreateQr from '../components/QrComponents/CreateQr';
import logo from '../assets/Logo.svg';
import { Navigation } from '../components/registerComponents';
import ContainerQr from '../components/QrComponents/ContainerQr';


const GenerateToken = () => {
    return (
        <div className='h-screen'>
            <header className='bg-color-primary  flex justify-center sm:justify-start h-[10vh]'>
                <img className='sm:p-2 pt-5 scale-75 ml-3 ' src={logo} />
            </header>
            <div className='flex items-center justify-center w-full bg-color-primary px-6 h-[90vh]'>
                <ContainerQr/>
            </div>
        </div>
    );
};

export default GenerateToken;