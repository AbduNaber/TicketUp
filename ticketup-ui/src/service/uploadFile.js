import axios from "axios";

const BASE_URL = "http://localhost:8080/ticketup";

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