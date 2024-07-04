import React, { useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Input from '../components/Input';
import Button from '../components/Button';
import { useForm } from '../hooks/useForm';
import InputTimeDate from '../components/InputTimeDate';
import TimeSelection from '../components/TimeSelection';
import Swal from 'sweetalert2';
import { createRequest } from '../service/RequestService';
import { useNavigate } from 'react-router-dom';

// import TimePicker from 'react-time-picker';
// import DateTimeField from 'react-datetime-picker';

const CreateInvitation = () => {

    const navigation = useNavigate()
    const [form, setForm] = useState("")
    const [time, setTime] = useState()

    const { reason, visitor, address, InputChange, } = useForm({
        reason: '',
        visitor: '',
        address: ''
    })


    const handleSubmit = async (e) => {
        e.preventDefault()

        const formattedDate = form.format('YYYY-MM-DD');
        const formattedTime = time.format('HH:mm:00.000+00:00');
        const completeDAte = `${formattedDate}T${formattedTime}`;

        const formDate = {
            visitor,
            reason,
            address,
            date: completeDAte
        }
        console.log(formDate)

        // try {
        //     const res = await createRequest(formDate);

        //     Swal.fire({
        //         title: "Exitoso!",
        //         text: `${res.message}`,
        //         icon: "success",
        //         showConfirmButton: false,
        //         timer: 1500
        //     }).then(() => {
        //         navigation(-1)
        //     })
        // } catch (error) {
        //     Swal.fire({
        //         title: "Error!",
        //         text: `${error.data.message}`,
        //         icon: "error",
        //     })
        // }

    }

    return (
        <div className='h-screen'>
            <Header />
            <div className='flex items-center justify-center w-full bg-color-primary px-6 sm:px-10 min-h-[90vh]'>
                <form onSubmit={handleSubmit} className='w-full p-10 shadow-2xl rounded-3xl bg-white h-fit lg:p-6 xl:px-20 xl:py-10 lg:w-2/3 2xl:w-1/2' > {/* query */}
                    <Navigation title={"Crear invitacion"} />
                    <hr className='h-0.5 bg-black mx-4' />
                    <Input name={"visitor"} label={"Visitante:"} type={"email"} inputValue={visitor} inputOnchange={InputChange} />
                    <Input name={"reason"} label={"Razon:"} type={"text"} inputValue={reason} inputOnchange={InputChange} />
                    <Input name={"address"} label={"Casa:"} type={"text"} inputValue={address} inputOnchange={InputChange} />
                    <InputTimeDate name={"date"} label={"Fecha:"} type={"datetime-local"} inputValue={form} inputOnchange={setForm} />
                    <TimeSelection name={"time"} label={"Hora:"} inputValue={time} inputOnchange={setTime} />
                    <div className='flex w-full justify-center items-center mb-8 pt-6 lg:pt-4'>
                        <Button value={"Registrar"} type={"submit"} name={"RegisterButton"} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateInvitation;