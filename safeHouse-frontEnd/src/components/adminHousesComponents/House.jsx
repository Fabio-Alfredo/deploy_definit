/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import UserList from "./userList";
import { FaHouseUser } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";



const House = ({ house, state }) => {
    return (
        <div>
            <div className='flex-col pb-1' >
                <div className='flex justify-between pt-5'>
                    <h2 className='flex font-popins sm:font-bold text-lg sm:text-2xl font-medium'>
                        {/* {house.direction} */}Casa # {house.address}
                    </h2>
                    <div className={`flex items-center sm:pr-3 ${state ? 'hidden' : ''}`}>
                        <p className='flex font-xs font-popins font-xs '> Asignar  </p>
                        <FaHouseUser className='text-3xl pl-2 ' />
                    </div>
                </div>
                <hr className='w-full bg-black mt-2 h-1' />
            </div>
            <div>
                <div className='flex items-center'>
                    <FaStar className={`text-lg ${state ? '' : 'hidden'} `} />
                    <h3 className='flex font-popins w-4/5  text-lg pl-2'>
                        {/* {house.owner.name} */}
                        {
                            house.residentAdmin ? house.residentAdmin.name : 'No hay residentes'
                        }
                    </h3>
                    <div className={`w-full flex items-center justify-end pr-2 group cursor-pointer ${state?'':'hidden'}`}>
                        <p className='font-xs font-popins font-xs group-hover:block hidden text-red-500'> Eliminar  </p>
                        <AiTwotoneDelete className='text-3xl pl-1 text-end group-hover:text-red-500' />
                    </div>
                </div>
                <hr className='w-full bg-black h-0 sm:h-1 ' />
            </div>
            <UserList users={house.users} state={state} />
        </div >
    );

};

export default House;