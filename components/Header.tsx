import React from 'react';
import { Menu, Download } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-4 py-3 bg-white sticky top-0 z-40">
      <button className="p-1">
        <Menu className="w-6 h-6 text-gray-800" />
      </button>

      <div className="flex items-center gap-1">
         {/* Custom SVG for WhatsApp Logo Text to match screenshot exactly */}
        <div className="flex items-center gap-2 text-[#25D366] font-bold text-xl">
           <svg viewBox="0 0 33 33" width="33" height="33" className="" fill="currentColor">
              <path d="M16.6 0C7.5 0 0 7.5 0 16.7c0 3 .8 5.9 2.3 8.4L.6 33l8.1-2.1c2.4 1.3 5.1 2 7.9 2 9.2 0 16.7-7.5 16.7-16.7S25.8 0 16.6 0zm0 27.7c-2.5 0-4.9-.7-7-1.9l-.5-.3-5.2 1.4 1.4-5.1-.3-.5C3.8 19.1 3 16.6 3 14c0-7.5 6.1-13.6 13.6-13.6 7.5 0 13.6 6.1 13.6 13.6 0 7.4-6.1 13.7-13.6 13.7zm7.5-10.2c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.7-.2-1 .2-.3.5-1.2 1.5-1.4 1.8-.3.3-.5.4-1 .1-1.9-.9-3.2-1.6-4.4-3.8-.2-.3 0-.5.2-.7.2-.2.4-.4.6-.7.2-.2.3-.4.4-.6.1-.3 0-.5-.1-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.7-.7-1-.7h-.8c-.3 0-.7.1-1.1.5-.4.4-1.5 1.5-1.5 3.6s1.6 4.2 1.8 4.4c.2.3 3.1 4.7 7.5 6.6 2.9 1.3 3.5 1 4.8.9 1.3-.1 2.9-1.2 3.3-2.3.4-1.1.4-2.1.3-2.3-.2-.1-.5-.2-.9-.4z"></path>
           </svg>
           <span className="text-[#008069] tracking-tight">WhatsApp</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center justify-center w-9 h-9 border border-[#25D366] rounded-full text-[#25D366] font-bold">
           <Download className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;