import React, { useState, useEffect } from 'react';
import { Navigation, Input, CatalogRole } from '../components/registerComponents';
import Button from '../components/Button';
import logo from '../assets/Logo.svg';
import { useForm } from '../hooks/useForm';
import Header from '../components/Header';


const ResiterPage = () => {

    const { userName, email, role, InputChange } = useForm({
        userName: '',
        email: '',
        role: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const formValues = {
            name: userName,
            email: email,
            role: role
        }
        console.log(formValues);
    }

    return (
        <div className='h-screen'>
            <Header/>
            <div onSubmit={handleSubmit} className='flex items-center justify-center w-full bg-color-primary px-6 h-[90vh]'>
                <form className=' w-full p-8 shadow-2xl rounded-3xl bg-white xl:h-3/4 xl:p-14 lg:w-1/2' > {/* query */}
                    <Navigation title={"Registrar usuario"} />
                    <Input name={"userName"} label={"Nombre:"} type={"text"} inputValue={userName} inputOnchange={InputChange} />
                    <Input name={"email"} label={"Email:"} type={"email"} inputValue={email} inputOnchange={InputChange} />
                    <CatalogRole inputValue={role} inputOnchange={InputChange} />
                    <Button value={"Registrar"} type={"submit"} name={"RegisterButton"} />
                </form>
            </div>
        </div>
    );
};


export default ResiterPage;