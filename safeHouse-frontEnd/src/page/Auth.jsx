import React from 'react';
import Footer from '../components/Footer';
import logo from '../assets/Logo.svg';
import LoginButton from '../components/LoginButton';



const Auth = () => {
    return (
        <div className='flex flex-col h-screen bg-HomeImg bg-cover bg-center items-center justify-center'>
            <div className='flex-1 flex flex-col items-center justify-center'>
                <div className='flex flex-col w-full h-40 justify-end items-center  lg:items-start lg:relative '>
                    <img className='w-40 h-16 md:w-[234.48px] md:h-[115.83px] lg:absolute lg:right-0  ' src={logo} />
                    <p className='text-white font-popins text-center text-[24px] font-extralight pt-10 lg:text-[45px] md:text-[35px]'>BIENVENIDO A</p>
                </div>

                <p className='text-white font-brygada-1918 font-semibold  text-center text-[48px] pt-6 lg:text-[110px] md:text-[90px]' >
                    RESIDENCIAL <br className='xl:hidden' />
                    HLVS
                </p>

                <LoginButton />
            </div>

            <div className='w-full'>
                <Footer />
            </div>
        </div>

    );
};

export default Auth;