import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';
import { useChannel } from '../context/ChannelContext';

const LandingPage: React.FC = () => {
  const { data } = useChannel();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleOpenChannel = () => {
    setIsLoginOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Header />
      
      <main className="flex-grow flex flex-col items-center pt-8 pb-16 px-4">
        {/* Profile Image */}
        <div className="relative mb-6">
          <img 
            src={data.image} 
            alt={data.name} 
            className="w-[180px] h-[180px] rounded-full object-cover shadow-sm"
          />
        </div>

        {/* Channel Name */}
        <div className="flex items-center gap-1 mb-2 text-center">
            <h1 className="text-2xl font-normal text-gray-800 text-center leading-tight">
             {data.name}
            </h1>
            {data.verified && (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#25D366">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"></path>
                </svg>
            )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-center mb-8 max-w-xs text-[17px]">
          {data.description}
        </p>

        {/* Action Button */}
        <button 
          onClick={handleOpenChannel}
          className="bg-[#008069] text-white font-bold py-3.5 px-10 rounded-full hover:bg-[#006d59] transition-colors text-[15px] shadow-sm mb-10 w-full max-w-[280px]"
        >
          Lihat Saluran
        </button>

        {/* Divider and Secondary Link */}
        <div className="w-full max-w-[320px] border-t border-gray-100 pt-6 text-center">
          <p className="text-gray-600 mb-2 text-[15px]">Belum menggunakan WhatsApp?</p>
          <a href="#" className="text-[#008069] font-bold text-[15px] hover:underline">
            Unduh
          </a>
        </div>
      </main>

      <Footer />
      
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        destination={data.destinationLink}
      />
    </div>
  );
};

export default LandingPage;