import React from 'react';
import Navigation from '../Navigation';
import CreateReaderQr from './CreateReaderQr';

const ContainerReaderQr = () => {
    return (
        <div className='w-full md:w-4/5  px-4 pt-4 shadow-2xl rounded-3xl bg-white h-fit lg:w-1/2 xl:px-10 xl:pt-10 ' > {/* query */}
            <Navigation title={"Escanear QR"} />
            <div className='flex flex-col items-center h-fit'>
                <CreateReaderQr />
            </div>

        </div>
    );
};

export default ContainerReaderQr;