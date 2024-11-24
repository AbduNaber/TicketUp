import React from 'react';
import { BrowserRouter as Router, Route, Routes , Navigate } from 'react-router-dom';
import Login from './login'; 
import SignupForm from './register'; 
import Form from './form';
import ExamplePage from './ExamplePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/pages/{pageName}" element={<ExamplePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
