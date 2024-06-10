import axios from "axios";

const fetchUsers = async () => {
    try {
        const response = await axios.get('user.json');
        return response.data.users;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return [];
    }
};

export default fetchUsers;