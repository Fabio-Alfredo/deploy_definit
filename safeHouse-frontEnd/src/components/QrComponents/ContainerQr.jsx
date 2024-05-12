import React from 'react';
import { Navigation } from '../registerComponents';
import CreateQr from './CreateQr';
import Cronometro from './Cronometro';

const ContainerQr = () => {
    return (
        <>
            <div className=' w-full p-8 shadow-2xl rounded-3xl bg-white xl:h-3/4 xl:p-14 lg:w-1/2' > {/* query */}
                <Navigation title={"Entrada"} />
                <hr className='h-0.5 bg-black' />
                <Cronometro />
                <CreateQr />
                <div className='w-full flex flex-col justify-center items-center'>
                    <p className='font-popins py-3   text-sm sm:text-xl sm:py6'>Residente</p>
                    <h2 className='font-popins  font-bold text-lg sm:text-2xl'>Nombre Apellido</h2>
                    <h3 className='font-popins text-sm sm:text-xl'>nombre@gmail.com</h3>
                </div>
                <hr className='h-0.5 bg-black mt-7' />
            </div>
        </>
    );
};

export default ContainerQr;