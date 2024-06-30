import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/qr';

const getToken = () => JSON.parse(localStorage.getItem('token')).token;

export const GetQr = async () => {
    try{
        const res = await axios.get(`${BASE_URL}/resident/qr-generate`, {
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