import axios from "axios";

const axiosClient = axios.create({
    baseURL : "http://127.0.0.1:3500/api/",
    headers : {
        "Content-Type":"application/json",
    },
    withCredentials:true,   
});

export default axiosClient;