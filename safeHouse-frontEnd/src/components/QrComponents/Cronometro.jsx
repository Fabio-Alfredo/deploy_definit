import React from 'react';
import { useState, useEffect } from 'react';


const Cronometro = () => {

    const [seconds, setSeconds] = useState(10 * 60);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
        if (seconds === 0) {
            setSeconds(10 * 60);
        }
    }, [seconds]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
        <>
            <h2 className='text-center m-4 font-popins text-sm sm:text-xl'>{`Duracion: ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`}</h2>
        </>
    );
};

export default Cronometro;