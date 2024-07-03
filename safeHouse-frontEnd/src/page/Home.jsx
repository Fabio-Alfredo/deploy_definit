import logo from '../assets/Logo.svg'
import profile from '../assets/HomeImg.png'
import Button from '../components/Button.jsx'
import Option from '../components/Option.jsx'
import { MdQrCodeScanner, MdHouse, MdPeopleAlt, MdAssignmentInd, MdOutlineQrCode2, MdPreview } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import Header from '../components/Header.jsx';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

import { Link } from 'react-router-dom';

import { HashLoader } from 'react-spinners'


const Home = () => {
    const { token, removeData, user } = useContext(AuthContext);

    const adminOption = [
        {
            title: "Escanear entrada",
            icon: MdQrCodeScanner,
            route: '/readerqr'
        },
        {
            title: "Registrar entrada anonima",
            icon: FaUser,
            route: '/registerentry'
        }
        ,
        {
            title: "Administración de entradas",
            icon: MdHouse,
            route: '/adminhouse'
        },
        {
            title: "Administración de usuarios",
            icon: MdPeopleAlt,
            route: '/aduser'
        },
        {
            title: "Reporte de entradas",
            icon: TbReportAnalytics,
            route: '/entryrep'
        },
        {
            title: "Historial Completo",
            icon: FaHistory,
            route: '/History'
        },
        {
            title: "Revisar invitaciones",
            icon: MdPreview,
            route: '/invitations'
        }
    ]

    const empOpt = [
        {
            title: `Escanear entrada`,
            icon: MdQrCodeScanner,
        },
        {
            title: `Registar entrada anonima`,
            icon: FaUser,
        }
    ]

    const resAdminOpt = [
        {
            title: `Generar entrada`,
            icon: MdOutlineQrCode2,
        },
        {
            title: `Solicitud visita`,
            icon: IoMail,
        },
        {
            title: `Administrar invitaciones`,
            icon: MdAssignmentInd,
        },
        {
            title: `Reporte de visitas`,
            icon: TbReportAnalytics,
        }
    ]

    const resOpt = [
        {
            title: `Generar entrada`,
            icon: MdOutlineQrCode2,
            route: '/generateqr'
        },
        {
            title: `Solicitud visita`,
            icon: IoMail,
            route: '/requestvisit'
        }
    ]

    const vistOpt = [
        {
            title: `Invitaciones`,
            icon: IoMail,
        },
        {
            title: `Generar entrada`,
            icon: MdOutlineQrCode2,
        }
    ]

    //borrar token de local storage
    const logout = () => {
        removeData()
        console.log('cerrar sesion')
        window.location.href = '/';
    }


    if (user == null) {
        return (
            <div className='h-screen w-full flex justify-center items-center'>
                <HashLoader color="#36d7b7" />
            </div>
        )
    }


    return (
        <div>
            <Header />
            <div className="min-w-screen min-h-[90vh] flex flex-col pt-6 md:pt-0 md:justify-center items-center gap-10 bg-color-primary ">
                <h1 className='w-full font-brygada-1918 text-2xl md:text-4xl xl:text-6xl md:pl-24 xl:pl-36 text-center md:text-start'>Bienvenido</h1>
                <div className='w-[320px] xs:w-[360px] h-80 sm:h-[360px] md:w-[700px] md:h-[360px] p-8 md:p-12 bg-white grid grid-flow-dense grid-rows-8 grid-cols-1 md:grid-rows-3 md:grid-cols-3 justify-center items-center shadow-2xl rounded-xl'>
                    <div className='row-span-5 md:row-span-2 flex justify-center'><img className='w-32 h-32 md:w-44 md:h-44 rounded-full border-4  border-black' src={user.photo ? user.photo : profile} /></div>
                    <p className='md:col-span-2 text-lg sm:text-xl md:text-4xl  font-popins font-bold text-center self-end'>{user.name}</p>
                    <p className='md:col-span-2 text-sm sm:text-base md:text-xl text-center self-start'>{user.email}</p>
                    <Button
                        onClick={logout}
                        type={'button'}
                        name={'Log out'}
                        value={'Cerrar sesión'} />
                </div>
                <div className='flex px-14 lg:p-1 gap-4 sm:gap-6 md:gap-10 xl:gap-12 flex-wrap justify-center items-center'>
                    {adminOption.map((item) => (
                        <Option
                            key={item.title}
                            to={item.route}
                            image={item.icon}
                            title={item.title} />
                    ))}


                    {
                        resOpt.map((item) => (
                            <Option
                                key={item.title}
                                image={item.icon}
                                to={item.route}
                                title={item.title} />
                        ))
                    }
 
                </div>
            </div>
        </div>

    )
}

export default Home; 