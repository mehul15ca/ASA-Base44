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
    <div className="min-h-screen bg-[#FFFBF0]">
      <style>{`
        :root {
          --color-light-cream-1: #FFFBF0;
          --color-light-cream-2: #FFF8E7;
          --color-light-cream-3: #F5E6D3;
          --color-accent-cream: #EDD5B3;
          --color-highlight-cream: #D4A574;
          --color-gold: #D4AF37;
          --color-gold-light: #F4D03F;
        }
        
        * {
          scrollbar-width: thin;
          scrollbar-color: #D4A574 #FFFBF0;
        }
        
        *::-webkit-scrollbar {
          width: 8px;
        }
        
        *::-webkit-scrollbar-track {
          background: #FFFBF0;
        }
        
        *::-webkit-scrollbar-thumb {
          background: #D4A574;
          border-radius: 4px;
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background: #C4956A;
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