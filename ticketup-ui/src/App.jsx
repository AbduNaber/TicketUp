import { BrowserRouter as Router, Route, Routes , Navigate } from 'react-router-dom';


import Login from './pages/login_page/Login'; 
import Register from './pages/register_page/Register';
import Event from './pages/event_page/Event';
import Ticket from './pages/ticket_page/Ticket';
import TicketEdit from './pages/edit_ticket/EditTicket';
import EventForm from './pages/event_form/EventForm';

import Auth from './pages/auth_page/Auth';
import OrganizerPage from './pages/organiser_page/OrganiserPage';
import "./index.css";
import VerifyEmail from './pages/verify_email/VerifyEmail';
import WhyUs from './pages/why_us/WhyUs';
import ContactUs from './pages/contact_us/ContactUs';
import TicketQuery from './pages/query_ticket/QueryTicket';
import EventPreview  from './pages/event_create/EventPreview';
import UpdateTicket from './pages/ticket_page/UpdateTicket';
import ForgotPassword from './pages/forgot_password/ForgotPassword';
import ResetPassword from './pages/forgot_password/ResetPassword';

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
        <Route path="/form" element={<EventForm />} />
        
        {/* <Route path="/auth" element={<Auth />} /> */}
        <Route path="/organizer" element={<OrganizerPage/>} />
        <Route path="/verify-email" element={<VerifyEmail></VerifyEmail>}></Route>
        <Route path="/why-us" element={<WhyUs></WhyUs>}></Route>
        <Route path="/contact-ticketup" element={<ContactUs></ContactUs>}></Route>
        <Route path="/query-ticket" element={<TicketQuery></TicketQuery>}></Route>
        <Route path="/event-preview" element={<EventPreview></EventPreview>}></Route>
        <Route path="/update-ticket" element={<UpdateTicket></UpdateTicket>}></Route>
        <Route path="/forgot-password"  element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path="/reset-password/:token" element={<ResetPassword></ResetPassword>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
