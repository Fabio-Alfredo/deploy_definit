import React from 'react';
import Navigation from '../Navigation';
import InvitationCard from './InvitationCard';

const ContainerInvitations = () => {
    return (
        <>
            <div className='w-full p-4 sm:p-8 shadow-2xl rounded-3xl bg-white h-fit lg:w-2/3  xl:w-1/2' > {/* query */}
                <Navigation title={"Invitaciones"} />
                <hr className='h-0.5 bg-black mb-6 mx-4' />
                <div className='overflow-y-auto max-h-[35vh] md:max-h-[50vh] px-4'>
                    <InvitationCard />
                    <InvitationCard />
                    <InvitationCard />
                    <InvitationCard />
                    <InvitationCard />
                    <InvitationCard />
                </div>
                <hr className='h-0.5 bg-black my-8 mx-4' />
            </div>
        </>
    );
};

export default ContainerInvitations;