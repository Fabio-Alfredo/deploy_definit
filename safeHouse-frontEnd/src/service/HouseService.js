import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/house/';
const getToken = ()=> JSON.parse(localStorage.getItem('token')).token;

export const GetHouseData = async () => {
    try{
        const res = await axios.get(`${BASE_URL}all?filter=${''}`,{
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

export const GetHouseEmty = async (filter) => {
    try{
        const res = await axios.get(`${BASE_URL}all?filter=${filter}`,{
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