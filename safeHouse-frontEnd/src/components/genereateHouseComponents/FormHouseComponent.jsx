import React from 'react';
import Input from '../Input';
import Button from '../Button';
import { useForm } from '../../hooks/useForm';

const FormHouseComponent = () => {

    const { name, email, house, InputChange } = useForm({
        name: '',
        email: '',
        house: ''
    })


    return (
        <>
            <form className='w-full  p-16 min-h-[50vh] ' > {/* query */}
                <Input name={"name"} label={"Nombre:"} type={"text"} inputValue={name} inputOnchange={InputChange} />
                <Input name={"email"} label={"Email:"} type={"text"} inputValue={email} inputOnchange={InputChange} />
                <div className='grid grid-cols-3 sm:mx-12 items-center m-4 lg:m-4 xl:m-8'>
                    <label htmlFor='house' className='col-span-1 font-popins text-sm sm:text-2xl'> casa </label> {/* query */}
                    <input required type='text' name='house' value={house} onChange={InputChange}
                        className='col-span-2 pl-3 sm:ml-11 shadow-md font-popins bg-input-color rounded-md text-xs  sm:text-xl h-6 sm:h-10' />
                    {/*name === 'email' && !userExists && <p className="text-red-500 col-span-3 text-center pt-1">El correo electrónico no existe en la base de datos</p>*/}
                </div>
                <div className='flex w-full justify-center items-center pt-6 lg:pt-4'>
                    <Button value={"Registrar"} type={"submit"} name={"RegisterButton"} />
                </div>
            </form>
        </>
    );
};

export default FormHouseComponent;