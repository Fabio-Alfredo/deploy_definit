import axios from "axios";

const getToken = () => JSON.parse(localStorage.getItem('token')).token;

const BASE_URL = 'http://localhost:8080/api/request';

const fetchHouses = async () => {
    try {
        const response = await axios.get('data.json');
        return response.data.housesData.houses;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return [];
    }
};

export const fetchInvitation = async () => {
    try {
        const res = await axios.get('data.json');
        //console.log(res.data)
        return res.data.invitationsData.invitations;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return [];
    }
}

export const fetchReques = async () => {
    try {
        const res = await axios.get('data.json');
        //console.log(res.data.requestData.requests)
        return res.data.requestData.requests;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return [];
    }
}

export default fetchHouses;