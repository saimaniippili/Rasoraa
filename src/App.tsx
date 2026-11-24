import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { StoryPage } from './pages/StoryPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { EventsPage } from './pages/EventsPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

const InnerPageLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-canvas text-ink antialiased">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Editorial Home Experience with native bespoke header & footer */}
        <Route path="/" element={<HomePage />} />

        {/* 5-Step Dedicated Table Reservation Suite */}
        <Route path="/reservations" element={<ReservationsPage />} />

        {/* Inner Detailed Pages with standard luxury layout */}
        <Route element={<InnerPageLayout />}>
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
