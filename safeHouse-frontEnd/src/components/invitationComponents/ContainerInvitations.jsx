import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation';
import InvitationCard from '../invitationComponents/InvitationCard'
import { fetchInvitation } from '../../service/fetchHouses';
import EmptyReport from '../EmtyContent';


const ContainerInvitations = () => {
    const [invitations, setInvitations] = useState([])

    useEffect(() => {

        const getInvitations = async () => {
            const res = await fetchInvitation()
            // console.log({ res });
            setInvitations(res)
        }

        getInvitations()
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
                                    <InvitationCard key={_i.id} house={_i.house} fecha={_i.fecha} />
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