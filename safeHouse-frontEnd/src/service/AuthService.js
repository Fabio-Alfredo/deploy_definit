import axios from "axios";
import { json } from "react-router-dom";

const BASE_URL = 'http://localhost:8080/api';

const getToken = ()=> JSON.parse(localStorage.getItem('token')).token;

export const AuthConecction = async (data) => {

    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, data,{
            headers: { 
                'Content-Type': 'application/json',
             }
        });
        return res.data;
    } catch (error) {

        console.log(error);
        throw new Error(error);
    }

}

export const GetUserData = async () => {
    try{
        const res = await axios.get(`${BASE_URL}/user/one`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return res.data;
    }catch(error){
        console.log(error);
    }
}