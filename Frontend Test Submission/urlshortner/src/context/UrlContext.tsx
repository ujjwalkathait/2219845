import React, { createContext, useState, useContext } from 'react';

export interface UrlItem {
  original: string;
  shortcode: string;
  expiry: Date;
  clicks: number;
}

interface UrlContextType {
  urls: UrlItem[];
  addUrl: (item: Omit<UrlItem, 'clicks'>) => void;
  incrementClick: (shortcode: string) => void;
}

const UrlContext = createContext<UrlContextType | undefined>(undefined);

export const UrlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [urls, setUrls] = useState<UrlItem[]>([]);

  const addUrl = (item: Omit<UrlItem, 'clicks'>) => {
    setUrls(prev => [...prev, { ...item, clicks: 0 }]);
  };

  const incrementClick = (shortcode: string) => {
    setUrls(prev => prev.map(u => u.shortcode === shortcode ? { ...u, clicks: u.clicks + 1 } : u));
  };

  return (
    <UrlContext.Provider value={{ urls, addUrl, incrementClick }}>
      {children}
    </UrlContext.Provider>
  );
};

export const useUrls = () => {
  const ctx = useContext(UrlContext);
  if (!ctx) throw new Error('useUrls must be used within UrlProvider');
  return ctx;
};