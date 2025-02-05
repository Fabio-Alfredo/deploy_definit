import React from 'react';
import ButtonComponent from './ButtonComponent';
import { formDate, formatTime } from '../../utils/MapDate';
import Swal from 'sweetalert2'
import { ApproveRequest, RejectRequest } from '../../service/RequestService';

const InvitationCard = ({ house, fecha, invitado, reason, onApproved, onDenied, id }) => {

    const handleApprove = async (id) => {
        Swal.fire({
            title: "Seguro?",
            html: '<p class="text-lg font-popins font-semibold">Quieres aceptar esta invitacion?</p>',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#66BB6A",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, confirmar!",
            customClass: {
                title: 'text-2xl font-popins font-bold',
                confirmButton: 'text-lg font-popins',
                cancelButton: 'text-lg font-popins'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                onApproved(id);
            }
        });
    }

    const handleDenied = async (id) => {
        Swal.fire({
            title: "Seguro?",
            html: '<p class="text-lg font-popins font-semibold">Quieres rechazar esta invitacion?</p>',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#9E9E9E",
            confirmButtonText: "Si, borrar!",
            customClass: {
                title: 'text-2xl font-popins font-bold',
                confirmButton: 'text-lg font-popins',
                cancelButton: 'text-lg font-popins'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                onDenied(id);
            }
        });
    }

    return (
        <>

            <div className=' font-popins group/item flex items-center flex-col justify-between px-3 md:hover:px-3 md:px-6  w-full mt-2 py-2 text-lg list-none rounded-xl hover:bg-slate-100 hover:-translate-y-1 duration-500 ' key={2}>
                <div className='flex flex-col justify-start items-center    my-1'>
                    <p className='font-popins font-bold text-sm sm:text-lg lg:text-xl items-center p-0 md:px-2 select-none '>Invitacion Pendiente</p>
                    <p className='font-popins text-gray-500 font-semibold text-sm sm:text-lg lg:text-xl items-center p-0 md:px-2 select-none'>Casa #{house}</p>
                </div>
                <div className='flex flex-col items-center'>
                    <p className='font-popins text-center text-sm sm:text-lg lg:text-xl  text-gray-500 select-none'>{invitado}</p>
                    <p className='font-popins font-bold text-sm sm:text-lg lg:text-xl select-none'>Razon</p>
                    <p className='font-popins text-center text-sm sm:text-lg lg:text-xl  text-gray-500 select-none'>{reason}</p>
                </div>
                <div className='flex items-center justify-end my-1'>
                    <div className='flex flex-col items-center mr-4'>
                        <p className='font-popins font-bold text-sm sm:text-lg lg:text-xl select-none'>Fecha</p>
                        <p className='font-popins text-center text-sm sm:text-lg lg:text-xl  text-gray-500 select-none'>{formDate(fecha)}</p>
                    </div>
                    <div className='flex flex-col items-center ml-4'>
                        <p className='font-popins font-bold text-sm sm:text-lg lg:text-xl select-none'>Hora</p>
                        <p className='font-popins text-center text-sm sm:text-lg lg:text-xl  text-gray-500 select-none'>{formatTime(fecha)}</p>
                    </div>
                </div>

                <div className='items-center w-full hidden group-hover/item:flex md:w-fit justify-center md:justify-end gap-2 my-1'>
                    <ButtonComponent onClick={() => handleApprove(id)} value={"Aceptar"} className={'bg-green-400 text-sm sm:text-lg lg:text-xl'} />
                    <ButtonComponent onClick={() => handleDenied(id)} value={"Rechazar"} className={'bg-red-600 text-sm sm:text-lg lg:text-xl'} />
                </div>
            </div>


        </>
    );
};

export default InvitationCard;



{/* <div className='font-popins grid grid-cols-2 px-6 pt-2 mt-2 text-lg list-none cursor-pointer rounded-xl hover:bg-slate-100 hover:-translate-y-1 duration-500 ' key={2}>
            <p className='font-popins w-full font-bold px-2'>Invitacion</p>
            <p className='font-popins w-full  font-bold px-2 text-end text-gray-500'>Casa#2</p>
            <p className='font-popins w-full font-bold px-2'>Fecha</p>
            <p className='font-popins w-full px-2 text-end text-gray-500'>12/12/2021 </p>
            <p className='font-popins w-full font-bold px-2'>Hora</p>
            <p className='font-popins w-full px-2 text-end text-gray-500'>12:00 </p>
            <hr className='w-full bg-black col-span-2' />

        </div> */}



// <div className='font-popins grid group/item grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2 px-3 mt-2 pt-2 text-lg list-none cursor-pointer rounded-xl hover:bg-slate-100 hover:-translate-y-1 duration-500 ' key={2}>
//         <p className='font-popins font-bold items-center px-2'>Invitacion</p>
//         <p className='font-popins text-gray-500 font-semibold text-center'>Casa#2</p>
//         <div className='col-span-3 md:row-span-2 flex invisible group-hover/item:visible items-center justify-end gap-2'>
//             <input type="button" value="aceptar" className='px-2 py-1 rounded-xl h-fit w-fit bg-green-300' />
//             <input type="button" value="rechazar" className='px-2 py-1 rounded-xl h-fit w-fit bg-red-500' />
//         </div>
//         <p className='font-popins items-center px-2'>Fecha</p>
//         <p className='font-popins text-center  text-gray-500'>12/12/2021 </p>
//         <hr className='w-full justify-self-center bg-black col-span-3' />
//     </div>



{/* <>

<div className='font-popins flex items-center flex-wrap justify-center md:justify-between w-full group/item px-3 mt-2 py-2 text-lg list-none cursor-pointer rounded-xl hover:bg-slate-100 hover:-translate-y-1 duration-500 ' key={2}>
    <div className='flex flex-col justify-start items-start md:items-center'>
        <p className='font-popins font-bold items-center p-0 md:px-2'>Invitacion</p>
        <p className='font-popins text-gray-500 font-semibold text-center'>Casa#2</p>
    </div>

    <div className='flex flex-col justify-end items-end'>
        <p className='font-popins p-0 md:px-2'>Fecha</p>
        <p className='font-popins text-center  text-gray-500'>12/12/2021 </p>
    </div>
    <div className='flex invisible group-hover/item:visible items-center justify-end gap-2'>
        <input type="button" value="aceptar" className=' p-0 md:px-2 py-1 rounded-xl h-fit w-fit bg-green-300' />
        <input type="button" value="rechazar" className='p-0 md:px-2 py-1 rounded-xl h-fit w-fit bg-red-500' />
    </div>


</div>
<hr className='items-center bg-black px-5' />

</> */}