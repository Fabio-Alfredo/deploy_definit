import React, { useEffect, useState } from 'react';
import Navigation from '../Navigation';
import CreateQr from './CreateQr';
import Cronometro from './Cronometro';
import InfoUser from './InfoUser';
import { GetQr } from '../../service/QrService';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners'

const ContainerQr = () => {

    const { user } = useContext(AuthContext);
    const nav = useNavigate();
    const [date, setDate] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleTime = async () => {
        try {
            const res = await GetQr();
            setDate(res.data);
            console.log(res.data);
            setLoading(false);
            localStorage.setItem('last-open-time', Date.now());
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title:'Oopss...',
                text: `${error.data?.message || error.message}`,
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                nav('/home');
            });
        }
    }

    useEffect(() => {
        const lastOpenTime = localStorage.getItem('last-open-time');
        const tenMinutesInMs = 10 * 60 * 1000;

        if (!lastOpenTime || Date.now() - lastOpenTime > tenMinutesInMs) {
            handleTime();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        handleTime();
    }, []);

    if (user == null || loading) {
        return (
            <div className='h-screen w-full flex justify-center items-center'>
                <HashLoader color="#36d7b7" />
            </div>
        );
    }
    

    return (
        <>
            <div className='w-full p-4 sm:p-8 shadow-2xl rounded-3xl bg-white h-fit lg:w-2/3  xl:w-1/2' > {/* query */}
                <Navigation title={"Entrada"} />
                <hr className='h-0.5 bg-black' />
                {/* <Cronometro handleTime={handleTime} /> */}
                {date ? <CreateQr info={date} /> : <></>} {/* para coneccion con api */}
                {/*qrData && <InfoUser data={qrData} />*/} {/* para coneccion con api */}
                {/* <CreateQr info={date} /> */}
                <InfoUser data={user} />
                <hr className='h-0.5 bg-black m-4' />
            </div>
        </>
    );
};

export default ContainerQr;