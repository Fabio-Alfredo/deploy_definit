import axios from "axios";
const BASE_URL = 'http://localhost:8080/api/user';
import { decryptData } from "../utils/encrypt";

// const getToken = () => {
//     localStorage.getItem('token')
//     return decryptData(localStorage.getItem('token')).token;
// };

const getToken = () => JSON.parse(localStorage.getItem('token')).token;


export const GetUserData = async () => {
    console.log(getToken());
    try {
        const res = await axios.get(`${BASE_URL}/one`, {
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

export const ContractEmployee = async (data) => {
    try {
        const res = await axios.post(`${BASE_URL}/contract-employee`, data, {
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

export const GetUsersInfo = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/employ-visitor`, {
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

export const AssignAdminHouse = async (data) => {
    try {
        const res = await axios.post(`${BASE_URL}/assign/admin-house`, data, {
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

export const AssignUsersHouse = async (data) => {
    try {
        const res = await axios.post(`${BASE_URL}/assign/users-house`, data, {
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

export const DeleteRolesUsers = async (email) => {
    try {
        const res = await axios.post(`${BASE_URL}/delete?email=${email}`,
            {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            }
        });
        return res.data;
    } catch (error) {
        throw error.response;
    }
}
