import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader'

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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '80%', 
                    height: 'auto',
                    margin: '0 auto',
                    border: '5px solid transparent',
                    borderRadius: '10px',
                    padding: '2px',
                    background: 'linear-gradient(to bottom right, #008D62, #FFFFFF)'
                }}
                videoStyle={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px',
                }}
            />
        </div>
    );
};

export default CreateReaderQr;
