    import axios from "axios";

    const axiosClient = axios.create({
        baseURL : "https://127.0.0.1:3000",
        headers : {
            "Content-Type":"application/json",
        },
        withCredentials:true,   
    });

    export default axiosClient;