import axios from "axios";

const BASE_URL = "http://localhost:8080/ticketup";

export const createTicket = async (ticketData) => {
    try {
        const response = await axios.post(`${BASE_URL}/tickets/create`, ticketData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    }catch(error) {
        throw new Error(error.response?.data || "Bilet oluşturulurken bir hata oluştu.");
    }
};

export const getTicketById = async (id) => {
    try{
        const response = await axios.get(`${BASE_URL}/tickets/list/${id}`);
        return response.data;
    }catch(error) {
        throw new Error(error.response?.data || "Ticket bilgileri alınırken bir hata oluştu");
    }
};

export const deleteTicketById = async (ticketId) => {
    try{
        await axios.delete(`${BASE_URL}/tickets/delete/${ticketId}`);
    }catch(error) {
        throw new Error(error.response?.data || "Bilet silinirken beklenmedik bir hata oluştu. Lütfen tekrar deneyin.");
    }
};

export const queryTicket = async (ticketId, contactInfo) => {
    try{
        const isEmail = contactInfo.includes("@");

        const payload = {
            ticketId,
            participantEmail: isEmail ? contactInfo : null,
            participantPhone: !isEmail ? contactInfo : null,
        };

        const response = await axios.post(`${BASE_URL}/tickets/query`, payload);
        return response.data;
    }catch(error) {
        throw new Error(error.response?.data || "Bilet bulunamadı veya bilgileriniz eşleşmiyor");
    }
};

