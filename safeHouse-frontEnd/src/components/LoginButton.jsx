import React, { useContext, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AuthConecction } from '../service/AuthService';
import { GetUserData } from '../service/UserService';
            
const LoginButton = () => {

    const navigateTo = useNavigate();
    const { saveToken, saveUser } = useContext(AuthContext );

    const credentialResponse = async (response) => {
        try{
            const { access_token } = response;
            const data = {
                token: access_token
            }
            const res = await AuthConecction(data);
            saveToken(res.data);
            getUserData();
            navigateTo('/home');
        }catch(error){
            console.log(error);
        }
    }

    const getUserData = async () => {
        try{
            const res =  await GetUserData();

            saveUser(res.data);
        }catch(error){
            console.log(error);
        }
    }

    const login = useGoogleLogin({
        onSuccess: credentialResponse,
        onError: (error) => console.log('Login Failed:', error)
    });


    return (
        <div className='mt-6 '>
            <button
                className='bg-white font-roboto rounded-full flex justify-center items-center font-medium text-sm border-solid border-2 w-[200px] h-[40px] lg:w-[280px] lg:h-[55px] lg:text-xl'
                onClick={() => login()}>
                <FcGoogle className='mr-3 size-6 lg:size-10' />
                Continue with Google
            </button>
        </div >
    );
};

export default LoginButton;