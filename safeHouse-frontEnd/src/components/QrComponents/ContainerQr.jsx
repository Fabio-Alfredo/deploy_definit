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

const ContainerQr = () => {

    const { user } = useContext(AuthContext);
    const nav = useNavigate();

    const [date, setDate] = useState(null);

    useEffect(() => {
        handleTime();

    }, []);


    const handleTime = async () => {
        try {
            const res = await GetQr();
            setDate(res.data);

        } catch (error) {
            console.log(error.data.message);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Algo salio mal",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {

                nav('/home')
            })
        }
    }

    if (user == null) {
        return (
            <div className='h-screen w-full flex justify-center items-center'>
                <HashLoader color="#36d7b7" />
            </div>
        )
    }

    return (
        <>
            <div className='w-full p-4 sm:p-8 shadow-2xl rounded-3xl bg-white h-fit lg:w-2/3  xl:w-1/2' > {/* query */}
                <Navigation title={"Entrada"} />
                <hr className='h-0.5 bg-black' />
                <Cronometro handleTime={handleTime} />
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