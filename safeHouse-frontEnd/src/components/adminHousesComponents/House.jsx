/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import UserList from "./userList";
import { FaHouseUser } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { useState } from "react";
import { AssignAdminHouse } from "../../service/UserService";
import AdminHouseComponent from "./AdminHouseComponent";
import { IoSettingsOutline } from "react-icons/io5";



const House = ({ house, state, updateState, stateDeleted, updateStateDelted}) => {

    const handleUpdateHouse = async (houseAddres) => {
        const { value: formValues } = await Swal.fire({
            title: "Asignar nuevo administrador",
            html: `
                <div class="flex flex-col">
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
                const email1 = document.getElementById("swal-input2").value

                if (!email1) {
                    Swal.showValidationMessage("Todos los campos son requeridos");
                    return false;
                }
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email1)) {
                    Swal.showValidationMessage("Por favor, introduce correos electrónicos válidos");
                    return false;
                }
                return { email1: email1 }
            }
        });
        if (formValues) {
            handleConnect(houseAddres, formValues.email1);
        }
    }



    const handleConnect = async (houseAddres, email) => {
        
        try {
            const res = await AssignAdminHouse({ house: houseAddres, email: [email] });
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${res.message}`,
                confirmButtonColor: "#008D62",
                showConfirmButton: false,
                timer: 1500
            });
            updateState(!state);

        } catch (e) {
            await Swal.fire({
                position: "center",
                icon: "error",
                confirmButtonColor: "#008D62",
                title: `${e.data.message}`,
                showConfirmButton: false,
                timer: 1500
            });
            if (e.data.message === 'User not found!' || e.data.message === 'House already has an admin!') {
                handleUpdateHouse(houseAddres);
            }
        }
    }



    return (
        <div>
            <div className='flex-col pb-1' >
                <div className='flex justify-between pt-5'>
                    <h2 className='flex font-popins sm:font-bold text-lg sm:text-2xl font-medium'>
                        {/* {house.direction} */}Casa # {house.address}
                    </h2>

                    <div onClick={() => handleUpdateAdmin(house)} className={` flex items-center justify-end pr-2 group cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-100  ${state ? '' : 'hidden'}`}>
                        <p className='font-xs font-popins font-xs text-black-500'> Actualizar  </p>
                        < IoSettingsOutline className='text-3xl pl-1 text-end group-hover:text-black-500' />
                    </div>
                    <div onClick={() => handleUpdateHouse(house.address)} className={`flex items-center sm:pr-3 group cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-100  ${state ? 'hidden' : ''}`}>
                        <p className=' font-xs font-popins font-xs group-hover:block hidden text-green-500'> Asignar  </p>
                        <FaHouseUser className='text-3xl pl-2 group-hover:text-green-500 ' />
                    </div>
                </div>
                <hr className='w-full bg-black mt-2 h-1' />
            </div>
            <div>
                <AdminHouseComponent state={state} house={house} stateDeleted={stateDeleted} updateStateDelted={updateStateDelted} />
                <hr className='w-full bg-black h-0 sm:h-1 ' />
            </div>
            <UserList users={house.users} house={house.id} state={state} stateDeleted={stateDeleted} updateStateDelted={updateStateDelted} />
        </div >
    );

};

export default House;