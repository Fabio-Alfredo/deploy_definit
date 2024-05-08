import React, { useState } from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { credentialResponse } from '../service/connecctionGoogle';
import { gapi } from 'gapi-script';
import { FcGoogle } from "react-icons/fc";


/**<GoogleLogin
                width={300}
                theme='filled_black'
                text='Iniciar con Google'
                onSuccess={credentialResponse}
            /> */

const LoginButton = () => {

    const login = useGoogleLogin({
        onSuccess: credentialResponse,
        onError: (error) => console.log('Login Failed:', error)
    });


    return (
        <div className='mt-6 '>
            <button
                className='bg-white font-roboto rounded-full flex justify-center items-center font-bold text-sm border-solid border-2 w-[200px] h-[40px] lg:w-[280px] lg:h-[55px] lg:text-xl'
                onClick={() => login()}>
                <FcGoogle className='mr-3 size-6 lg:size-10' />
                Sing in with Google
            </button>
        </div >
    );
};

export default LoginButton;