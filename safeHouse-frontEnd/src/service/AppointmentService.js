import axios from "axios";

const BASE_URL = 'http://localhost:8080/api';

const getToken = ()=> JSON.parse(localStorage.getItem('token')).token;

export const AppointmentAnonimous = async (data) => {
    try{
        const res = await axios.post( `${BASE_URL}/request/entry-anonymous`,data,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        })
        return res.data;
    }catch(error){
        throw  error.response;
    }
}