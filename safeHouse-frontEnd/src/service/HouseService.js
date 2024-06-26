import axios from "axios";

const BASE_URL = 'http://localhost:8080/api';
const getToken = ()=> JSON.parse(localStorage.getItem('token')).token;

export const GetHouseData = async () => {
    try{
        const res = await axios.get(`${BASE_URL}/house/all`,{
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