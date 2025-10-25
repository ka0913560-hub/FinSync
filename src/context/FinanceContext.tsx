import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FinRecord } from '@/types';
import {
  loadRecords,
  saveRecords,
  addRecord as addRecordStorage,
  updateRecord as updateRecordStorage,
  deleteRecord as deleteRecordStorage
} from '@/lib/storage';

interface FinanceContextType {
  records: FinRecord[];
  loading: boolean;
  refreshRecords: () => void;
  addRecord: (record: Omit<FinRecord, 'id' | 'createdAt'>) => Promise<void>;
  updateRecord: (id: string, updates: Partial<FinRecord>) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<FinRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshRecords = () => {
    setLoading(true);
    const data = loadRecords();
    setRecords(data);
    setLoading(false);
  };

  const addRecord = async (record: Omit<FinRecord, 'id' | 'createdAt'>) => {
    const newRecord: FinRecord = {
      ...record,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    addRecordStorage(newRecord);
    refreshRecords();
  };

  const updateRecord = async (id: string, updates: Partial<FinRecord>) => {
    updateRecordStorage(id, updates);
    refreshRecords();
  };

  const deleteRecord = async (id: string) => {
    deleteRecordStorage(id);
    refreshRecords();
  };

  useEffect(() => {
    refreshRecords();
  }, []);

  return (
    <FinanceContext.Provider
      value={{ records, loading, refreshRecords, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
}
