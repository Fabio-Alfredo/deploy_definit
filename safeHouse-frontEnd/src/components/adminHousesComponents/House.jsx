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



const House = ({ house, state, updateState }) => {

    const handleUpdateHouse = async (houseAddres) => {
        const { value: email } = await Swal.fire({
            title: "Asignar nuevo administrador",
            input: "email",
            inputLabel: "Ingrese el correo del nuevo administrador",
            showCancelButton: true,
            confirmButtonText: "Asignar",
            confirmButtonColor: "#008D62",
            inputPlaceholder: "example@gmail.com"
        });
        if (email) {
            handleConnect(houseAddres, email);
            console.log(houseAddres, email);
        }
    };

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
                <AdminHouseComponent state={state} house={house} />
                <hr className='w-full bg-black h-0 sm:h-1 ' />
            </div>
            <UserList users={house.users} house={house.id} state={state} />
        </div >
    );

};

export default House;