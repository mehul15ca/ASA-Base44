import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Layout({ children, currentPageName }) {
  const hideHeaderFooter = currentPageName === 'AttendancePortal' || 
    currentPageName?.startsWith('Admin') || 
    currentPageName?.startsWith('Student') || 
    currentPageName?.startsWith('Coach') || 
    currentPageName?.startsWith('SuperAdmin');
  
  return (
    <div className="min-h-screen bg-[#0A1F0A]">
      <style>{`
        :root {
          --color-dark-green-1: #0A1F0A;
          --color-dark-green-2: #0D2818;
          --color-dark-green-3: #1A4D2E;
          --color-accent-green: #2D6A4F;
          --color-highlight-green: #40916C;
          --color-gold: #D4AF37;
          --color-gold-light: #F4D03F;
        }
        
        * {
          scrollbar-width: thin;
          scrollbar-color: #2D6A4F #0A1F0A;
        }
        
        *::-webkit-scrollbar {
          width: 8px;
        }
        
        *::-webkit-scrollbar-track {
          background: #0A1F0A;
        }
        
        *::-webkit-scrollbar-thumb {
          background: #2D6A4F;
          border-radius: 4px;
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background: #40916C;
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