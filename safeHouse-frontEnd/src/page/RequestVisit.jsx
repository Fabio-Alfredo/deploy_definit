import React from 'react';
import Header from '../components/Header';
import ContainerRequest from '../components/requestComponents/ContainerRequest';

const  RequestVisit = () => {
    return (
        <div className='h-screen'>
        <Header />
        <div className='flex items-center justify-center w-full bg-color-primary px-6 min-h-[90vh]'>
            <ContainerRequest/>
        </div>
    </div>
    );
};

export default RequestVisit;