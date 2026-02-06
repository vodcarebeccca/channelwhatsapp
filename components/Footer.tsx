import React from 'react';
import { X, Youtube, Instagram, Facebook, ChevronDown, ArrowDown } from 'lucide-react';

const Footer: React.FC = () => {
  const socialBtnClass = "w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center text-white hover:bg-gray-800 transition-colors";

  return (
    <footer className="bg-[#111b21] text-white pb-10">
      {/* Sticky-ish CTA Section inside footer area as per visual flow */}
      <div className="bg-[#111b21] px-4 py-8 flex justify-center border-b border-gray-800">
         <button className="bg-[#25D366] text-[#111b21] font-semibold rounded-full px-12 py-3 flex items-center gap-2 text-lg hover:brightness-95 transition-all w-full max-w-sm justify-center">
            Unduh <ArrowDown className="w-5 h-5" />
         </button>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-4 py-8 border-b border-gray-800">
        <a href="#" className={socialBtnClass}><X className="w-5 h-5" /></a>
        <a href="#" className={socialBtnClass}><Youtube className="w-5 h-5" /></a>
        <a href="#" className={socialBtnClass}><Instagram className="w-5 h-5" /></a>
        <a href="#" className={socialBtnClass}><Facebook className="w-5 h-5" /></a>
      </div>

      {/* Main Footer Content */}
      <div className="px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
             <svg viewBox="0 0 33 33" width="24" height="24" className="text-white fill-current">
              <path d="M16.6 0C7.5 0 0 7.5 0 16.7c0 3 .8 5.9 2.3 8.4L.6 33l8.1-2.1c2.4 1.3 5.1 2 7.9 2 9.2 0 16.7-7.5 16.7-16.7S25.8 0 16.6 0zm0 27.7c-2.5 0-4.9-.7-7-1.9l-.5-.3-5.2 1.4 1.4-5.1-.3-.5C3.8 19.1 3 16.6 3 14c0-7.5 6.1-13.6 13.6-13.6 7.5 0 13.6 6.1 13.6 13.6 0 7.4-6.1 13.7-13.6 13.7zm7.5-10.2c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.7-.2-1 .2-.3.5-1.2 1.5-1.4 1.8-.3.3-.5.4-1 .1-1.9-.9-3.2-1.6-4.4-3.8-.2-.3 0-.5.2-.7.2-.2.4-.4.6-.7.2-.2.3-.4.4-.6.1-.3 0-.5-.1-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.7-.7-1-.7h-.8c-.3 0-.7.1-1.1.5-.4.4-1.5 1.5-1.5 3.6s1.6 4.2 1.8 4.4c.2.3 3.1 4.7 7.5 6.6 2.9 1.3 3.5 1 4.8.9 1.3-.1 2.9-1.2 3.3-2.3.4-1.1.4-2.1.3-2.3-.2-.1-.5-.2-.9-.4z"></path>
             </svg>
             <span className="font-semibold text-lg">WhatsApp</span>
          </div>

          <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-sm text-gray-300">
             <div className="flex flex-col gap-3">
                <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Yang kami lakukan</p>
                <a href="#" className="hover:underline">Fitur</a>
                <a href="#" className="hover:underline">Blog</a>
                <a href="#" className="hover:underline">Keamanan</a>
                <a href="#" className="hover:underline">Untuk Bisnis</a>
             </div>
             <div className="flex flex-col gap-3">
                <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Siapa kami</p>
                <a href="#" className="hover:underline">Tentang kami</a>
                <a href="#" className="hover:underline">Karier</a>
                <a href="#" className="hover:underline">Pusat Merek</a>
                <a href="#" className="hover:underline">Privasi</a>
             </div>
             <div className="flex flex-col gap-3 mt-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Gunakan WhatsApp</p>
                <a href="#" className="hover:underline">Android</a>
                <a href="#" className="hover:underline">iPhone</a>
                <a href="#" className="hover:underline">Mac/PC</a>
                <a href="#" className="hover:underline">WhatsApp Web</a>
             </div>
             <div className="flex flex-col gap-3 mt-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Perlu bantuan?</p>
                <a href="#" className="hover:underline">Hubungi Kami</a>
                <a href="#" className="hover:underline">Pusat Bantuan</a>
                <a href="#" className="hover:underline">Aplikasi</a>
                <a href="#" className="hover:underline">Imbauan Keamanan</a>
             </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
           <p className="text-xs text-gray-400 mb-4">
             Peta situs<br/>
             Ketentuan & Kebijakan Privasi<br/>
             2026 © WhatsApp LLC
           </p>
           
           <button className="border border-gray-600 rounded-full px-4 py-2 flex items-center gap-2 text-sm hover:bg-gray-800 transition">
             Bahasa Indonesia <ChevronDown className="w-4 h-4" />
           </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
