import { jwtDecode } from "jwt-decode";

export const credentialResponse = async(response) => {
    try {
        const {credential}= await response;
        const res = jwtDecode(credential);
        const {email, name, picture} = res;
        const info = {
            email,
            name,
            picture
        }
        console.log(info);
    }catch (error) {
        console.log(error);
    }

}

