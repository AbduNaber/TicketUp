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

export const activateEvent = async (eventId, token) => {
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