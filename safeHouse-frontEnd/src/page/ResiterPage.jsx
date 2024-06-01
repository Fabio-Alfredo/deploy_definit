import React, { useState, useEffect } from 'react';
//import { Navigation, Input, CatalogRole } from '../components/registerComponents';
import Navigation from '../components/Navigation';
import Input from '../components/Input';
import CatalogRole from '../components/registerComponents/CatalogRole';
import Button from '../components/Button';
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
            <div onSubmit={handleSubmit} className='flex pt-32 sm:pt-0 sm:items-center justify-center w-full bg-color-primary px-6 min-h-[90vh]'>
                <form className='w-full p-10 shadow-2xl rounded-3xl bg-white h-fit lg:p-6 xl:px-20 xl:py-10 md:w-[85%] lg:w-2/3 2xl:w-1/2' > {/* query */}
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