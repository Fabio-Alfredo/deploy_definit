import axios from "axios";

const BASE_URL = import.meta.env.VITE_HOUSE_SERVICE;

const getToken = () => JSON.parse(localStorage.getItem('token')).token;

export const GetHouseData = async () => {
    try {
        const res = await axios.get(`${BASE_URL}all`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export const GetHouseEmty = async (filter) => {
    try {
        const res = await axios.get(`${BASE_URL}all?filter=${filter}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        })
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export const DeleteResident = async (house, user) => {
    try {
        const res = await axios.post(`${BASE_URL}delete?houseId=${house}&email=${user}`,{}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        })
        return res.data;
    } catch (error) {

        throw error.response;
    }
}

export const UpdateResidentAdmin = async (data) => {

    try {
        const res = await axios.post(`${BASE_URL}assign/new-admin`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        })
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export const CreateHouse = async (data) => {
    try {
        const res = await axios.post(`${BASE_URL}new`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        })
        return res.data;
    } catch (error) {
        throw error.response;
    }   
}