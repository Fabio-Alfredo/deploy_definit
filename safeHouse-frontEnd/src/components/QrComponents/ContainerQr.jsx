import React from 'react';
import { Navigation } from '../registerComponents';
import CreateQr from './CreateQr';

const ContainerQr = () => {
    return (
        <>
            <div className=' w-full p-8 shadow-2xl rounded-3xl bg-white xl:h-3/4 xl:p-14 lg:w-1/2' > {/* query */}
                <Navigation title={"Entrada"} />
                <hr className='h-0.5 bg-black m-7'/>
                <CreateQr/>
            </div>
        </>
    );
};

export default ContainerQr;