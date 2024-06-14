import React, { useState } from 'react';
import { GrNext, GrPrevious } from "react-icons/gr";

const NavigationGraphics = ({ handleNextGraphic, currentGraphic, handlePreviewGraphic }) => {

    return (
        <>
            <h1 className='text-2xl text-center w-full gap-8 flex justify-center items-center'>
                <GrPrevious
                    className={`icon ${currentGraphic === 0 ? 'disabled text-slate-300' : 'cursor-pointer hover:scale-110 duration-500'}`}
                    onClick={handlePreviewGraphic}
                />
                {currentGraphic === 0
                    ? 'Entradas por día de la semana'
                    : currentGraphic === 1
                        ? 'Entradas por tipo'
                        : 'Entradas por mes' 
                }
                <GrNext
                    className={`icon ${currentGraphic === 2 ? 'disabled text-slate-300' : 'cursor-pointer hover:scale-110 duration-500'}`}
                    onClick={handleNextGraphic}
                />
            </h1>
        </>
    );
};

export default NavigationGraphics;