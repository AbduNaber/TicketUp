import React from 'react';
import { BrowserRouter as Router, Route, Routes , Navigate } from 'react-router-dom';
import Login from './login'; 
import SignupForm from './register'; 
import Form from './form';


import AdminPanel from './AdminPanel';
import Event from './event';
import Ticket from './ticket';
import TicketEdit from './ticket_edit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/organizator" element={<AdminPanel></AdminPanel>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/form" element={<Form />} />

        <Route path="/event" element={<Event></Event>} />
        <Route path="/ticket" element={<Ticket></Ticket>} />
        <Route path="/ticket/edit" element={<TicketEdit></TicketEdit>} />
      </Routes>
    </Router>
  );
}

export default App;
