import React, { useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaStar } from "react-icons/fa";
import Swal from 'sweetalert2';
import { UpdateResidentAdmin } from '../../service/HouseService';

const AdminHouseComponent = ({ state, house }) => {

    const handleUpdateAdmin = async (house1) => {
        const { value: formValues } = await Swal.fire({
            title: "Multiple inputs",
            html: `
            <label for="swal-input1">Email 1:</label>
            <input id="swal-input1" type="email" class="swal2-input rounded-lg" value=${house1.residentAdmin.email} readonly>
            <label for="swal-input2">Email 2:
            <input id="swal-input2" type="email" class="swal2-input peer disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-red-500 invalid:text-red-600
            focus:invalid:border-red-500 focus:invalid:ring-red-500 rounded-lg">
            <p class="invisible peer-invalid:visible text-red-500 text-sm">Ingrese un email valido.</p>
            </label>
          `,
            focusConfirm: false,
            preConfirm: () => {

                const email1 = document.getElementById("swal-input1").value
                const email2 = document.getElementById("swal-input2").value

                if (!email1 || !email2) {
                    Swal.showValidationMessage("Todos los campos son requeridos");
                    return false;
                }
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email1) || !emailPattern.test(email2)) {
                    Swal.showValidationMessage("Por favor, introduce correos electrónicos válidos");
                    return false;
                }
                return { email1: email1, email2: email2 }
            }
        });
        if (formValues) {
            handleConnection(formValues, house1.id);
        }
    }

    const handleConnection = async (formValues, house2) => {
        try{
            const formDat = {
                house:house2,
                oldAdmin: formValues.email1,
                newAdmin: formValues.email2
            }
            console.log(formDat);
            const res = await UpdateResidentAdmin(formDat);
            
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: `${res.message}`,

            })
        }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.data.message}`,
            })
        }
        
    }

    return (
        <>
            <div className='flex items-center justify-between '>
                <h3 className='flex font-popins items-center w-4/5  text-lg pl-2'>
                    <FaStar className={`text-lg ${state ? '' : 'hidden'} `} />
                    {
                        house.residentAdmin ? house.residentAdmin.name : 'No hay residentes'
                    }
                </h3>
                <div onClick={() => handleUpdateAdmin(house)} className={` flex items-center justify-end pr-2 group cursor-pointer  ${state ? '' : 'hidden'}`}>
                    <p className='font-xs font-popins font-xs group-hover:block hidden text-red-500'> Eliminar  </p>
                    <AiTwotoneDelete className='text-3xl pl-1 text-end group-hover:text-red-500' />
                </div>
            </div>
        </>
    );
};

export default AdminHouseComponent;