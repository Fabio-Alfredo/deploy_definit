import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const credentialResponse = async (response) => {
    try {
        const { access_token } = response;
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: 'application/json'
            }
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err));

        //console.log(access_token)
        //const res = jwtDecode(access_token);
        //console.log(res)
        /*const {email, name, picture} = res;
        const info = {
            email,
            name,
            picture
        }
        console.log({info});*/
    } catch (error) {
        console.log(error);
    }

}

