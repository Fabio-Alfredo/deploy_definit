import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import logoQR from '../../assets/logoQR.svg';

const CreateQr = () => {
    return (
        <div className='flex w-full justify-center items-center'>
            
            <QRCodeSVG
                value='Hello'
                bgColor='#ffffff'
                fgColor='#000000'
                size={256}
                level='L'
                includeMargin={false}
                imageSettings={{
                    src: logoQR,
                    x: undefined,
                    y: undefined,
                    height: 25,
                    width: 40,
                    excavate: true
                }}
            />
        </div>
    );
};

export default CreateQr;