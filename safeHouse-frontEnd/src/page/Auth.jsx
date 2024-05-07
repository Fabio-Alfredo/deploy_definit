import React from 'react';
import Footer from '../components/Footer';
import logo from '../assets/Logo.svg';
import LoginButton from '../components/LoginButton';
import { GoogleLogin } from '@react-oauth/google';



const Auth = () => {
    return (
        <div className='flex flex-col h-screen bg-HomeImg bg-cover bg-center items-center justify-center'>

            <div className='flex-1 items-center py-14'>
                <div className=''>
                    <img src={logo} />
                </div>

                <div >
                    <p className='text-white text-center py-6 text-base'>BIENVENIDO A</p>
                    <p className='text-white text-center text-4xl font-bold'>RESIDENCIAL</p>
                    <p className='text-white text-center text-4xl font-bold'>HLVS</p>
                </div>
            </div>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />

            <div className='w-full'>
                <Footer />
            </div>
        </div>

    );
};

export default Auth;