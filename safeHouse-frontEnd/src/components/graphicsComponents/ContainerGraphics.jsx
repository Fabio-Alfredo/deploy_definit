import React, { useState } from 'react';
import Navigation from '../Navigation';
import PieChartGraphic from './PieChartGraphic';
import BarChartGraphic from './BarChartGraphic';
import NavigationGraphics from './NavigationGraphics';



const ContainerGraphics = () => {

    const [currentGraphic, setCurrentGraphic] = useState(0);

    const handlePreviewGraphic = () => {
        if (currentGraphic > 0) {
            setCurrentGraphic(currentGraphic - 1);
        }
    }

    const handleNextGraphic = () => {
        if (currentGraphic < 1) {
            setCurrentGraphic(currentGraphic + 1);
        }
    };

    return (
        <>
            <div className='w-full p-8 shadow-2xl rounded-3xl bg-white h-fit lg:w-2/3  xl:w-1/2' > {/* query */}
                <Navigation title={"Entadas"} />
                <hr className='h-0.5 bg-black mb-6 mx-4' />
                <div className='flex font-brygada-1918 text-xs md:text-xl justify-center items-center flex-col'>
                    <NavigationGraphics handleNextGraphic={handleNextGraphic} handlePreviewGraphic={handlePreviewGraphic} currentGraphic={currentGraphic} />
                    {currentGraphic === 0 ? <BarChartGraphic /> : <PieChartGraphic />}
                </div>
                <hr className='h-0.5 bg-black my-8 mx-4' />
            </div>
        </>
    );
};

export default ContainerGraphics;