import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from './context/ThemeContext';
import { PageShell } from './components/layout/PageShell';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ListingDetailPage from './pages/ListingDetailPage';
import CreateListingPage from './pages/CreateListingPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SellerProfilePage from './pages/SellerProfilePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            <Route path="/dashboard" element={<PageShell><DashboardPage /></PageShell>} />
            <Route path="/listing/:id" element={<PageShell><ListingDetailPage /></PageShell>} />
            <Route path="/seller/:id" element={<PageShell><SellerProfilePage /></PageShell>} />
            <Route path="/create-listing" element={<PageShell><CreateListingPage /></PageShell>} />
            
            <Route path="/messages" element={<PageShell><MessagesPage /></PageShell>} />
            <Route path="/messages/:chatId" element={<PageShell><MessagesPage /></PageShell>} />
            
            <Route path="/profile" element={<PageShell><ProfilePage /></PageShell>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
