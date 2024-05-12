import React, { useEffect } from 'react';
import { Navigation } from '../registerComponents';
import CreateQr from './CreateQr';
import Cronometro from './Cronometro';
import { useState } from 'react';
import { fetchQrData } from '../../service/connecctionGoogle';

const ContainerQr = () => {

    const [qrData, setQrData] = useState(null);
    const [apiCalled, setApiCalled] = useState(false);

    useEffect(() => {
        if (!apiCalled) {
            handleTime();
            setApiCalled(true);
        }
    }, []);

    const handleTime = async () => {
        const data = {
            email: "fabio@gmail.com"
        }

        const response = await fetchQrData(data);
        const { email } = response.data;
        const newdata = {
            email,
            date: new Date()
        }
        setQrData(newdata);
        console.log(newdata);
    }


    return (
        <>
            <div className=' w-full p-8 shadow-2xl rounded-3xl bg-white xl:h-4/5 xl:p-14 lg:w-1/2' > {/* query */}
                <Navigation title={"Entrada"} />
                <hr className='h-0.5 bg-black' />
                <Cronometro handleTime={handleTime} />
                {qrData && <CreateQr info={qrData} />}
                <div className='w-full flex flex-col justify-center items-center'>
                    <p className='font-popins pt-5 pb-3  text-xl sm:text-xl sm:py6'>Residente</p>
                    <h2 className='font-popins  font-bold text-2xl sm:text-2xl'>Nombre Apellido</h2>
                    <h3 className='font-popins text-sm sm:text-xl'>nombre@gmail.com</h3>
                </div>
                <hr className='h-0.5 bg-black mt-4' />
            </div>
        </>
    );
};

export default ContainerQr;