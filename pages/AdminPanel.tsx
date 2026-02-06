import React, { useState } from 'react';
import { useChannel } from '../context/ChannelContext';
import { Save, ArrowLeft, Upload, Lock, RotateCcw, Trash2 } from 'lucide-react';
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
      // Validasi ukuran file (Max 500KB agar LocalStorage tidak penuh)
      if (file.size > 500 * 1024) {
          alert("Ukuran gambar terlalu besar! Harap gunakan gambar di bawah 500KB agar bisa disimpan permanen.");
          return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // Konversi ke Base64 string agar bisa disimpan di LocalStorage
        const base64String = reader.result as string;
        setLocalData(prev => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
        updateData(localData);
        setSuccessMsg('Settings saved successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
        alert("Gagal menyimpan! Mungkin ukuran gambar terlalu besar.");
    }
  };

  const handleReset = () => {
      if (window.confirm("Apakah Anda yakin ingin menghapus semua perubahan dan kembali ke pengaturan awal kode?")) {
          localStorage.removeItem('wa_clone_data');
          window.location.reload();
      }
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
            <div className="bg-wa-green p-4 flex justify-between items-center">
                <h2 className="text-white font-semibold flex items-center gap-2">
                    Configuration
                </h2>
                <button 
                    onClick={handleReset}
                    className="text-white/80 hover:text-white text-xs flex items-center gap-1 bg-white/10 px-2 py-1 rounded transition"
                    title="Hapus perubahan dan kembali ke default"
                >
                    <RotateCcw size={12} /> Reset Default
                </button>
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
                        <div className="flex flex-col gap-2">
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
                            <span className="text-xs text-gray-500">Max size: 500KB (Automatic Base64)</span>
                        </div>
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
                    <p className="text-xs text-gray-500 mt-1">Link tujuan setelah korban login (e.g. link grup asli atau website lain).</p>
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