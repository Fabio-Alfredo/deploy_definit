import Header from "../components/Header";
import { RiArrowLeftCircleLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminHouse = () => {
    const [houses, setHouse] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('data.json');
                setHouse(response.data.houses);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, [])

    return (
        <div>
            <Header />
            <div className='bg-principalColor w-full flex-col h-[90vh] flex justify-center items-center p-6 '>
                <div className='w-1/2 bg-white h-3/4 shadow-lg br-20 p-8  rounded-2xl'>
                    <nav className='flex felx-row items-center justify-center p-4'>
                        <RiArrowLeftCircleLine className='hidden text-5xl  md:block' />
                        <h2 className='font-brygada-1918 text-center flex-grow text-5xl'> Administracion de casa</h2>
                    </nav>

                    <div className="overflow-y-auto h-3/4">
                        {
                            houses.map((house) => (
                                <div key={house.id}>
                                    <div className='flex-col pb-3' >
                                        <div className='flex justify-between pt-5'>
                                            <h2 className='flex font-popins font-bold text-2xl '>
                                                {house.direction}
                                            </h2>
                                            <div className='flex items-center pr-3'>
                                                <p className='flex font-xs font-popins font-xs '> Editar  </p>
                                                <IoMdSettings className='text-3xl pl-2 ' />
                                            </div>
                                        </div>
                                        <hr className='w-full bg-black mt-2 h-1' />
                                    </div>
                                    <div>
                                        <div className='flex items-center'>
                                            <FaStar className='text-xl ' />
                                            <h3 className='flex font-popins text-lg pl-2'>  {house.owner.name}</h3>
                                        </div>
                                        <hr className='w-full bg-black  h-px' />
                                    </div>
                                    <ul>
                                        {house.users.map((user) => (
                                            <li className='font-popins pl-7' key={user.id}>
                                                {user.name}
                                                <hr className='w-full bg-black  h-0.1' />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHouse;
