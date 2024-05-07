import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {credentialResponse} from '../service/connecctionGoogle';

const LoginButton = () => {

    return (
        <div className='mt-6'>
            <GoogleLogin
                onSuccess={credentialResponse}
            />
        </div>
    );
};

export default LoginButton;