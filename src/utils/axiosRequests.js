// Axios requests utilities 

import axiosClient from "../services/axiosService";


// Get
export const getRequest = async (Url) => {
    try{
        const response = await axiosClient.get(`/${Url}`);
        return response.data;
    }
    catch(error){
        console.error("get request error: ",error);
    }
};
// Post 
export const postRequest = async (Url,payload) => {
    try{
        const response = await axiosClient.post(`/${Url}`,payload, {
            validateStatus: () => true,
        });
        return response.data;
    }
    catch(error){
        console.error("post request error: ",error);
    }
} 
// Put
export const putRequest = async (Url,payload) => {
    try{
        const response = await axiosClient.put(`/${Url}`,payload);
        return response.data;
    }
    catch(error){
        console.error("Put request error: ",error);
    }
}

// Delete 
export const deleteRequest = async (Url) => {
    try{
        const response = await axiosClient.delete(`/${Url}`);
        return response.data;
    }
    catch(error){
        console.error("Delete request error: ",error);
    }
}