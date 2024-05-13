import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import logoQR from '../../assets/logoQR.svg';

const CreateQr = ({ info }) => {

    return (

        <div className='flex w-full justify-center items-center'>
            <QRCodeSVG className='xl:w-2/5 xl:h-2/5'
                //value={info.date+info.email} para coneccion con api
                value={info}
                bgColor='#ffffff'
                fgColor='#000000'
                level='L'
                size={200}
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