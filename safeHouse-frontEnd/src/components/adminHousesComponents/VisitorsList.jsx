/* eslint-disable react/prop-types */
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";

const VisitorsList = ({ user }) => {

    return (
        <ul>
            <li className='font-popins pt-2 sm:text-lg text-xs' key={user.id}>
                <div className="flex justify-between">
                    <p className="font-bold pl-7">
                        {user.name}
                    </p>
                    <Link to='/assingrole' state = {user}>
                        <div  className='flex items-center   sm:pr-3'>
                            <p className='flex font-xs font-popins font-xs '> Editar  </p>
                            <IoMdSettings className='text-3xl pl-2 ' />
                        </div>
                    </Link>
                </div>
                <hr className='w-full bg-black  sm:h-[2px] h-[1px]' />
                <p className="pl-14 pt-2">
                    {user.email}
                </p>
                <hr className=' ml-7  bg-black   mb-8' />

            </li>

        </ul >
    )
}

export default VisitorsList;
