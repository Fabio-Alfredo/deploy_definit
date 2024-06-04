import axios from "axios";


export const axiosQrData = async (data) => {
    try {
        const res = await axios.post('uri', data, {
            headers: {
                Accept: 'application/json'
            }
        })
        return res;
    }catch(error){
        console.log(error);
    }
}
