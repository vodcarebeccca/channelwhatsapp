import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ChannelData, ChannelContextType } from '../types';

const defaultData: ChannelData = {
  name: "Pemersatu Bangsa 🔞",
  description: "Bakal Update Setiap Hari!!!",
  image: "https://picsum.photos/200/200", // Default placeholder
  destinationLink: "https://www.whatsapp.com",
  verified: false
};

const ChannelContext = createContext<ChannelContextType | undefined>(undefined);

export const ChannelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Coba ambil data dari LocalStorage saat pertama kali load
  const [data, setData] = useState<ChannelData>(() => {
    try {
      const savedData = localStorage.getItem('wa_clone_data');
      return savedData ? JSON.parse(savedData) : defaultData;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return defaultData;
    }
  });

  // 2. Simpan ke LocalStorage setiap kali updateData dipanggil
  const updateData = (newData: Partial<ChannelData>) => {
    setData(prev => {
      const updated = { ...prev, ...newData };
      try {
        localStorage.setItem('wa_clone_data', JSON.stringify(updated));
      } catch (error) {
        console.error("Error saving to localStorage", error);
      }
      return updated;
    });
  };

  return (
    <ChannelContext.Provider value={{ data, updateData }}>
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannel = () => {
  const context = useContext(ChannelContext);
  if (!context) {
    throw new Error("useChannel must be used within a ChannelProvider");
  }
  return context;
};