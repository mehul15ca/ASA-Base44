import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Layout({ children, currentPageName }) {
  const hideHeaderFooter = currentPageName === 'AttendancePortal' || 
    currentPageName?.startsWith('Admin') || 
    currentPageName?.startsWith('Student') || 
    (currentPageName?.startsWith('Coach') && currentPageName !== 'Coaches') || 
    currentPageName?.startsWith('SuperAdmin') ||
    currentPageName?.startsWith('Store');
  
  return (
    <div className="min-h-screen bg-[#F0F9F4]">
      <style>{`
        :root {
          --color-light-green-1: #F0F9F4;
          --color-light-green-2: #E8F5E9;
          --color-light-green-3: #C8E6C9;
          --color-accent-green: #66BB6A;
          --color-highlight-green: #4CAF50;
          --color-gold: #D4AF37;
          --color-gold-light: #F4D03F;
        }
        
        * {
          scrollbar-width: thin;
          scrollbar-color: #66BB6A #F0F9F4;
        }
        
        *::-webkit-scrollbar {
          width: 8px;
        }
        
        *::-webkit-scrollbar-track {
          background: #F0F9F4;
        }
        
        *::-webkit-scrollbar-thumb {
          background: #66BB6A;
          border-radius: 4px;
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background: #4CAF50;
        }
        
        html {
          scroll-behavior: smooth;
        }
        `}</style>

        {!hideHeaderFooter && <Navbar />}
        <main>
        {children}
        </main>
        {!hideHeaderFooter && <Footer />}
    </div>
  );
}