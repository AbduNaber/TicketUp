import { BrowserRouter as Router, Route, Routes , Navigate } from 'react-router-dom';


import Login from './pages/login_page/Login'; 
import Register from './pages/register_page/Register'
import Event from './pages/event_page/Event'
import Ticket from './pages/ticket_page/Ticket';
import TicketEdit from './pages/edit_ticket/EditTicket';
import EventForm from './pages/event_form/EventForm';
import CreateEvent from './pages/event_create/CreateEvent';
import CreatePreview from './pages/create_preview/CreatePreview';
import Auth from './pages/auth_page/Auth';
import OrganizerPage from './pages/organiser_page/OrganiserPage';
import TicketQuery from './pages/query_ticket/QueryTicket';
import ContactUs from './pages/contact_us/ContactUs';
import WhyUs from './pages/why_us/WhyUs';
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/ticket/:id" element={<Ticket />} />
        <Route path="/ticket/edit" element={<TicketEdit />} />
        <Route path="/ticket/query" element={<TicketQuery />} />
        <Route path="/form" element={<EventForm />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/create/preview" element={<CreatePreview />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/organizer" element={<OrganizerPage/>} />
        <Route path="/main" element = {<MainPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
