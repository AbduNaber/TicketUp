import axios from "axios";

const BASE_URL = "http://localhost:8080/ticketup";

export const createParticipant = async (participantData) => {
    try{
        const response = await axios.post(`${BASE_URL}/participants/create`, participantData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    }catch(error) {
        throw new Error(error.response?.data || "Katılımcı oluşturulurken bir hata oluştu.")
    }
};

export const getParticipantById = async (participantId) => {
    try{
        const response = await axios.get(`${BASE_URL}/participants/list/${participantId}`);
        return response.data;
    }catch(error){
        throw new Error(error.response?.data || "Katılımcı bilgileri yüklenirken bir hata oluştu");
    }
};

export const deleteParticipantById = async (participantId) => {
    try{
        await axios.delete(`${BASE_URL}/participants/delete/${participantId}`);
    }catch(error){
        throw new Error(error.response?.data || "Katılımcı silinirken bir hata oluştu");
    }
}

export const updateParticipant = async (participantId, updatedData) => {
    try{
        await axios.put(`${BASE_URL}/participants/update/${participantId}`, updatedData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }catch(error){
        throw new Error(error.response?.data || "Katılımcı bilgileri güncellenirken bir hata oluştu");
    }
};

export const fetchParticipantsByEventId = async (eventId, token) => {
    try{
        const response = await axios.get(`${BASE_URL}/participants/event/${eventId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch(error) {
        throw new Error(error.response?.data || "Katılımcılar yüklenirken bir hata oluştu");
    }
};