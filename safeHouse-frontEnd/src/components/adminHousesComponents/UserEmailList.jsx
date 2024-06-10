/* eslint-disable react/prop-types */
import { IoMdSettings } from "react-icons/io";

const UserEmailList = ({ users }) => {
    return (
        <ul>
            {users.map((user) => (
                <li className='font-popins pt-2 sm:text-lg text-sm m-6' key={user.id}>
                    <div className="flex justify-between">
                        <p className="font-bold pl-7">
                            {user.name}
                        </p>
                        <div className='flex items-center   sm:pr-3'>
                            <p className='flex font-xs font-popins font-xs '> Editar  </p>
                            <IoMdSettings className='text-3xl pl-2 ' />
                        </div>
                    </div>
                    <hr className='w-full bg-black  sm:h-1 h-[0%]' />
                    <p className="pl-14 pt-2">
                        {user.email}
                    </p>
                    <hr className=' ml-7  bg-black  sm:h-1 h-[0%] mb-8' />
                </li>
            ))}
        </ul>
    );
}

export default UserEmailList;