import React, { useState } from 'react';
import Navigation from '../Navigation';
import PieChartGraphic from './PieChartGraphic';
import { GrNext, GrPrevious } from "react-icons/gr";
import BarChartGraphic from './BarChartGraphic';


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
                <Navigation title={"Invitaciones"} />
                <hr className='h-0.5 bg-black mb-6 mx-4' />
                <div className='flex font-brygada-1918 text-xs md:text-xl justify-center items-center flex-col'>
                    <h1 className=' text-2xl text-center w-full gap-8 flex justify-center items-center'>
                        <GrPrevious
                            className={`icon ${currentGraphic === 0 ? 'disabled text-slate-300 ' : ' cursor-pointer'}`}
                            onClick={handlePreviewGraphic}
                        />
                        {currentGraphic === 0 ? 'Entradas por tipo' : 'Entradas por día de la semana'}
                        <GrNext
                            className={`icon ${currentGraphic === 1 ? 'disabled text-slate-300' : ' cursor-pointer'}`}
                            onClick={handleNextGraphic}
                        />
                    </h1>
                    {currentGraphic === 0 ? <BarChartGraphic /> : <PieChartGraphic />}
                </div>
                <hr className='h-0.5 bg-black my-8 mx-4' />
            </div>
        </>
    );
};

export default ContainerGraphics;