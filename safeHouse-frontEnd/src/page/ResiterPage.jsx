import React, { useState, useEffect } from 'react';
//import { Navigation, Input, CatalogRole } from '../components/registerComponents';
import Navigation from '../components/Navigation';
import Input from '../components/Input';
import CatalogRole from '../components/registerComponents/CatalogRole';
import Button from '../components/Button';
import { useForm } from '../hooks/useForm';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from 'sweetalert2';


const ResiterPage = () => {

    const location = useLocation();
    const user = location.state;

    console.log(user);

    const { userName, email, role, InputChange } = useForm({
        userName: user.name,
        email: user.email,
        role: ''
    })

    //TODO: Implementar la asignación de rol
    const handleSubmit = (e) => {
        e.preventDefault();

        const formValues = {
            name: userName,
            email: email,
            role: role
        }
        console.log(formValues);
    }

    //TODO: Implementar la eliminación de usuario

    const handleDelete = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });
    }

    return (
        <div className='h-screen'>
            <Header />
            <div onSubmit={handleSubmit} className='flex items-center justify-center w-full bg-color-primary px-6 min-h-[90vh]'>
                <form className='w-full p-10 shadow-2xl rounded-3xl bg-white h-fit lg:p-6 xl:px-20 xl:py-10 md:w-[85%] lg:w-2/3 2xl:w-1/2' > {/* query */}
                    <Navigation title={"Asignar rol"} />
                    <Input name={"userName"} label={"Nombre:"} type={"text"} inputValue={userName} readOnly={true} inputOnchange={InputChange} />
                    <Input name={"email"} label={"Email:"} type={"email"} inputValue={email} readOnly={true} inputOnchange={InputChange} />
                    <CatalogRole inputValue={role} inputOnchange={InputChange} />
                    <div className='flex pl-[50%] w-full  items-center mt-6 lg:mt-4 '>
                        <Button class={'grow-0'} value={"Registrar"} type={"submit"} name={"RegisterButton"} />
                        <RiDeleteBin5Line onClick={handleDelete} className='text-5xl grow ml-28 mt-3 cursor-pointer hover:text-gray-600 hover:-translate-y-1 duration-300 ' />
                    </div>

                </form>

            </div>
        </div>
    );
};


export default ResiterPage;