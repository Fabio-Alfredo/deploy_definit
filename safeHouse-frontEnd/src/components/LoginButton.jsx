import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {credentialResponse} from '../service/connecctionGoogle';

const LoginButton = () => {
    const [user, setUser] = useState([]);

    return (
        <div className='mt-6'>
            <GoogleLogin
                onSuccess={credentialResponse}
            />
        </div>
    );
};

export default LoginButton;