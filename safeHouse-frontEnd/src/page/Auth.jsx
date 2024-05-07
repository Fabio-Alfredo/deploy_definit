import React from 'react';
import Footer from '../components/Footer';
import logo from '../assets/Logo.svg';
import LoginButton from '../components/LoginButton';



const Auth = () => {
    return (
        <div className='flex flex-col h-screen bg-HomeImg bg-cover bg-center items-center justify-center'>

            <div className='flex-1 flex flex-col items-center py-20'>
                <div className='w-40'>
                    <img src={logo} />
                </div>

                <div className='my-6'>
                    <p className='text-white font-popins text-center text-[24px] font-extralight mb-8'>BIENVENIDO A</p>
                    <p className='text-white font-brygada-1918 font-semibold text-center text-[48px]'>
                        RESIDENCIAL <br />
                        HLVS
                    </p>

                </div>
                <LoginButton />
            </div>

            <div className='w-full'>
                <Footer />
            </div>
        </div>

    );
};

export default Auth;