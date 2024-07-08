import axios from "axios";

const BASE_URL = import.meta.env.VITE_REQUEST_SERVICE;

import { decryptData } from "../utils/encrypt";

// const getToken = () => {
//     localStorage.getItem('token')
//     return decryptData(localStorage.getItem('token')).token;
// };

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
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export const GetAllRequest = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/user-resident  `, {
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

export const GetPendingRequestAdmin = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/pending`, {
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

export const GetApprovedRequestAdmin = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/approved`, {
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

export const fecthRequestPendingByHouse = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/pending-by-house`, {
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

export const GetEntrysByMonth = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/by-month`, {
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

export const GetEntrysByDay = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/by-day`, {
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

export const ApproveRequest = async (id) => {
    try {
        const res = await axios.post(`${BASE_URL}/approve`, null, {
            params: { id },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            }
        })
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export const RejectRequest = async (id) => {
    try {
        const res = await axios.post(`${BASE_URL}/deny`, null, {
            params: { id },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            }
        })
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

export const GetUsedRequestAdmin = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/used`, {
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

export const GetDeniedRequestAdmin = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/denied`, {
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