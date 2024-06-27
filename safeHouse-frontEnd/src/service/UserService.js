import axios from "axios";
import { json } from "react-router-dom";

const BASE_URL = 'http://localhost:8080/api';

const getToken = ()=> JSON.parse(localStorage.getItem('token')).token;

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
        throw error.response;
    }
}

export const GetUsersInfo= async ()=>{
    try{
        const res = await axios.get(`${BASE_URL}/user/by-role`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });

        return res.data;
    }catch(error){
        throw error.response;
    }
}

export const AssignAdminHouse = async (data)=>{
    try{
        const res = await axios.post(`${BASE_URL}/user/assign/admin-house`,data,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        })
        return res.data;
    }catch(error){
        throw error.response;
    }
}

export const AssignUsersHouse=async(data)=>{
    try{
        const res = await axios.post(`${BASE_URL}/user/assign/users-house`,data,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        })
        return res.data;
    }catch(error){
        throw error.response;
    }
}