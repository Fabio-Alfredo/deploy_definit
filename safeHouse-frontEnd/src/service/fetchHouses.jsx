import axios from "axios";

const getToken = () => JSON.parse(localStorage.getItem('token')).token;

const BASE_URL = 'http://localhost:8080/api/request';

const fetchHouses = async () => {
    try {
        const response = await axios.get('data.json');
        return response.data.housesData.houses;
    } catch (error) {
        throw error.response;
    }
};

export const fetchInvitation = async () => {
    try {
        const res = await axios.get('data.json');
        return res.data.invitationsData.invitations;
    } catch (error) {
        throw error.response;
    }
}

export const fetchReques = async () => {
    try {
        const res = await axios.get('data.json');
        return res.data.requestData.requests;
    } catch (error) {
        throw error.response;
    }
}

export default fetchHouses;