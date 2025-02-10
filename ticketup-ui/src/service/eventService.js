import axios from "axios";
import { BASE_URL } from "./base_url";

export const getEventById = async (eventId) => {
    try{
        const response = await axios.get(`${BASE_URL}/events/list/${eventId}`);
        return response.data;
    }catch(error){
        throw new Error(error.response?.data || "Etkinlik bilgileri yüklenirken bir hata oluştu");
    }
};

export const getEventInformation = async (eventId) => {
    try{
        const response = await axios.get(`${BASE_URL}/events/get-information/${eventId}`);
        return response.data;
    }catch(error){
        if(error.response) {
            if(error.response.status === 404){
                throw {message: "Etkinlik Bulunamadı", status: 404};
            }else{
                throw {
                    message: error.response.data || "Etkinlik Yüklenirken Beklenmedik Bir Hata Oluştu",
                    status: error.response.status
                };
            }
        }else if(error.code === 'ERR_NETWORK' || error.message.includes('Network Error') || error.code === 'ECONNREFUSED') {
            throw {message: "Sunucuya Bağlanılamadı.", status: 503};
        }else {
            throw {message: "Bilinmeyen Bir Hata Oluştu", status: 500};
        }
    }
}

export const createEvent = async (event, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/events/create`, event, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch(error) {
        throw new Error(error.response?.data || "Etkinlik oluşturulamadı.");
    }
};

export const deleteEvent = async (eventId, token) => {
    try{
        await axios.delete(`${BASE_URL}/events/delete/${eventId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("event deleted")
    }catch(error) {
        throw new Error(error.response?.data || "Etkinlik silinemedi")
    }
};

export const reactivateEvent = async (eventId, token) => {
    await axios.post(
         `${BASE_URL}/events/activate/${eventId}`,
         {},
         {
            headers: {
                Authorization: `Bearer ${token}`,
            },
         }
    );
};