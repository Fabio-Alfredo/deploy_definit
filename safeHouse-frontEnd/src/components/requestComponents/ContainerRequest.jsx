import React, { useEffect, useState } from 'react';
import EmptyReport from '../EmtyContent';
import Navigation from '../Navigation';
import RequestCard from './RequestCard';
import { fetchReques } from '../../service/fetchHouses';
import MenuRequest from './MenuRequest';

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
            <div className='w-full px-4 pb-4 sm:p-8 shadow-2xl rounded-3xl bg-white h-fit lg:w-2/3  xl:w-1/2' > {/* query */}
                <Navigation title={"Solicitudes"} />

                <hr className='h-0.5 bg-black mb-6 mx-4' />
                <MenuRequest/>

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