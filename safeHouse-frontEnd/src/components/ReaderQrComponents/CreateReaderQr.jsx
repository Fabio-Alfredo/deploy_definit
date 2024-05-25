import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader'
import ScanOverlay from './Overlay';


const CreateReaderQr = () => {

    const [data, setData] = useState('data');

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
};

export default CreateReaderQr;

