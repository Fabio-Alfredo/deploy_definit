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
import { AssignAdminHouse, AssignUsersHouse } from '../service/UserService'


const ResiterPage = () => {

    const location = useLocation();
    const nav = useNavigate();
    const user = location.state;
    const [house, houses] = useState(null);

    const { userName, email, role, InputChange, } = useForm({
        userName: user.name,
        email: user.email,
        role: ''
    })

    const handleChangeRole = async (role) => {
        if (role == 'RSAD' || role == 'RESD') {
            const { value: text } = await Swal.fire({
                input: "number",
                inputLabel: "Casa",
                inputPlaceholder: "Ingrese el número de casa",
                inputAttributes: {
                    "aria-label": "Type your message here"
                },
                showCancelButton: true
            });
            if (text) {
                houses(text);
            }
        } else {
            houses(null);
        }
    }

    useEffect(() => {
        handleChangeRole(role);
    }, [role])

    const handleHouseAdmin = async (formValues) => {
        try {
            const res = await AssignAdminHouse(formValues);
            Swal.fire({
                icon: "success",
                title: "¡Éxito!",
                text: ` ${res.message}`
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: ` ${error.data.message}`
            });
        }
    }

    const handleAssignUserHouse = async (formValues) => {
        try {
            const res = await AssignUsersHouse(formValues);
            Swal.fire({
                icon: "success",
                title: "¡Éxito!",
                text: ` ${res.message}`
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: ` ${error.data.message}`
            });
        }
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        // const roleArray = role === '' ? [] : [role];
        if (role == '') {
            const formValues = { name: userName, email: email, role: role }
        } else if (role == 'RSAD') {
            const formValues = { name: userName, email: [email], house: house }
            console.log(formValues);
            handleHouseAdmin(formValues);
        }
        else {
            const formValues = { name: userName, emails: [email], house:house}
            console.log(formValues);
            handleAssignUserHouse(formValues);
        }
        nav(-1);
    }

    return (
        <div className='h-screen'>
            <Header />
            <div onSubmit={handleSubmit} className='flex items-center justify-center w-full bg-color-primary px-6 min-h-[90vh]'>
                <form className='w-full p-10 shadow-2xl rounded-3xl bg-white h-fit lg:p-6 xl:px-20 xl:py-10 md:w-[85%] lg:w-2/3 2xl:w-1/2' > {/* query */}
                    <Navigation title={"Asignar rol"} />
                    <Input name={"userName"} label={"Nombre:"} type={"text"} inputValue={userName} readOnly={true} inputOnchange={InputChange} />
                    <Input name={"email"} label={"Email:"} type={"email"} inputValue={email} readOnly={true} inputOnchange={InputChange} />
                    <CatalogRole inputValue={role} house={house} inputOnchange={InputChange} />
                    <div className='flex pl-[50%] w-full  items-center mt-6 lg:mt-4 '>
                        <Button class={'grow-0'} value={"Registrar"} type={"submit"} name={"RegisterButton"} />
                    </div>

                </form>

            </div>
        </div>
    );
};


export default ResiterPage;