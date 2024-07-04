import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/request';

const getToken = () => JSON.parse(localStorage.getItem('token')).token;

export const RequestAnonimous = async (data) => {
    try {
        const res = await axios.post(`${BASE_URL}/entry-anonymous`, data, {
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

export const GetEntrys = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/record`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        })
        console.log(res.data);
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export const GetEntrysByDay = async () => {
    try {
        const res = await axios.get(${BASE_URL}/by-day, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Bearer ${getToken()}
            }
        })
        return res.data;

    } catch (error) {
        throw error.response;
    }
}

export const GetEntrysByMonth = async () => {
    try{
        const res = await axios.get(${BASE_URL}/by-month, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Bearer ${getToken()}
            }
        });
        return res.data;
    }catch(error){
        throw error.response;
    }
}

export const createMultipleRequest = async (data) => {

    try {
        const res = await axios.post(`${BASE_URL}/create/multi-request`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        })
        return res.data;
    }
    catch (error) {
        throw error.response;
    }
}

export const createRequest = async (data) => {
    try {
        const res = await axios.post(`${BASE_URL}/new/casual`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        })
        return res.data;
    }
    catch (error) {
        throw error.response;
    }
}