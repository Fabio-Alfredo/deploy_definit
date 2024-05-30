import React, { useState } from 'react';
import QrReader from 'modern-react-qr-reader'
import ScanOverlay from './Overlay';

export const CreateReaderQr = () => {

    const [data, setData] = useState('data');

    const handleScan = (info) => {
        if (info) {
            setData(info);
            console.log(data);
            playBeepSound();

        }
    }

    const handleError = (err) => {
        console.error(err)
    }

    const playBeepSound = () => {
        const audio = new Audio('/sound/scan.mp3');
        audio.play();
    }


    return (
        <div className='flex flex-col lg:w-1/2 xl:w-4/5 w-full'>
            <div className='flex justify-center items-center relative m-10 md:m-20 lg:m-4 p-1 bg-gradient-to-r from-green-400 from-10%  via-color-primary via-40% to-green-400 to-80%'>
                <QrReader
                    delay={300}
                    facingMode={"environment"}
                    onError={handleError}
                    onScan={handleScan}
                    resolution={1000}
                    style={{
                        width: '100%'
                    }}
                    showViewFinder={false}
                />
                <ScanOverlay />
            </div>
            <p className='text-center font-bold text-xl'>
                <span className='text-green-primary'>S</span>
                afe
                <span className='text-green-primary'>H</span>
                ouse
            </p>

            <p>{data}</p>
        </div>
    );
};


export default CreateReaderQr;

/**
 *      const [data, setData] = useState('data');

    return (
        <div className='flex py-4 xl:w-11/12 w-full justify-center items-center '>
            <QrReader
                onResult={(result, error) => {
                    if (result) {
                        setData(result?.text);
                    }

                    if (error) {
                        setData('data')
                        console.log(data)
                    }
                }}
                constraints={{ facingMode: 'environment' }}
                containerStyle={{
                    width: '80%',
                    height: 'auto',
                    border: '5px solid transparent',
                    borderRadius: '10px',
                    padding: '2px',
                    background: 'linear-gradient(to bottom right, #008D62, #FFFFFF)',

                }}
                delay={500}
                videoContainerStyle={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',

                }}
                videoStyle={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px',
                }}
                ViewFinder={ScanOverlay}
            />
            <p>{data}</p>
        </div>
    );  
 */

