import axios from "axios";

const fetchUsers = async () => {
    try {
        const response = await axios.get('user.json');
        return response.data.users;
    } catch (error) {
        throw error.response;
    }
};

export default fetchUsers;