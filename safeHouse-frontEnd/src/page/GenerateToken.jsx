import React from 'react';
import CreateQr from '../components/QrComponents/CreateQr';
import logo from '../assets/Logo.svg';
import { Navigation } from '../components/registerComponents';
import ContainerQr from '../components/QrComponents/ContainerQr';
import Header from '../components/Header';


const GenerateToken = () => {
    return (
        <div className='h-screen'>
            <Header/>
            <div className='flex items-center justify-center w-full bg-color-primary px-6 h-[90vh]'>
                <ContainerQr/>
            </div>
        </div>
    );
};

export default GenerateToken;