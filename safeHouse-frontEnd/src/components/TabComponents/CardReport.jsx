import { BsPersonWalking } from "react-icons/bs";

const CardReport = ({ name, dateVisit, hourVisit }) => {
    return (
        <div className='font-popins group/item flex items-center flex-wrap justify-start hover:justify-between px-3 md:hover:px-3 md:px-6  w-full mt-2 py-2 text-lg list-none rounded-xl hover:bg-slate-100 hover:-translate-y-1 duration-500 ' key={2}>

            <div className='flex justify-start items-start my-1'>
                <BsPersonWalking className="self-center" />
                <p className='font-popins w-full font-bold text-xs sm:text-lg lg:text-xl px-2'>{name}</p>
            </div>

            <div className=' items-center w-full hidden group-hover/item:flex md:w-fit justify-center md:justify-end gap-2 my-1 pr-6'>
                <div>
                    <p className='font-popins w-full font-bold text-xs sm:text-lg lg:text-xl px-2'>Fecha</p>
                    <p className='font-popins w-full px-2 text-end text-xs sm:text-lg lg:text-xl text-gray-500'>{dateVisit}</p>
                </div>
                <div>
                    <p className='font-popins w-full font-bold text-xs sm:text-lg lg:text-xl px-2'>Hora</p>
                    <p className='font-popins w-full px-2 text-end text-xs sm:text-lg lg:text-xl text-gray-500'>{hourVisit}</p>
                </div>
            </div>
        </div>
    )
}



export default CardReport;