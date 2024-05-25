import React from 'react';
import { Navigation } from '../registerComponents';
import CreateReaderQr from './CreateReaderQr';

const ContainerReaderQr = () => {
    return (
        <div className='w-full p-4 xl:p-10 shadow-2xl rounded-3xl bg-white h-fit lg:w-2/3  xl:w-1/2' > {/* query */}
            <Navigation title={"Escanear codigo QR"} />
            <CreateReaderQr/>
        </div>
    );
};

export default ContainerReaderQr;