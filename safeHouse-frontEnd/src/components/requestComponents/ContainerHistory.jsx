import React, { useEffect, useState } from 'react';
import EmptyReport from '../EmtyContent';
import Navigation from '../Navigation';
import RequestCard from './RequestCard';
import MenuRequest from './MenuRequest';
import { GetApprovedRequestAdmin, GetPendingRequestAdmin, GetUsedRequestAdmin } from '../../service/RequestService';
import TabOpt from '../ListViewComponents/TabOpt';

const ContainerHistory = () => {
    const [toggle, setToggle] = useState(1);
    const [requestPending, setRequestPending] = useState([])
    const [requestApproved, setRequestApproved] = useState([])
    const [requestUsed, setRequestUsed] = useState([])
    const [requestDenied, setRequestDenied] = useState([])

    const fetchRequestPending = async () => {
        try {
            const response = await GetPendingRequestAdmin();
            setRequestPending(response.data);
        } catch (error) {

            Swal.fire({
                position: "center",
                icon: "error",
                title: `${error.data?.message || error.message}`,
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                nav('/home')
            })
        }
    }

    const fetchRequestApproved = async () => {
        try {
            const response = await GetApprovedRequestAdmin();
            setRequestApproved(response.data);
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${error.data?.message || error.message}`,
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                nav('/home')
            })
        }
    }

    const fecthRequestUsed = async () => {
        try {
            const response = await GetUsedRequestAdmin();
            setRequestUsed(response.data);
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${error.data?.message || error.message}`,
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                nav('/home')
            })
        }
    }

    const fecthRquestDenied = async () => {
        try {
            const response = await GetDeniedRequestAdmin();
            setRequestDenied(response.data);
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${error.data?.message || error.message}`,
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                nav('/home')
            })
        }
    }
    
    const resetScroll = () => {
        const scrollContainer = document.getElementById('scroll-container');
        scrollContainer.scrollTop = 0;
    };

    useEffect(() => {
        resetScroll();
    }, [toggle]);


    useEffect(() => {
        fetchRequestPending();
        fetchRequestApproved();
        fecthRequestUsed();
        fecthRquestDenied();
    }, [])

    const renderContent = () => {
        if (toggle === 1) {
            return requestPending.length > 0 ? (
                <div className='overflow-y-auto h-[35vh] md:h-[50vh] px-4'>
                    {requestPending.map((_r) => (
                        <RequestCard key={_r.id} enableTme={_r.enableTme} disableTime={_r.disableTime} phase={_r.phase} visitor={_r.visitor} />
                    ))}
                </div>
            ) : (
                <EmptyReport message="Sin invitaciones" />
            );
        } else if (toggle === 2) {
            return requestApproved.length > 0 ? (
                <div className='overflow-y-auto h-[35vh] md:h-[50vh] px-4'>
                    {requestApproved.map((_r) => (
                        <RequestCard key={_r.id} enableTme={_r.enableTme} disableTime={_r.disableTime} phase={_r.phase} visitor={_r.visitor} />
                    ))}
                </div>
            ) : (
                <EmptyReport message="Sin invitaciones" />
            );
        } else if (toggle === 3) {
            return requestUsed.length > 0 ? (
                <div className='overflow-y-auto h-[35vh] md:h-[50vh] px-4'>
                    {requestUsed.map((_r) => (
                        <RequestCard key={_r.id} enableTme={_r.enableTme} disableTime={_r.disableTime} phase={_r.phase} visitor={_r.visitor} />
                    ))}
                </div>
            ) : (
                <EmptyReport message="Sin invitaciones" />
            );
        } else if (toggle === 4) {
            return requestDenied.length > 0 ? (
                <div className='overflow-y-auto h-[35vh] md:h-[50vh] px-4'>
                    {requestDenied.map((_r) => (
                        <RequestCard key={_r.id} enableTme={_r.enableTme} disableTime={_r.disableTime} phase={_r.phase} visitor={_r.visitor} />
                    ))}
                </div>
            ) : (
                <EmptyReport message="Sin invitaciones" />
            );
        }
    };

    return (
        <>
            <div className='w-full px-4 pb-4 sm:p-8 shadow-2xl rounded-3xl bg-white h-fit lg:w-2/3  xl:w-1/2' > {/* query */}
                <Navigation title={"Historial"} />

                <TabOpt toggle={toggle} setToggle={setToggle} options={['Pendientes', 'Aprobadas', 'Usadas', 'Rechazadas']} />
                <div id="scroll-container">
                    {renderContent()}
                </div>
                <hr className='h-0.5 bg-black my-8 mx-4' /> 
            </div>
        </>
    );
};

export default ContainerHistory;