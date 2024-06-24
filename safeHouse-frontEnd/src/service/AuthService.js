import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/';

export const AuthConecction = async (data) => {

    try {
        const response = await axios.get(`${BASE_URL}auth/login`, data,{
            headers: { 
                'Content-Type': 'application/json',
             }
        });
        return response;
    } catch (error) {

        console.log(error);
        throw new Error('Error al obtener los datos');
    }

}