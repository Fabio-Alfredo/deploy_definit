import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation';
import InvitationCard from '../invitationComponents/InvitationCard'
import EmptyReport from '../EmtyContent';
import { ApproveRequest, RejectRequest, fecthRequestPendingByHouse } from '../../service/RequestService';
import Swal from 'sweetalert2';


const ContainerInvitations = () => {
    const [invitations, setInvitations] = useState([])

    const requestByHouse = async () => {
        try {
            const response = await fecthRequestPendingByHouse();
            setInvitations(response.data);
            //console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleApprove = async (id) => {
        try {
            const response = await ApproveRequest(id);
            console.log(response.message);
            Swal.fire({
                showConfirmButton: false,
                title: "Accepted!",
                text: ` ${response.message}`,
                icon: "success"
            });
            requestByHouse();
            
        } catch (error) {
            console.error("Error al aprobar la invitacion", error);
        }
    }

    const handleDenied = async (id) => {
        try {
            const response = await RejectRequest(id);
            console.log(response.message);
            Swal.fire({
                showConfirmButton: false,
                title: "Accepted!",
                text: ` ${response.message}`,
                icon: "success"
            });
            requestByHouse();
        }catch(error){
            console.error("Error al rechazar la invitacion", error);
        }
    }

    useEffect(() => {
        requestByHouse();
    }, [])

    return (
        <>
            <div className='w-full p-4 sm:p-8 shadow-2xl rounded-3xl bg-white h-fit lg:w-2/3  xl:w-1/2' > {/* query */}
                <Navigation title={"Invitaciones"} />
                <hr className='h-0.5 bg-black mb-6 mx-4' />

                {
                    invitations.length > 0 ? (
                        <div className='overflow-y-auto h-[35vh] md:h-[50vh] px-4'>
                            {
                                invitations.map((_i) => (
                                    <InvitationCard
                                        key={_i.id}
                                        id={_i.id}
                                        house={_i.house.address}
                                        fecha={_i.enableTme}
                                        invitado={_i.visitor.name}
                                        reason={_i.reason} 
                                        onApproved={handleApprove}
                                        onDenied={handleDenied}
                                        />
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

export default ContainerInvitations;