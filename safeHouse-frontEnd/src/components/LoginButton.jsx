import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const LoginButton = () => {

    const credentialResponse =(response) => {
        try {
            const {credential}=response;
            const res = jwtDecode(credential);
            console.log(res);
        }catch (error) {
            console.log(error);
        }
    
    }

    return (
        <div className='mt-6'>
            <GoogleLogin
                onSuccess={credentialResponse}
            />
        </div>
    );
};

export default LoginButton;