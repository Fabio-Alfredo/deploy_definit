import React, { useEffect } from 'react';
import { Navigation } from '../registerComponents';
import CreateQr from './CreateQr';
import Cronometro from './Cronometro';
import { useState } from 'react';
import InfoUser from './InfoUser';

const ContainerQr = () => {

    //eliminar al hacer la conneccion 
    const [date, setDate] = useState(new Date().toLocaleString());
    //para coneccion con api
    /*const [qrData, setQrData] = useState(null);
    const [apiCalled, setApiCalled] = useState(false);
    
    useEffect(() => {
        if (!apiCalled) {    //para traer informacion al entrar la primera vez
            handleTime();
            setApiCalled(true);
        }
    }, []);*/
    console.log(date);

    const handleTime = async () => {
        setDate(new Date().toLocaleString());
    }


    return (
        <>
            <div className=' w-full p-8 lg:p-4 shadow-2xl rounded-3xl bg-white xl:h-9/12 xl:p-14 lg:w-1/2' > {/* query */}
                <Navigation title={"Entrada"} />
                <hr className='h-0.5 bg-black' />
                <Cronometro handleTime={handleTime} />
                {/*qrData && <CreateQr info={qrData} />*/} {/* para coneccion con api */}
                {/*qrData && <InfoUser data={qrData} />*/} {/* para coneccion con api */}
                <CreateQr info={date}/>
                <InfoUser/>
                <hr className='h-0.5 bg-black m-4' />
            </div>
        </>
    );
};

export default ContainerQr;