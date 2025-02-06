import axios from "axios";
import { BASE_URL } from "./base_url";

export const uploadEventPhoto = async(file, token) => {
    const formData = new FormData();
    formData.append("file", file);

    try{
        const response = await axios.post(`${BASE_URL}/files/upload`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }catch(error) {
        throw new Error(error.response?.data || "Dosya yüklenirken bir hata oluştu");
    }
};


export const uploadProfilePicture = async (file, token) => {
    const formData = new FormData();
    formData.append("file", file);

    try{
        const response = await axios.post(`${BASE_URL}/files/upload-pp`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
    
        return response.data.url;
    }catch(error) {
        throw new Error(error.response?.data || "Dosya yüklenirken bir hata oluştu");
    }
};