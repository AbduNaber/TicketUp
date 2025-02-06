import axios from "axios";
import { BASE_URL } from "./base_url";


export const loginOrganizer = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/organizators/login`, {
            email,
            password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    }catch(error) {
        if(error.response) {
            throw error.response.data;
        }else{
            throw new error('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
        }
    }
};


export const registerOrganizer = async (formData) => {
    try{
        const requestBody = {
            name: formData.name,
            surname: formData.surname,
            email: formData.mailAddress,
            organizationName: formData.organizationName,
            passwordHash: formData.password,
        };

        const response = await axios.post(`${BASE_URL}/organizators/register`, requestBody);
        return response.data;
    }catch(error) {
        if(error.response) {
            throw new Error(error.response.data?.error || "Kayıt sırasında bir hata oluştu");
        }else {
            throw new Error("Sunucuya ulaşılamadı lütfen bağlantınızı kontrol ediniz");
        }
    }
};

export const verifyEmail = async (token) => {
    try{
        const response = await axios.get(`${BASE_URL}/auth/verify-email`, {
            params: {token},
        });

        return response.data;
    }catch(error){
        throw new Error(error.response?.data || "Bir Hata Oluştu")
    }
}

export const forgotPassword = async (email) => {
    try{
        const response = await axios.post(`${BASE_URL}/auth/forgot-password`,
            null,
            {
                params: {email},
            }
        );

        return response.data;
    }catch(error){
        if(error.response){
            throw new Error(error.response.data || "Beklenmeyen bir hata oluştu. Lütfen Tekrar deneyin");
        }else {
            throw new Error("Sunucuya ulaşılamadı. Lütfen bağlantınızı kontrol edin.");
        }
    }
};

export const resetPassword = async (token, newPassword) => {
    try{
        const response = await axios.post(`${BASE_URL}/auth/reset-password`, {
            token,
            newPassword,
        });
        return response.data;
    }catch(error) {
        if(error.response){
            throw new Error(error.response.data || "Bir hata oluştu. Lütfen tekrar deneyin.");
        }else{
            throw new Error("Sunucuya ulaşılamıyor. Lütfen bağlantınızı kontrol edin");
        }
    }
};