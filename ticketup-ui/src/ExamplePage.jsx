import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const ExamplePage = () => {
  const [organizers, setOrganizers] = useState([]);
  const token = sessionStorage.getItem('token'); // Token'ı al

  // Token'ı decode ederek kullanıcı bilgilerini alın
  const parsedToken = token ? jwtDecode(token) : null;

  useEffect(() => {
    if (!token) {
      console.error('No token found. Redirecting to login.');
      window.location.href = '/login';
      return;
    }

    const fetchOrganizers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ticketup/organizators/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrganizers(response.data); // Organizator listesini state'e kaydet
        console.log('Organizers fetched')
      } catch (error) {
        console.error('Error fetching organizers:', error.response?.data || error.message);
        if (error.response?.status === 401) {
          window.location.href = '/login'; // Yetkisizse login sayfasına yönlendir
        }
      }
    };

    fetchOrganizers();
  }, [token]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome, {parsedToken?.sub}</h1>
      <h2>Organizers</h2>
      {organizers.length > 0 ? (
        <ul>
          {organizers.map((organizer) => (
            <li key={organizer.id}>
              {organizer.name} {organizer.surname} - {organizer.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No organizers found.</p>
      )}
    </div>
  );
};

export default ExamplePage;
