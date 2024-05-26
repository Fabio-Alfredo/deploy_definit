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
        <div className='flex flex-col py-4 xl:w-11/12 w-full bg-red-400 justify-center items-center '>
            <QrReader
                delay={300}
                facingMode={"environment"}
                onError={handleError}
                onScan={handleScan}
                resolution={1000}
                style={{
                    width: '80%',
                    height: 'auto',
                    margin: '0 auto',
                    baground: 'red',
                }}
                className='bg-[#000000]'
                //ViewFinder={ScanOverlay}
                
                //showViewFinder={false}
                //className='bg-b'
            />

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

