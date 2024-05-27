import React, { useState } from 'react';
import QrReader from 'modern-react-qr-reader'
import ScanOverlay from './Overlay';
export const CreateReaderQr = () => {

    const [data, setData] = useState('data');

    const handleScan = (data) => {
        if (data) {
            console.log(data);
            setData(data);
        }
    }

    const handleError = (err) => {
        console.error(err)
    }


    return (
        <div className='py-4 xl:w-4/5 w-full'>
            <div className='flex justify-center items-center relative px-2 py-2 bg-green-300'>
                <QrReader
                    delay={300}
                    facingMode={"environment"}
                    onError={handleError}
                    onScan={handleScan}
                    resolution={1000}
                    style={{
                        width: '100%',
                        height: 'auto',
                        baground: 'red',
                    }}
                    className='bg-[#000000]'
                    //ViewFinder={ScanOverlay}
                    showViewFinder={false}
                //className='bg-b'
                />
                <ScanOverlay />
            </div>
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

