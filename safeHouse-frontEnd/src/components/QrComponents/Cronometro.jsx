import React from 'react';
import { useEffect, useState } from 'react';

const Cronometro = ({ handleTime }) => {
    const [seconds, setSeconds] = useState(() => {
        const savedStartTime = localStorage.getItem('cronometro-start-time');
        const savedDuration = localStorage.getItem('cronometro-duration');
        const savedEndTime = savedStartTime ? parseInt(savedStartTime, 10) + (savedDuration ? parseInt(savedDuration, 10) : 10 * 60) * 1000 : null;
        const now = Date.now();

        if (savedEndTime && now < savedEndTime) {
            return Math.floor((savedEndTime - now) / 1000);
        } else {
            return 10 * 60;
        }
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => {
                const newSeconds = prevSeconds - 1;
                if (newSeconds <= 0) {
                    handleTime();
                    const resetTime = 10 * 60;
                    localStorage.setItem('cronometro-start-time', Date.now());
                    localStorage.setItem('cronometro-duration', resetTime);
                    return resetTime;
                } else {
                    return newSeconds;
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [handleTime]);

    useEffect(() => {
        if (seconds === 10 * 60) {
            localStorage.setItem('cronometro-start-time', Date.now());
            localStorage.setItem('cronometro-duration', 10 * 60);
        }
    }, [seconds]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
        <>
            <h2 className='text-center font-popins text-lg m-2 sm:text-xl xl:text-start'>
                {`Duracion: ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`}
            </h2>
        </>
    );
};

export default Cronometro;
