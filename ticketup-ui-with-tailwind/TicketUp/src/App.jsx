import { BrowserRouter as Router, Route, Routes , Navigate } from 'react-router-dom';


import Login from './pages/login_page/Login'; 
import Register from './pages/register_page/Register'
import Event from './pages/event_page/Event'
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event/:id" element={<Event />} />
        
      </Routes>
    </Router>
  );
}

export default App;
