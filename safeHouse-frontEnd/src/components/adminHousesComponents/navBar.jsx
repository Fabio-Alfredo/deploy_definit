import { RiArrowLeftCircleLine } from "react-icons/ri";

const navBar = () => {
    return (
        <>
            <nav className='flex felx-row items-center justify-center pb-7'>
                <RiArrowLeftCircleLine className='hidden text-5xl  lg:block' />
                <h2 className='font-brygada-1918 text-center flex-grow text-3xl md:text-4xl lg:text-5xl'> Administracion de casa</h2>
            </nav>
        </>
    );
};

export default navBar;