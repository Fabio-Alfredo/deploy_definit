import React from 'react';
import Input from '../components/Input';
import Navigation from '../components/Navigation';
import Textarea from '../components/Textarea';
import Button from '../components/Button';
import Header from '../components/Header';
import { useForm } from '../hooks/useForm';
import { RequestAnonimous } from '../service/RequestService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterEntry = () => {
    const navigate = useNavigate();

    const { company, name, reason, house, InputChange } = useForm({
        company: '',
        name: '',
        reason: '',
        house: ''
    })



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formValues = {
                company: company,
                name: name,
                reason: reason,
                house: house
            }
            const res = await RequestAnonimous(formValues);
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${res.message}`,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate('/home')
            });
        } catch (e) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${e.data.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }


    return (
        <div className='h-screen'>
            <Header />
            <div className='flex items-center justify-center w-full bg-color-primary px-6 sm:px-10 min-h-[90vh]'>
                <form onSubmit={handleSubmit} className='w-full p-10 shadow-2xl rounded-3xl bg-white h-fit lg:p-6 xl:px-20 xl:py-10 lg:w-2/3 2xl:w-1/2' > {/* query */}
                    <Navigation title={"Registrar entrada"} />
                    <Input name={"company"} label={"Empresa:"} type={"text"} inputValue={company} inputOnchange={InputChange} />
                    <Input name={"name"} label={"Nombre:"} type={"text"} inputValue={name} inputOnchange={InputChange} />
                    <Input name={"house"} label={"# Casa:"} type={"text"} inputValue={house} inputOnchange={InputChange} />
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