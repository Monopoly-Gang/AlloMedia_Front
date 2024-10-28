import axios from "axios";

const axiosClient = axios.create({
    baseURL : `${import.meta.env.VITE_API_HOST}`,
    headers : {
        "Content-Type":"application/json",
    },
    withCredentials:true,   
});

export default axiosClient;