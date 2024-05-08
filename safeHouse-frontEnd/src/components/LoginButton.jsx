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
                className='bg-white border-solid border-2 w-[283px] h-[59.98px] rounded-full flex justify-center items-center'
                onClick={() => login()}>
                <FcGoogle className='mr-3 size-8' />
                Continue with Google
            </button>
        </div >
    );
};

export default LoginButton;