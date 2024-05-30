import React from 'react';
import Header from '../components/Header';
import ContainerReaderQr from '../components/ReaderQrComponents/ContainerReaderQr';

const ReaderQr = () => {
    return (
        <div className='h-screen'>
            <Header />
            <div className='flex pt-36 lg:p-0 lg:items-center justify-center w-full bg-color-primary px-6 min-h-[90vh]'>
                <ContainerReaderQr/>
            </div>
        </div>
    );
};

export default ReaderQr;