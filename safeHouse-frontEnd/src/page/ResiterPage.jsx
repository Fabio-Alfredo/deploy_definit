import React, { useState, useEffect } from 'react';
//import { Navigation, Input, CatalogRole } from '../components/registerComponents';
import Navigation from '../components/Navigation';
import Input from '../components/Input';
import CatalogRole from '../components/registerComponents/CatalogRole';
import Button from '../components/Button';
import { useForm } from '../hooks/useForm';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ContractEmployee } from '../service/UserService'


const ResiterPage = () => {

    const location = useLocation();
    const nav = useNavigate();
    const user = location.state;

    const { userName, email, role, InputChange, } = useForm({
        userName: user.name,
        email: user.email,
        role: ''
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                employee: email,
                role: role
            }
            const res = await ContractEmployee(data);
            Swal.fire({
                icon: 'success',
                title: `${res.message}`,
                showConfirmButton: false,
                timer: 1500
            })
            nav(-1);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `${error.data.message}`,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return (
        <div className='h-screen'>
            <Header />
            <div onSubmit={handleSubmit} className='flex items-center justify-center w-full bg-color-primary px-6 min-h-[90vh]'>
                <form className='w-full p-10 shadow-2xl rounded-3xl bg-white h-fit lg:p-6 xl:px-20 xl:py-10 md:w-[85%] lg:w-2/3 2xl:w-1/2' > {/* query */}
                    <Navigation title={"Empleado"} />
                    <Input name={"userName"} label={"Nombre:"} type={"text"} inputValue={userName} readOnly={true} inputOnchange={InputChange} />
                    <Input name={"email"} label={"Email:"} type={"email"} inputValue={email} readOnly={true} inputOnchange={InputChange} />
                    <CatalogRole inputValue={role} inputOnchange={InputChange} />
                    <div className='flex pl-[50%] w-full  items-center mt-6 lg:mt-4 '>
                        <Button class={'grow-0'} value={"Registrar"} type={"submit"} name={"RegisterButton"} />
                    </div>

                </form>

            </div>
        </div>
    );
};


export default ResiterPage;