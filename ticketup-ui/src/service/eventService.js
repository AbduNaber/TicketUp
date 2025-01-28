import axios from "axios";

const BASE_URL = "http://localhost:8080/ticketup";

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