import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Input from '../components/Input';
import Button from '../components/Button';
import { useForm } from '../hooks/useForm';
import { useLocation } from 'react-router-dom';

const EditResidents = () => {
    const location = useLocation();
    const user = location.state;
    const { userName, email, InputChange } =  useForm({
        userName: user.name,
        email: user.email
    })
    return (
        <div className='h-screen'>
            <Header />
            <div className='flex items-center justify-center w-full bg-color-primary px-6 min-h-[90vh]'>
                <form className='w-full p-10 shadow-2xl rounded-3xl bg-white h-fit lg:p-6 xl:px-20 xl:py-10 md:w-[85%] lg:w-2/3 2xl:w-1/2' > {/* query */}
                    <Navigation title={"Editar usuario"} />
                    <Input name={"userName"} label={"Nombre:"} type={"text"} inputValue={userName} readOnly={true} inputOnchange={InputChange} />
                    <Input name={"email"} label={"Email:"} type={"email"} inputValue={email} readOnly={true} inputOnchange={InputChange} />
                    
                    <div className='flex pl-[50%] w-full  items-center mt-6 lg:mt-4 '>
                        <Button class={'grow-0'} value={"Registrar"} type={"submit"} name={"RegisterButton"} />
                    </div>

                </form>

            </div>
        </div>
    );
};

export default EditResidents;