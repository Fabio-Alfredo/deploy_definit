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
import ProtectedComponent from '../protected/ProtectedComponent.jsx'
import Swal from 'sweetalert2';
import { HashLoader } from 'react-spinners'


const Home = () => {
    const { removeData, user, roles } = useContext(AuthContext);

    const mapinOptions = [
        {
            id: 1,
            title: "Escanear entrada",
            icon: MdQrCodeScanner,
            route: '/readerqr',
            role: ['ADMN', 'EMPL']
        },
        {
            id: 2,
            title: "Registrar entrada anonima",
            icon: FaUser,
            route: '/registerentry',
            role: ['ADMN', 'EMPL']
        }
        ,
        {
            id: 3,
            title: "Administración de casas",
            icon: MdHouse,
            route: '/adminhouse',
            role: ['ADMN']
        },
        {
            id: 4,
            title: "Administración de usuarios",
            icon: MdPeopleAlt,
            route: '/aduser',
            role: ['ADMN']
        },
        {
            id: 5,
            title: "Reporte de entradas",
            icon: TbReportAnalytics,
            route: '/entryrep',
            role: ['ADMN']
        },
        {
            id: 6,
            title: "Historial Completo",
            icon: FaHistory,
            route: '/History',
            role: ['ADMN']
        },
        {
            id: 7,
            title: "Revisar invitaciones",
            icon: MdPreview,
            route: '/invitations',
            role: ['ADMN']
        },
        // {
        //     id: 8,
        //     title: "Invitaciones",
        //     icon: IoMail,
        //     route: '/requestvisit',
        //     role: ['ADMN']
        // },
        {
            id: 9,
            title: `Generar entrada`,
            icon: MdOutlineQrCode2,
            route: '/generateqr',
            role: ['ADMN', 'RESD', 'RSAD', 'VIST']
        },
        {
            id: 10,
            title: `Solicitud visita`,
            icon: IoMail,
            route: '/requestvisit',
            role: ['RESD', 'RSAD']
        },
        {
            id: 11,
            title: `Administrar invitaciones`,
            icon: MdAssignmentInd,
        },
        {
            id: 12,
            title: `Reporte de visitas`,
            icon: TbReportAnalytics,
            route: '/invitations',
            role: ['RSAD']
        },
        // {
        //     id:13,
        //     title: `Invitaciones`,
        //     icon: IoMail,
        //     role: ['VIST']
        // },
    ]

    // const empOpt = [
    //     {
    //         id:9,
    //         title: `Escanear entrada`,
    //         icon: MdQrCodeScanner,
    //         route: '/readerqr',

    //     },
    //     {
    //         id:10,
    //         title: `Registar entrada anonima`,
    //         icon: FaUser,
    //     }
    // ]

    // const resAdminOpt = [
    //     {
    //         id:11,
    //         title: `Generar entrada`,
    //         icon: MdOutlineQrCode2,
    //         role: ['ADMN', 'RESD', 'RSAD', 'VIST']
    //     },
    //     {
    //         id:16,
    //         title: `Solicitud visita`,
    //         icon: IoMail,
    //         route: '/requestvisit',
    //         role: [, 'RESD', 'RSAD']
    //     },
    //     {
    //         id:13,
    //         title: `Administrar invitaciones`,
    //         icon: MdAssignmentInd,
    //     },
    //     {
    //         id:14,
    //         title: `Reporte de visitas`,
    //         icon: TbReportAnalytics,
    //         route: '/invitations',
    //         role: ['RSAD']
    //     }
    // ]

    // const resOpt = [
    //     {
    //         id:15,
    //         title: `Generar entrada`,
    //         icon: MdOutlineQrCode2,
    //         route: '/generateqr'
    //     },
    //     {
    //         id:16,
    //         title: `Solicitud visita`,
    //         icon: IoMail,
    //         route: '/requestvisit'

    //     }
    // ]

    // const vistOpt = [
    //     {
    //         id:17,
    //         title: `Invitaciones`,
    //         icon: IoMail,
    //         role: ['VIST']
    //     },
    //     // {
    //     //     id:18,
    //     //     title: `Generar entrada`,
    //     //     icon: MdOutlineQrCode2,
    //     // }
    // ]

    //borrar token de local storage
    const logout = () => {
        removeData()
        Swal.fire({
            position: "center",
            icon: "success",
            title: `Sesión cerrada`,
            showConfirmButton: false,
            timer: 2000
        }).then(() => {
            nav('/home')
        })
        window.location.href = '/';
    }


    if (user == null || roles == []) {
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
                    <div className='row-span-5 md:row-span-2 flex justify-center'><img className='w-32 h-32 md:w-44 md:h-44 rounded-full border-4  border-black' src={user.photo ? user.photo : profile} alt='User Profile' /></div>
                    <p className='md:col-span-2 text-lg sm:text-xl md:text-4xl  font-popins font-bold text-center self-end'>{user.name}</p>
                    <p className='md:col-span-2 text-sm sm:text-base md:text-xl text-center self-start'>{user.email}</p>
                    <Button
                        onClick={logout}
                        type={'button'}
                        name={'Log out'}
                        value={'Cerrar sesión'} />
                </div>
                <div className='flex px-14 lg:p-1 gap-4 sm:gap-6 md:gap-10 xl:gap-12 flex-wrap justify-center items-center'>
                    {

                        mapinOptions.map((item) => (
                            <ProtectedComponent key={item.id} allowedRoles={item.role} userRoles={roles}>
                                <Option
                                    key={item.title}
                                    to={item.route}
                                    image={item.icon}
                                    title={item.title} />
                            </ProtectedComponent>

                        ))

                    }

                </div>
            </div>
        </div>

    )
}

export default Home; 