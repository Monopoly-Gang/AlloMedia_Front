// Axios requests utilities 

import axiosClient from "../config/axiosConfig";


// Get
export const getRequest = async (Uri) => {
    try{
        const response = await axiosClient.get(`/${Uri}`);
        return response.data;
    }
    catch(error){
        console.error("get request error: ",error);
    }
};


// Post 
export const postRequest = async (Uri,payload) => {
    try{
        const response = await axiosClient.post(`/${Uri}`,payload, {
            validateStatus: () => true,
        });
        return response.data;
    }
    catch(error){
        console.error("post request error: ",error);
    }
} 
// Put
export const putRequest = async (Uri,payload) => {
    try{
        const response = await axiosClient.put(`/${Uri}`,payload);
        return response.data;
    }
    catch(error){
        console.error("Put request error: ",error);
    }
}

// Delete 
export const deleteRequest = async (Uri) => {
    try{
        const response = await axiosClient.delete(`/${Uri}`);
        return response.data;
    }
    catch(error){
        console.error("Delete request error: ",error);
    }
}