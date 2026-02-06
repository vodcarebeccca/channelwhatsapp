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
  const [data, setData] = useState<ChannelData>(defaultData);

  const updateData = (newData: Partial<ChannelData>) => {
    setData(prev => ({ ...prev, ...newData }));
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
