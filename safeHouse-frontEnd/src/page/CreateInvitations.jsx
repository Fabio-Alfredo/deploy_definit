import React, { useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Input from '../components/Input';
import Button from '../components/Button';
import { useForm } from '../hooks/useForm';
import InputTimeDate from '../components/InputTimeDate';

// import TimePicker from 'react-time-picker';
// import DateTimeField from 'react-datetime-picker';

const CreateInvitations = () => {

    const [date, setDate] = useState([])

    const { reason, visitor, InputChange } = useForm({
        reason: '',
        visitor: ''

    })


    const handleSubmit = (e) => {
        e.preventDefault()

        const formattedDates = date.map(d => d.format('YYYY-MM-DDTHH:mm:00.000+00:00'));
        const formDate = {
            visitor,
            reason,
            date: formattedDates
        }
        console.log(formDate)

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
                    <InputTimeDate name={"date"} label={"Fecha y hora:"} type={"datetime-local"} inputValue={date} inputOnchange={setDate} />
                    <div className='flex w-full justify-center items-center mb-8 pt-6 lg:pt-4'>
                        <Button value={"Registrar"} type={"submit"} name={"RegisterButton"} />
                    </div>
                </form>

            </div>
        </div>
    );
};

export default CreateInvitations;