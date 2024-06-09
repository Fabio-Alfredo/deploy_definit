import React, { useEffect, useState } from 'react';
import EmptyReport from '../EmtyContent';
import Navigation from '../Navigation';
import RequestCard from './RequestCard';
import { FaCirclePlus } from "react-icons/fa6";
import { fetchReques } from '../../service/fetchHouses';

const ContainerRequest = () => {
    const [request, setRequest] = useState([])

    useEffect(() => {

        const getRequest = async () => {
            const res = await fetchReques()
            console.log({ res });
            setRequest(res)
        }

        getRequest()
    }, [])

    return (
        <>
            <div className='w-full p-4 sm:p-8 shadow-2xl rounded-3xl bg-white h-fit lg:w-2/3  xl:w-1/2' > {/* query */}
                <Navigation title={"Solicitudes"} />

                <hr className='h-0.5 bg-black mb-6 mx-4' />
                <div className='w-full flex  justify-end pr-8 items-center cursor-pointer group/item'>
                    <p className='font-popins text-sm sm:text-lg lg:text-xl items-center px-2 group-hover/item:scale-105 duration-500 '>Nueva solicitud</p>
                    <FaCirclePlus className='text-lg sm:text-2xl lg:text-3xl group-hover/item:scale-110 duration-300' />
                </div>
                {
                    request.length > 0 ? (
                        <div className='overflow-y-auto h-[35vh] md:h-[50vh] px-4'>
                            {
                                request.map((_r) => (
                                    <RequestCard key={_r.id} enable_time={_r.enable_time} enable_date={_r.enable_date} phase={_r.phase} user={_r.user} />
                                ))
                            }
                        </div>

                    ) : (
                        <EmptyReport message="Sin invitaciones" />
                    )
                }
                <hr className='h-0.5 bg-black my-8 mx-4' />
            </div>
        </>
    );
};

export default ContainerRequest;