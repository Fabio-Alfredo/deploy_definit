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
            data: info,
            image: logoQR,
            type: 'svg',
            qrOptions: {
                typeNumber: '5',
                mode: 'Byte',
                errorCorrectionLevel: 'H',
            },
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.2,
                margin: 4
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
            data: info
        });
    }, [info])


    return (

        <div className='flex w-full justify-center items-center' ref={qrRef}>
        </div>
    );
};

export default CreateQr;

/**
 * <QRCodeSVG className='xl:w-2/5 xl:h-2/5'
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
 */