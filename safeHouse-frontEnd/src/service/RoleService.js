import axios from "axios";

const BASE_URL = import.meta.env.VITE_ROLE_SERVICE;

import { decryptData } from "../utils/encrypt";

// const getToken = () => {
//     localStorage.getItem('token')
//     return decryptData(localStorage.getItem('token')).token;
// };

const getToken = () => JSON.parse(localStorage.getItem('token')).token;


export const GetRoles = async () => {
    try{
        const res = await axios.get(`${BASE_URL}/roles`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return res.data;
    }catch(error){
        throw error.response
    }
}