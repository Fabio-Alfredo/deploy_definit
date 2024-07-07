import axios from "axios";

const BASE_URL = import.meta.env.VITE_QR_SERVICE;

import { decryptData } from "../utils/encrypt";

// const getToken = () => {
//     localStorage.getItem('token')
//     return decryptData(localStorage.getItem('token')).token;
// };

const getToken = () => JSON.parse(localStorage.getItem('token')).token;


export const GetQr = async () => {
    try{
        const res = await axios.get(`${BASE_URL}/qr-generate`, {
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

export const ValidateQr = async (qr) => {
    try{
        
        const res = await axios.post(`${BASE_URL}/qr-success`, qr, {
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