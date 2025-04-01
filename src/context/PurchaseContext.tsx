
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Purchase {
  id: string;
  orderId: string;
  planId: string;
  planName: string;
  price: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  website: string;
  paymentMethod: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  paymentDate?: string;
  notes?: string;
}

interface PurchaseContextType {
  purchases: Purchase[];
  addPurchase: (purchase: Omit<Purchase, 'id' | 'orderId' | 'createdAt'>) => Purchase;
  getPurchase: (id: string) => Purchase | undefined;
  getPurchaseByOrderId: (orderId: string) => Purchase | undefined;
  updatePurchaseStatus: (id: string, status: Purchase['status']) => void;
  updatePurchaseDetails: (id: string, details: Partial<Purchase>) => void;
  getAllPurchases: () => Purchase[];
  deletePurchase: (id: string) => void;
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export const PurchaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  // Load purchases from localStorage on init
  useEffect(() => {
    const storedPurchases = localStorage.getItem('purchases');
    if (storedPurchases) {
      setPurchases(JSON.parse(storedPurchases));
    }
  }, []);

  // Save purchases to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('purchases', JSON.stringify(purchases));
  }, [purchases]);

  const addPurchase = (purchaseData: Omit<Purchase, 'id' | 'orderId' | 'createdAt'>) => {
    const id = `purchase-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const createdAt = new Date().toISOString();
    
    const newPurchase: Purchase = {
      ...purchaseData,
      id,
      orderId,
      createdAt
    };
    
    setPurchases(prev => [...prev, newPurchase]);
    return newPurchase;
  };

  const getPurchase = (id: string) => {
    return purchases.find(purchase => purchase.id === id);
  };

  const getPurchaseByOrderId = (orderId: string) => {
    return purchases.find(purchase => purchase.orderId === orderId);
  };

  const updatePurchaseStatus = (id: string, status: Purchase['status']) => {
    setPurchases(prev => 
      prev.map(purchase => {
        if (purchase.id === id) {
          const updates: Partial<Purchase> = { status };
          
          // Add paymentDate when status is completed
          if (status === 'completed' && !purchase.paymentDate) {
            updates.paymentDate = new Date().toISOString();
          }
          
          return { ...purchase, ...updates };
        }
        return purchase;
      })
    );
  };

  const updatePurchaseDetails = (id: string, details: Partial<Purchase>) => {
    setPurchases(prev => 
      prev.map(purchase => 
        purchase.id === id ? { ...purchase, ...details } : purchase
      )
    );
  };

  const getAllPurchases = () => {
    return [...purchases].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  const deletePurchase = (id: string) => {
    setPurchases(prev => prev.filter(purchase => purchase.id !== id));
  };

  return (
    <PurchaseContext.Provider value={{ 
      purchases, 
      addPurchase, 
      getPurchase,
      getPurchaseByOrderId,
      updatePurchaseStatus,
      updatePurchaseDetails,
      getAllPurchases,
      deletePurchase
    }}>
      {children}
    </PurchaseContext.Provider>
  );
};

export const usePurchase = () => {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error('usePurchase must be used within a PurchaseProvider');
  }
  return context;
};
