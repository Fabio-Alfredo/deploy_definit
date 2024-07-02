
import { AiTwotoneDelete } from "react-icons/ai";

const UserList = ({ users = [], state }) => {
    return (
        <ul>

            {
                users.length > 0 ? (
                    <>
                        {
                            users.map((user) => (
                                <>
                                    <li className='font-popins  w-full flex pl-7 pt-2 justify-between text-lg' key={user.id}>
                                        {user.name}
                                        <div className={` flex justify-end pr-2 group ${state ? '' : 'hidden'} cursor-pointer`}>
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
