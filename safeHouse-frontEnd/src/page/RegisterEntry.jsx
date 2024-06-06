import React from 'react';
import Input from '../components/Input';
import Navigation from '../components/Navigation';
import Textarea from '../components/Textarea';
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
            <div className='flex items-center justify-center w-full bg-color-primary px-6 sm:px-10 min-h-[90vh]'>
                <form onSubmit={handleSubmit} className='w-full p-10 shadow-2xl rounded-3xl bg-white h-fit lg:p-6 xl:px-20 xl:py-10 lg:w-2/3 2xl:w-1/2' > {/* query */}
                    <Navigation title={"Registrar entrada"} />
                    <Input name={"company"} label={"Empresa:"} type={"text"} inputValue={company} inputOnchange={InputChange} />
                    <Input name={"name"} label={"Nombre:"} type={"text"} inputValue={name} inputOnchange={InputChange} />
                    <Textarea name={"reason"} rows={5} cols={20} label={"Motivo:"} inputValue={reason} inputOnchange={InputChange} />
                    <div className='flex w-full justify-center items-center pt-6 lg:pt-4'>
                        <Button value={"Registrar"} type={"submit"} name={"RegisterButton"} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterEntry;