import React from 'react';
import ShowsList from './api/ShowsList';
import LoginPage from './components/LoginPage';
import Booking from './components/Booking';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route index="/" element={<LoginPage />} />
            <Route path="/home" element={<ShowsList />} />
            <Route path="/booking" element={<Booking />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
