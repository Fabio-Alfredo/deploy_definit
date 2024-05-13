import React, { useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import QRCodeStyling from 'qr-code-styling'
import logoQR from '../../assets/logoQR.svg';


const CreateQr = ({ info }) => {

    const qrRef = useRef(null);
    const qr = useRef(null);

    useEffect(() => {
        qr.current = new QRCodeStyling({
            width: 200,
            height: 200,
            data: info,
            image: logoQR,
            qrOptions: {
                typeNumber: '5',
                mode: 'Byte',
                errorCorrectionLevel: 'H',
            },
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.4,
                margin: 4
            },
            dotsOptions: {
                color: '#008D62',
                type: 'dots',
            },
            backgroundOptions: {
                color: '#FFFFFF'
            },
            dotsOptionsHelper: {
                colorType: {
                    single: true,
                    gradient: false,
                },
                gradient: {
                    linear: true,
                    radial: false,
                    color1: "#000000",
                    color2: "#008D62",
                    rotation: "0"
                }
            },
            cornersSquareOptions: {
                type: "extra-rounded",
                color: "#000000"
            },
            cornersSquareOptionsHelper: {
                colorType: {
                    single: true,
                    gradient: false
                },
                gradient: {
                    linear: true,
                    radial: false,
                    color1: "#000000",
                    color2: "#000000",
                    rotation: "0"
                }
            },
            cornersDotOptions: {
                type: "square",
                color: "#008D62"
            },
            cornersDotOptionsHelper: {
                colorType: {
                    single: true,
                    gradient: false
                },
                gradient: {
                    linear: true,
                    radial: false,
                    color1: "#000000",
                    color2: "#000000",
                    rotation: "0"
                }
            },
            backgroundOptionsHelper: {
                colorType: {
                    single: true,
                    gradient: false
                },
                gradient: {
                    linear: true,
                    radial: false,
                    color1: "#ffffff",
                    color2: "#ffffff",
                    rotation: "0"
                }
            }
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