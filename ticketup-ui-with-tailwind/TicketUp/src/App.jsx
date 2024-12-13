import { BrowserRouter as Router, Route, Routes , Navigate } from 'react-router-dom';


import Login from './pages/login_page/Login'; 
import Register from './pages/register_page/Register'
import Event from './pages/event_page/Event'
import Ticket from './pages/ticket_page/Ticket';
import TicketEdit from './pages/edit_ticket/EditTicket';
import EventForm from './pages/event_form/EventForm';
import CreateEvent from './pages/event_create/CreateEvent';
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/ticket/edit" element={<TicketEdit />} />
        <Route path="/form" element={<EventForm />} />
        <Route path="/create" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
}

export default App;