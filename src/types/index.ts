export type RecordType = 'Insurance' | 'Loan' | 'SIP' | 'Bank';

export interface FinRecord {
  id: string;
  type: RecordType;
  name: string;
  amount: number;
  startDate?: string;
  dueDate?: string;
  notes?: string;
  done?: boolean;
  createdAt: string;
}

export interface User {
  email: string;
  name?: string;
}
