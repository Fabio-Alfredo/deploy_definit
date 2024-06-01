import React from 'react';
import Input from '../components/Input';
import Navigation from '../components/Navigation';
import Button from '../components/Button';
import Header from '../components/Header';
import { useForm } from '../hooks/useForm';

const RegisterEntry = () => {

    const { company, name, reason, InputChange } = useForm({
        company: '',
        name: '',
        reason: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const formValues = {
            company: company,
            name: name,
            reason: reason
        }
        console.log(formValues);
    }


    return (
        <div className='h-screen'>
            <Header />
            <div className='flex pt-48 sm:pt-0 sm:items-center justify-center w-full bg-color-primary px-6 min-h-[90vh]'>
                <form onSubmit={handleSubmit} className=' w-full p-8 shadow-2xl rounded-3xl bg-white h-fit xl:pt-24 lg:w-2/3  xl:w-1/2' > {/* query */}
                    <Navigation title={"Registrar entrada"} />
                    <Input name={"company"} label={"Empresa:"} type={"text"} inputValue={company} inputOnchange={InputChange} />
                    <Input name={"name"} label={"Nombre:"} type={"text"} inputValue={name} inputOnchange={InputChange} />
                    <Input name={"reason"} label={"Motivo:"} type={"textarea"} inputValue={reason} inputOnchange={InputChange} />
                    <Button value={"Registrar"} type={"submit"} name={"RegisterEntry"} />
                </form>
            </div>
        </div>
    );
};

export default RegisterEntry;