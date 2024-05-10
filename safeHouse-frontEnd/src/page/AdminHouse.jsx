import Header from "../components/Header";
import { RiArrowLeftCircleLine } from "react-icons/ri";

const AdminHouse = () => {
    return (
        <div>
            <Header />
            <div className='bg-principalColor w-full flex-col h-[90vh] flex justify-center items-center p-6 '>
                <div className='w-1/2 bg-white h-2/3 shadow-lg br-20 p-8  rounded-2xl'>
                    <nav className='flex felx-row items-center justify-center p-4'>
                        <RiArrowLeftCircleLine className='hidden text-5xl flex-shrink-0 md:block' />
                        <h2 className=' font-brygada-1918 text-center flex-grow text-5xl'> Administracion de casa</h2>
                        
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default AdminHouse;
