import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { credentialResponse } from '../service/connecctionGoogle';
import { gapi } from 'gapi-script';
const LoginButton = () => {

    return (
        <div className='mt-6'>
            <GoogleLogin
                width={300}
                theme='filled_black'
                text='Iniciar con Google'
                onSuccess={credentialResponse}
            />
        </div>
    );
};

export default LoginButton;