import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";

const ButtonNewUser = () => {
    return (
        <div className='w-full flex justify-end items-center '>
            <Link to='/assingrole' className='relative  sm:pr-8 pb-2 cursor-pointer group/item'>
                <p className='font-popins text-sm flex sm:text-lg lg:text-xl items-center select-none py-2 px-4 rounded-full hover:bg-slate-100 duration-500 '>
                    Asignar Rol
                    <FaCirclePlus className='text-xl pl-2 sm:text-2xl lg:text-3xl group-hover/item:scale-110 duration-300' />
                </p>
            </Link>
        </div>
    );
}

export default ButtonNewUser;