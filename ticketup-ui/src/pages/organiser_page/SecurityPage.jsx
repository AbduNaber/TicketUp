import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Search, X } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const SecurityPage = ({ token }) => {
    const [officers, setOfficers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [formError, setFormError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const API_BASE = 'http://46.101.166.170:8080/ticketup/security-officers';
    const parsedToken = jwtDecode(token);

    useEffect(() => {
        fetchOfficers();
    }, [token]); // Added token as dependency

    const fetchOfficers = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_BASE}/list-organizer-officers/${parsedToken.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const data = response.data;
    
            // Normalize the response to always be an array
            const officersArray = Array.isArray(data) ? data : [data];
            setOfficers(officersArray);
        } catch (error) {
            console.error("Error fetching officers:", error.response?.data || error.message);
            setFormError('Görevliler yüklenirken bir hata oluştu.');
            if (error.response?.status === 401) {
                window.location.href = "/login";
            }
        } finally {
            setIsLoading(false);
        }
    };

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://46.101.166.170:8080/ticketup/events/list', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        const formData = new FormData(e.target);
        const officer = {
            name: formData.get('firstName')?.trim(),
            surname: formData.get('lastName')?.trim(),
            email: formData.get('email')?.trim(),
            status: 'Aktif',
            organizatorId: parsedToken.id,
            password: Math.floor(100000 + Math.random() * 900000).toString(),
        };

        if (!officer.name || !officer.surname || !officer.email) {
            setFormError('Tüm alanları doldurunuz.');
            return;
        }

        if (!officer.email.includes('@')) {
            setFormError('Lütfen geçerli bir e-posta adresi girin');
            return;
        }

        try {
            const response = await axios.post(API_BASE, officer, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOfficers((prev) => [...prev, response.data]);
            setSuccessMessage('Güvenlik görevlisi başarıyla eklendi!');
            e.target.reset();
            setIsModalOpen(false);
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error adding officer:', error.response?.data || error.message);
            setFormError(error.response?.data?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };


    const toggleOfficerStatus = async (id) => {
        const officer = officers.find(officer => officer.id === id);
        if (!officer) return;

        const updatedStatus = officer.status === 'Aktif' ? 'Pasif' : 'Aktif';

        try {
            await axios.put(`${API_BASE}/${id}`, 
                { ...officer, status: updatedStatus },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            setOfficers(prev => prev.map(officer => 
                officer.id === id ? { ...officer, status: updatedStatus } : officer
            ));
            setSuccessMessage('Durum başarıyla güncellendi');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            setFormError('Durum güncellenirken bir hata oluştu.');
            setTimeout(() => setFormError(''), 3000);
        }
    };

    const deleteOfficer = async (id) => {
        try {
            await axios.delete(`${API_BASE}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOfficers(prev => prev.filter(officer => officer.id !== id));
            setSuccessMessage('Görevli başarıyla silindi!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            setFormError('Görevli silinirken bir hata oluştu.');
            setTimeout(() => setFormError(''), 3000);
        }
    };
    console.log('Officers state:', officers);
    const filteredOfficers = officers.filter(officer => 
        officer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        officer.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        officer.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const generateNewPassword = async (id) => {
        
        const newPassword = Math.floor(100000 + Math.random() * 900000).toString();
    
       
        const officer = officers.find(officer => officer.id === id);
        if (!officer) return;

        officer.password = newPassword;
        

        try {
            await axios.put(
                `${API_BASE}/${id}`,
                { 
                    ...officer,
                    },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccessMessage('Şifre başarıyla güncellendi!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error updating password:', error.response?.data || error.message);
            setFormError('Şifre güncellenirken bir hata oluştu.');
            setTimeout(() => setFormError(''), 3000);
        }
    };

    const assignEventToOfficer = async (officerId, eventId) => {
        if (!eventId) {
            alert('Lütfen bir etkinlik seçin.');
            return;
        }

        try {
            const response = await axios.put(
                `http://46.101.166.170:8080/ticketup/security-officers/${officerId}/assign-event/${eventId}`,
                {}, // Boş bir body gönderiyoruz
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccessMessage('Görevli etkinliğe başarıyla atandı!');
            setTimeout(() => setSuccessMessage(''), 3000);
            fetchOfficers(); // Görevli listesini güncelle
        } catch (error) {
            console.error('Error assigning event:', error.response?.data || error.message);
            setFormError('Görevli ataması sırasında bir hata oluştu.');
            setTimeout(() => setFormError(''), 3000);
        }
    };


    return (
        <div className="container mx-auto mt-8 p-4">
            <div className="relative">
                <h1 className="text-3xl font-bold text-center mb-4">Güvenlik Görevlileri</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Yeni Görevli Ekle
                </button>
            </div>

            {(successMessage || formError) && (
                <div className={`mb-4 p-4 rounded-lg ${successMessage ? 'bg-green-50' : 'bg-red-50'}`}>
                    {successMessage ? (
                        <CheckCircle className="h-4 w-4 text-green-600 inline-block mr-2" />
                    ) : (
                        <AlertCircle className="h-4 w-4 text-red-600 inline-block mr-2" />
                    )}
                    {successMessage || formError}
                </div>
            )}

            <div className="mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Görevli ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                {isLoading ? (
                    <div className="text-center py-4">Yükleniyor...</div>
                ) : filteredOfficers.length === 0 ? (
                    <div className="p-4 border rounded-lg text-gray-600 text-center">
                        {searchTerm ? 'Arama sonucu bulunamadı.' : 'Görevli bulunamadı. Yeni bir görevli ekleyerek başlayın.'}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredOfficers.map((officer) => (
        <div key={officer.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold">
                        {officer.name} {officer.surname}
                    </h3>
                    <p className="text-sm text-gray-600">{officer.email}</p>
                    <p className="text-sm text-gray-600">
                        Şifre: <span>{officer.password}</span>
                    </p>
                    {officer.event ? (
                        <p className="text-sm text-gray-600">
                            Etkinlik: <span>{officer.event.name}</span>
                        </p>
                    ) : (
                        <p className="text-sm text-gray-600">Etkinlik: Atanmamış</p>
                    )}
                </div>
                <div className="flex gap-2 flex-col">
                    <button
                        onClick={() => toggleOfficerStatus(officer.id)}
                        className={`px-3 py-1 rounded-full text-sm ${
                            officer.status === 'Aktif'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        }`}
                    >
                        {officer.status}
                    </button>
                    <button
                        onClick={() => deleteOfficer(officer.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Sil
                    </button>
                    <button
                        onClick={() => generateNewPassword(officer.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 "
                    >
                        Şifre Oluştur
                    </button>
                </div>
            </div>
            {/* Etkinlik Atama Dropdown */}
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Etkinlik Ata:</label>
                <select
                    onChange={(e) => assignEventToOfficer(officer.id, e.target.value)}
                    defaultValue=""
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                    <option value="" disabled>
                        Etkinlik Seç
                    </option>
                    {events.map((event) => (
                        <option key={event.id} value={event.id}>
                            {event.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    ))}
</div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Yeni Görevli Ekle</h2>
                            <button 
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setFormError('');
                                }}
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Ad
                                </label>
                                <input
                                    name="firstName"
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Soyad
                                </label>
                                <input
                                    name="lastName"
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    E-posta
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                            >
                                Görevli Ekle
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SecurityPage;