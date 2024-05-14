import { RiArrowLeftCircleLine } from "react-icons/ri";

const navBar = () => {
    return (
        <>
            <nav className='flex felx-row items-center justify-center p-4'>
                <RiArrowLeftCircleLine className='hidden text-5xl  md:block' />
                <h2 className='font-brygada-1918 text-center flex-grow text-3xl sm:text-5xl'> Administracion de casa</h2>
            </nav>
        </>
    );
};

export default navBar;