import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader'
import ScanOverlay from './Overlay';
import { data } from 'autoprefixer';


const CreateReaderQr = () => {

    const [resulta, setResult] = useState('data');

    return (
        <div className='flex py-4 xl:w-11/12 w-full justify-center items-center '>
            <QrReader
                onResult={(result, error) => {
                    if (result) {
                        setResult(result?.text);
                        alert(result);
                    }

                    if (error) {
                        console.info(error);
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
                    id: 'videoContainer',
                    
                }}
                scanDelay={5000}
                videoId='videoContainer'
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
            <p>{resulta}</p>
        </div>
    );
};

export default CreateReaderQr;

