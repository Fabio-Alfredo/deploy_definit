import React from 'react';
import { w3cwebsocket } from 'websocket';
import { useEffect, useState } from 'react';

//const client = new w3cwebsocket('ws://localhost:8080/email');

/*client.onopen = () => {
    console.log('Conexión establecida con el servidor WebSocket');
};*/

const Input = ({ name, label, type, inputValue, inputOnchange }) => {

    /*const [userExists, setUserExists] = useState(true);


    useEffect(() => {
        if (name === 'email') {
            client.send(inputValue);

            const handleMessage = (message) => {
                const data = message.data;
                console.log('Mensaje recibido del servidor WebSocket:', data);
                setUserExists(data === 'true' || inputValue === '');
            };

            client.onmessage = handleMessage;

            return () => {
                client.onmessage = null;
            };
        }
    }, [inputValue, name]);*/


    return (
        <>
            <div className='grid grid-cols-3 sm:mx-12 items-center m-2 lg:m-4 '>
                <label htmlFor={name} className='col-span-1 font-popins text-sm sm:text-2xl'> {label} </label> {/* query */}
                <input required type={type} name={name} value={inputValue} onChange={inputOnchange}
                    className='col-span-2 pl-3 sm:ml-11 shadow-md font-popins bg-input-color rounded-md text-xs  sm:text-xl h-6 sm:h-10 ' />
                {/*name === 'email' && !userExists && <p className="text-red-500 col-span-3 text-center pt-1">El correo electrónico no existe en la base de datos</p>*/}
            </div>
        </>
    );
};

export default Input;