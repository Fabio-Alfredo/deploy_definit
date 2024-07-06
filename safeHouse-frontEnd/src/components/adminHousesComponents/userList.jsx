import { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { DeleteResident } from "../../service/HouseService";
import Swal from "sweetalert2";

const UserList = ({ users = [], state, house, stateDeleted, updateStateDelted }) => {

    const handdleDelete = async (house, user) => {
        try {
            Swal.fire({
                title: "Desea eliminar el usuario",
                text: "¡No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#008D62",
                cancelButtonColor: "#d33",
                confirmButtonText: "Eliminar"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await DeleteResident(house, user.email);
                    updateStateDelted(!stateDeleted)
                    Swal.fire({
                        title: "Deleted!",
                        text: `${res.message}`,
                        confirmButtonColor: "#008D62",
                        icon: "success"
                    });
                }
            });

        } catch (e) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${e.data.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }

    }

    return (
        <ul>

            {
                users.length > 0 ? (
                    <>
                        {
                            users.map((user) => (
                                <>
                                    <li onClick={() => handdleDelete(house, user)} className='font-popins  w-full flex pl-7 pt-2 justify-between text-lg' key={user.id}>
                                        {user.name}
                                        <div className={` flex justify-end pr-2 group ${state ? '' : 'hidden'} transition ease-in-out hover:-translate-y-1 hover:scale-100 cursor-pointer`}>
                                            <p className='font-xs font-popins  text-red-500 group-hover:block hidden'> Eliminar  </p>
                                            <AiTwotoneDelete className='text-3xl pl-1 text-end group-hover:text-red-500 ' />
                                        </div>
                                    </li>

                                    <hr className='w-full bg-black  sm:h-1 h-[0%]' />
                                </>
                            ))
                        }
                    </>

                ) : (
                    <li className='font-popins pl-7 pt-2 text-lg'>
                        No hay residentes
                    </li>
                )
            }

        </ul>
    );
}

export default UserList;
