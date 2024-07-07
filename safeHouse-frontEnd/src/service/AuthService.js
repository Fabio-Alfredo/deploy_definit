import axios from "axios";

const BASE_URL =import.meta.env.VITE_AUTH_SERVICE;

export const AuthConecction = async (data) => {

    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        throw error.response;
    }

}
