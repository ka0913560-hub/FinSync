import { FinRecord, User } from '@/types';

const STORAGE_KEY = 'finsync_records_v1';
const USER_KEY = 'finsync_user';

// Load all records from localStorage
export function loadRecords(): FinRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      const seedData = getSeedData();
      saveRecords(seedData);
      return seedData;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading records:', error);
    return [];
  }
}

// Save records to localStorage
export function saveRecords(records: FinRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (error) {
    console.error('Error saving records:', error);
  }
}

// Add a new record
export function addRecord(record: FinRecord): void {
  const records = loadRecords();
  records.unshift(record);
  saveRecords(records);
}

// Update an existing record
export function updateRecord(id: string, updates: Partial<FinRecord>): void {
  const records = loadRecords();
  const index = records.findIndex((r) => r.id === id);
  if (index !== -1) {
    records[index] = { ...records[index], ...updates };
    saveRecords(records);
  }
}

// Delete a record
export function deleteRecord(id: string): void {
  const records = loadRecords();
  const filtered = records.filter((r) => r.id !== id);
  saveRecords(filtered);
}

// User management
export function saveUser(user: User): void {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
}

export function loadUser(): User | null {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading user:', error);
    return null;
  }
}

export function clearUser(): void {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error clearing user:', error);
  }
}

// Seed data for demo
function getSeedData(): FinRecord[] {
  return [
    {
      id: '1',
      type: 'SIP',
      name: 'BlueChip Mutual Fund',
      amount: 5000,
      startDate: '2023-01-15',
      dueDate: '2028-01-15',
      notes: 'Monthly SIP investment',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      type: 'Loan',
      name: 'Home Loan',
      amount: 2500000,
      startDate: '2020-05-01',
      dueDate: '2040-05-01',
      notes: 'Primary residence mortgage',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      type: 'Bank',
      name: 'Savings Account',
      amount: 75000,
      startDate: '2018-03-12',
      notes: 'Primary savings account',
      createdAt: new Date().toISOString()
    },
    {
      id: '4',
      type: 'Insurance',
      name: 'Term Life Insurance',
      amount: 15000,
      startDate: '2022-06-01',
      dueDate: '2032-06-01',
      notes: 'Annual premium ₹15,000',
      createdAt: new Date().toISOString()
    },
    {
      id: '5',
      type: 'SIP',
      name: 'Tech Sector SIP',
      amount: 3000,
      startDate: '2023-08-01',
      dueDate: '2026-08-01',
      notes: 'Technology focused fund',
      createdAt: new Date().toISOString()
    }
  ];
}
