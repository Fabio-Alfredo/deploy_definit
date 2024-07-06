import React, { useEffect, useState } from 'react';
import EmptyReport from '../EmtyContent';
import Navigation from '../Navigation';
import RequestCard from './RequestCard';
import MenuRequest from './MenuRequest';
import { GetAllRequest } from '../../service/RequestService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ContainerRequest = () => {
    const [request, setRequest] = useState([])
    const nav = useNavigate();

    const fetchRequest = async () => {
        try {
            const response = await GetAllRequest();
            setRequest(response.data);
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${error.data?.message || error.message}`,
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                // nav('/home')
            })
        }
    }

    useEffect(() => {
        fetchRequest();
    }, [])


    return (
        <>
            <div className='w-full px-4 pb-4 sm:p-8 shadow-2xl rounded-3xl bg-white h-fit lg:w-2/3  xl:w-1/2' > {/* query */}
                <Navigation title={"Solicitudes"} />

                <hr className='h-0.5 bg-black mb-6 mx-4' />
                <MenuRequest />

                {
                    request.length > 0 ? (
                        <div className='overflow-y-auto h-[35vh] md:h-[50vh] px-4'>
                            {
                                request.map((_r) => (
                                    <RequestCard key={_r.id} enableTme={_r.enableTme} disableTime={_r.enable_date} phase={_r.phase} visitor={_r.visitor} />
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