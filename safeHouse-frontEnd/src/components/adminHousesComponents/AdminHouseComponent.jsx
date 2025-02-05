import React, { useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaStar } from "react-icons/fa";
import Swal from 'sweetalert2';
import { UpdateResidentAdmin } from '../../service/HouseService';

const AdminHouseComponent = ({ state, house, stateDeleted, updateStateDelted }) => {

    const handleUpdateAdmin = async (house1) => {

        if (house1.users.length > 0) {
            const { value: formValues } = await Swal.fire({
                title: "Asignar nuevo administrador",
                html: `
                <div class="flex flex-col">
                    <label for="swal-input1">Administrador:</label>
                    <input id="swal-input1" type="email" class="swal2-input rounded-lg mb-2" value=${house1.residentAdmin.email} readonly>
                    <label for="swal-input2">Nuevo administrador:</label>
                    <input id="swal-input2" type="email" class="swal2-input peer disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-red-500 invalid:text-red-600
                        focus:invalid:border-red-500 focus:invalid:ring-red-500 rounded-lg">
                        <p class="invisible peer-invalid:visible text-red-500 text-sm">Ingrese un email valido.</p>
                    </label>
                </div>
              `,
                confirmButtonColor: "#008D62",
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
        else {
            Swal.fire({
                title: "Desea eliminar el usuario",
                text: "¡No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#008D62",
                cancelButtonColor: "#d33",
                confirmButtonText: "Eliminar"
            }).then((result) => {
                if (result.isConfirmed) {
                    handleConnection({ email1: house1.residentAdmin.email, email2: "" }, house1.id)
                }
            });

        }
    }

    const handleConnection = async (formValues, house2) => {
        try {
            const formDat = {
                house: house2,
                oldAdmin: formValues.email1,
                newAdmin: formValues.email2
            }
            const res = await UpdateResidentAdmin(formDat);
            updateStateDelted(!stateDeleted)
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: `${res.message}`,

            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                showConfirmButton: false,
                text: `${error.data?.message || error.message}`,
                timer: 1500
            }).then(() => {
                handleUpdateAdmin(house);
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
                <div onClick={() => handleUpdateAdmin(house)} className={` flex items-center justify-end pr-2 group cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-100  ${state ? '' : 'hidden'}`}>
                    <p className='font-xs font-popins font-xs group-hover:block hidden text-red-500'> Eliminar  </p>
                    <AiTwotoneDelete className='text-3xl pl-1 text-end group-hover:text-red-500' />
                </div>
            </div>
        </>
    );
};

export default AdminHouseComponent;