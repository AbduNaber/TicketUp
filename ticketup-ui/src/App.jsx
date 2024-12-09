import { BrowserRouter as Router, Route, Routes , Navigate } from 'react-router-dom';
import Login from './pages/login_page/login'; 
import SignupForm from './pages/register_page/register'; 
import Form from './pages/form_page/form';

import Event from './pages/event_page/event';
import Ticket from './pages/ticket_page/ticket';
import TicketEdit from './pages/ticket_edit_page/ticket_edit';
import OrganizerPage from './pages/organizer_page/OrganizerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/organizer" element={<OrganizerPage></OrganizerPage>} />
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
