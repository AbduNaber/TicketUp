import axios from "axios";

const BASE_URL = "http://localhost:8080/ticketup";

export const getOrganizerById = async (organizerId) => {
    try {
        const response = await axios.get(`${BASE_URL}/organizators/list/${organizerId}`);
        return response.data;
    }catch(error) {
        throw new Error(error.response?.data || "Organizatör bilgisi yüklenirken bir hata oluştu.");
    }
};

export const sendMessageToOrganizer = async (messagePayload) => {
    try {
        const response = axios.post(`${BASE_URL}/organizator-messages`, messagePayload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return (await response).data;
    }catch(error) {
        throw new Error(error.response?.data || "Mesaj gönderilemedi.");
    }
}