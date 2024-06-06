import React from 'react';
import Header from '../components/Header';
import ContainerInvitations from '../components/invitationComponents/ContainerInvitations';


const Invitations = () => {
    return (
        <div className='h-screen'>
            <Header />
            <div className='flex items-center justify-center w-full bg-color-primary px-6 min-h-[90vh]'>
                <ContainerInvitations />
            </div>
        </div>
    );
};

export default Invitations;