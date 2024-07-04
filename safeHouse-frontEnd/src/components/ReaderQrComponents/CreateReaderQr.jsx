import React, { useState } from 'react';
import QrReader from 'modern-react-qr-reader'
import ScanOverlay from './Overlay';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const CreateReaderQr = () => {

    const [data, setData] = useState('data');
    const nav = useNavigate();


    const handleScan = (info) => {
        if (info) {
            setData(info);
            console.log(data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                nav('/home')
            });
            
        }

    }

    const handleError = (err) => {
        console.error(err)
    }



    return (
        // lg:w-1/2
        <div className='flex flex-col lg:w-4/5 w-full'>
            <div className='flex justify-center items-center relative mx-10 mt-10 md:mx-16 md:mt-16 lg:mx-4 lg:mt-4 p-1 bg-gradient-to-r from-green-400 from-10%  via-color-primary via-40% to-green-400 to-80%'>
                <QrReader
                    delay={200}
                    facingMode={"environment"}
                    onError={handleError}
                    onScan={handleScan}
                    resolution={1000}
                    style={{
                        width: '100%'
                    }}
                    showViewFinder={false}
                />
                <ScanOverlay />
            </div>
            <p className='text-center font-bold text-xl my-2 cursor-default'>
                <span className='text-green-primary'>S</span>
                afe
                <span className='text-green-primary'>H</span>
                ouse
            </p>
        </div>
    );
};


export default CreateReaderQr;
