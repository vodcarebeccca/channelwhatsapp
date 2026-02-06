import React, { useState } from 'react';
import { useChannel } from '../context/ChannelContext';
import { Save, ArrowLeft, Upload, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ADMIN_CONFIG } from '../config';

const AdminPanel: React.FC = () => {
  const { data, updateData } = useChannel();
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Form State
  const [localData, setLocalData] = useState(data);
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_CONFIG.password) {
        setIsAuthenticated(true);
        setAuthError('');
    } else {
        setAuthError('Password salah!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalData(prev => ({ ...prev, image: url }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData(localData);
    setSuccessMsg('Settings saved successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // --- Login Gate ---
  if (!isAuthenticated) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-200">
                <div className="flex justify-center mb-6 text-wa-green">
                    <div className="p-4 bg-green-50 rounded-full">
                        <Lock size={32} />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Admin Access</h2>
                <p className="text-center text-gray-500 mb-6 text-sm">Masukkan password untuk mengelola saluran.</p>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wa-green focus:border-transparent outline-none transition"
                            placeholder="Password Admin"
                            autoFocus
                        />
                    </div>
                    {authError && <p className="text-red-500 text-sm text-center font-medium">{authError}</p>}
                    <button
                        type="submit"
                        className="w-full bg-wa-green text-white font-bold py-3 rounded-lg hover:brightness-110 transition shadow-md"
                    >
                        Masuk
                    </button>
                    <Link to="/" className="block text-center text-gray-500 text-sm hover:underline mt-4">
                        &larr; Kembali ke Beranda
                    </Link>
                </form>
            </div>
        </div>
    );
  }

  // --- Main Admin Panel ---
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
            <Link to="/" className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition">
                <ArrowLeft className="text-gray-600" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Channel Control</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-wa-green p-4">
                <h2 className="text-white font-semibold flex items-center gap-2">
                    Configuration
                </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Channel Image</label>
                    <div className="flex items-center gap-6">
                        <img 
                            src={localData.image} 
                            alt="Preview" 
                            className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm"
                        />
                        <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 flex items-center gap-2 transition">
                            <Upload size={16} />
                            <span>Change Image</span>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageUpload}
                                className="hidden" 
                            />
                        </label>
                    </div>
                </div>

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Channel Name</label>
                    <input 
                        type="text" 
                        name="name"
                        value={localData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wa-green focus:border-transparent outline-none transition"
                        placeholder="e.g. Pemersatu Bangsa"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description (Subtitle)</label>
                    <input 
                        type="text" 
                        name="description"
                        value={localData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wa-green focus:border-transparent outline-none transition"
                        placeholder="e.g. Bakal Update Setiap Hari!!!"
                    />
                </div>

                {/* Destination Link */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Link (After Login)</label>
                    <input 
                        type="url" 
                        name="destinationLink"
                        value={localData.destinationLink}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wa-green focus:border-transparent outline-none transition"
                        placeholder="https://..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Where the user goes after clicking the fake login button.</p>
                </div>
                
                {/* Verified Toggle */}
                <div className="flex items-center gap-3">
                    <input 
                        type="checkbox"
                        id="verified"
                        checked={localData.verified}
                        onChange={(e) => setLocalData(prev => ({...prev, verified: e.target.checked}))}
                        className="w-4 h-4 text-wa-green focus:ring-wa-green border-gray-300 rounded"
                    />
                    <label htmlFor="verified" className="text-sm font-medium text-gray-700">Show Verified Badge</label>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-green-600 font-medium text-sm min-h-[20px]">
                        {successMsg}
                    </div>
                    <button 
                        type="submit" 
                        className="bg-wa-green hover:brightness-110 text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition shadow-md"
                    >
                        <Save size={18} />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
