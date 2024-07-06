import React, { useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import QRCodeStyling from 'qr-code-styling'
import logoQR from '../../assets/logoQR.svg';


const CreateQr = ({ info }) => {

    const qrRef = useRef(null);
    const qr = useRef(null);


    useEffect(() => {
        qr.current = new QRCodeStyling({
            width: 300,
            height: 300,
            data: JSON.stringify(info),
            image: logoQR,
            type: 'svg',
            qrOptions: {
                typeNumber: "0",
                mode: 'Byte',
                errorCorrectionLevel: 'M',
            },
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.8,
                margin: 1
            },
            //degradado interno
            dotsOptions: {
                type: 'dots',
                gradient: {
                    type: "radial",
                    rotation: 0,
                    colorStops: [
                        {
                            offset: 0,
                            color: "#000000"
                        },
                        {
                            offset: 1,
                            color: "#008D62"
                        }

                    ]
                }
            },
            //degradado de las esquinas
            cornersSquareOptions: {
                gradient: {
                    type: "lineal",
                    rotation: 0,
                    colorStops: [

                        {
                            offset: 0,
                            color: "#000000"
                        },
                        {
                            offset: 1,
                            color: "#008D62"
                        },
                    ]
                }
            },
            //degradado de los centros de la esquina
            cornersDotOptions: {
                color: "#000000",
                gradient: {
                    type: "radial",
                    rotation: 0,
                    colorStops: [
                        {
                            offset: 0,
                            color: "#000000"
                        },
                        {
                            offset: 1,
                            color: "#008D62"
                        }
                    ]
                }
            },
        });
        qr.current.append(qrRef.current);
        qr.current.update({
            data: JSON.stringify(info),
        });
    }, [info])


    return (

        <div className='flex w-full justify-center items-center' ref={qrRef}>
        </div>
    );
};

export default CreateQr;
