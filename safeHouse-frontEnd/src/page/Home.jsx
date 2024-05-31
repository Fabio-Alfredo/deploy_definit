import logo from '../assets/Logo.svg'
import profile from '../assets/HomeImg.png'
import Button from '../components/Button.jsx'
import Option from '../components/Option.jsx'
import { MdQrCodeScanner, MdHouse, MdPeopleAlt } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";

const Home = () => {

    const navigate = [
        {
            title: `Escanear entrada`,
            icon: MdQrCodeScanner,
        },
        {
            title: "Registrar entrada anonima",
            icon: FaUser,
        },
        {
            title: "Administración de entradas",
            icon: MdHouse,
        },
        {
            title: "Administración de usuarios",
            icon: MdPeopleAlt,
        },
        {
            title: "Reporte de entradas",
            icon: TbReportAnalytics,
        }
    ]

    return (
        <div>
            <header className='bg-color-primary  flex justify-center sm:justify-start min-w-screen h-[10vh]'>
                <img className='sm:p-2 pt-5 scale-75 ml-3 ' src={logo} />
            </header>
            <div className="min-w-screen min-h-[90vh] flex flex-col justify-center items-center gap-10 bg-color-primary ">
                <h1 className='w-full font-brygada-1918 text-2xl md:text-4xl xl:text-6xl xl:pl-36 text-center xl:text-start'>Bienvenido</h1>
                <div className='w-[360px] h-[420px] md:w-[700px] md:h-[360px] p-8 md:p-12 bg-white grid grid-flow-dense grid-rows-5 grid-cols-1 md:grid-rows-3 md:grid-cols-3 justify-center items-center shadow-2xl rounded-xl'>
                    <img className='w-44 h-44 rounded-full border-4 row-span-2 border-black' src={profile}/>
                    <p className='md:col-span-2 text-4xl font-popins font-bold md:self-end'>Nombre Apellido</p>
                    <p className='md:col-span-2 text-xl md:self-start'>administrador@gmail.com</p>
                    <Button type={'button'} name={'Log out'} value={'Cerrar sesión'} />
                </div>
                <div className='flex gap-4 sm:gap-8 md:gap-10 xl:gap-12 flex-wrap justify-center items-center'>
                    {navigate.map((item) => (
                        <Option image={item.icon} title={item.title} />
                    )
                    )}
                </div>
            </div>
        </div>

    )
}

export default Home; 