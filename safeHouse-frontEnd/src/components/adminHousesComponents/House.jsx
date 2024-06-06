/* eslint-disable react/prop-types */
import { IoMdSettings } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import UserList from "./userList";

const House = ({ house }) => {
    return (
        <div>
            <div className='flex-col pb-1' >
                <div className='flex justify-between pt-5'>
                    <h2 className='flex font-popins sm:font-bold text-lg sm:text-2xl font-medium'>
                        {house.direction}
                    </h2>
                    <div className='flex items-center sm:pr-3'>
                        <p className='flex font-xs font-popins font-xs '> Editar  </p>
                        <IoMdSettings className='text-3xl pl-2 ' />
                    </div>
                </div>
                <hr className='w-full bg-black mt-2 h-1' />
            </div>
            <div>
                <div className='flex items-center'>
                    <FaStar className='text-lg ' />
                    <h3 className='flex font-popins text-lg pl-2'>  {house.owner.name}</h3>
                </div>
                <hr className='w-full bg-black h-0 sm:h-1 ' />
            </div>
            <UserList users={house.users} />
        </div>
    );

};

export default House;