import React from 'react';
import { Navigation } from '../registerComponents';
import CreateReaderQr from './CreateReaderQr';

const ContainerReaderQr = () => {
    return (
        <div className='w-full p-4 shadow-2xl rounded-3xl bg-white h-fit lg:w-1/2 xl:p-10' > {/* query */}
            <Navigation title={"Escanear QR"} />
            <hr className='h-0.5 bg-black' />
            <div className='flex flex-col items-center'>
                <CreateReaderQr />
            </div>

        </div>
    );
};

export default ContainerReaderQr;