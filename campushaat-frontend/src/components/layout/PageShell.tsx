import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background font-body text-text-primary">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-16 md:py-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

