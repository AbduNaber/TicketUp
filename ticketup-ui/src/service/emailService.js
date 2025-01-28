import axios from "axios";

const BASE_URL = "http://localhost:8080/ticketup";

export const sendEmailWithTicket = async (email, pdfBlob) => {
    try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("file", pdfBlob);

        const response = await axios.post(`${BASE_URL}/tickets/sendEmail`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    }catch(error) {
        throw new Error(error.response?.data || "Bilet e-posta ile gönderilirken bir hata oluştu");
    }
};

export const sendContactEmail = async (contactData) => {
    try{
        const response = await axios.post(`${BASE_URL}/contact/send-mail`, contactData);
        return response.data;
    }catch(error){
        throw new Error(error.response?.data || "Mesaj gönderilirken bir hata oluştu");
    }
}