import axios from "axios";

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
        console.log(res.data)
        return res.data.invitationsData.invitations;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return [];
    }
}

export default fetchHouses;