import React from 'react';

const InvitationCard = () => {
    return (
        <>

            <div className='font-popins flex items-center flex-wrap justify-between w-full px-3 mt-2 py-2 text-lg list-none rounded-xl hover:bg-slate-100 hover:-translate-y-1 duration-500 ' key={2}>
                <div className='flex flex-col justify-start items-start my-1'>
                    <p className='font-popins font-bold items-center p-0 md:px-2'>Invitacion</p>
                    <p className='font-popins text-gray-500 font-semibold items-center p-0 md:px-2'>Casa#2</p>
                </div>

                <div className='flex flex-col justify-end items-end my-1'>
                    <p className='font-popins'>Fecha</p>
                    <p className='font-popins text-center  text-gray-500'>12/12/2021 </p>
                </div>
                <div className='flex items-center w-full md:w-fit justify-center md:justify-end gap-2 my-1'>
                    <input type="button" value="aceptar" className='px-2 py-1 rounded-xl h-fit w-fit bg-green-300 cursor-pointer' />
                    <input type="button" value="rechazar" className='px-2 py-1 rounded-xl h-fit w-fit bg-red-500 cursor-pointer' />
                </div>
            </div>
            <hr className='items-center bg-black px-5' />

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