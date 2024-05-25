import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader'
import ScanOverlay from './Overlay';

const CreateReaderQr = () => {
    const [data, setData] = useState('No result');


    return (
        <div className='flex py-4 justify-center items-center '>
            <QrReader
                onResult={(result, error) => {
                    if (result) {
                        setData(result?.text);
                    }

                    if (error) {
                        console.info(error);
                    }
                }}
                facingMode={'self'}
                constraints={{ facingMode: 'environment' }}
                scanDelay={5000}
                containerStyle={{
                    width: '80%',
                    height: 'auto',
                    border: '5px solid transparent',
                    borderRadius: '10px',
                    padding: '2px',
                    background: 'linear-gradient(to bottom right, #008D62, #FFFFFF)'

                }}
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

        </div>
    );
};

export default CreateReaderQr;
