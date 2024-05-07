import { jwtDecode } from "jwt-decode";

export const credentialResponse = async(response) => {
    try {
        const {credential}= await response;
        const res = jwtDecode(credential);
        console.log(res);
    }catch (error) {
        console.log(error);
    }

}

