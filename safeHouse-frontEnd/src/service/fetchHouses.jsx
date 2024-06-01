import axios from "axios";

const fetchHouses = async () => {
    try {
        const response = await axios.get('data.json');
        return response.data.houses;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return [];
    }
};

export default fetchHouses;