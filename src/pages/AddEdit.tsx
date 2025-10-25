import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFinance } from '@/context/FinanceContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecordType } from '@/types';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

export function AddEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { records, addRecord, updateRecord, deleteRecord } = useFinance();

  const [name, setName] = useState('');
  const [type, setType] = useState<RecordType>('Bank');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit && id) {
      const record = records.find(r => r.id === id);
      if (record) {
        setName(record.name);
        setType(record.type);
        setAmount(record.amount.toString());
        setDueDate(record.dueDate || '');
        setNotes(record.notes || '');
      }
    }
  }, [id, isEdit, records]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !amount) {
      alert('Please fill in Name and Amount');
      return;
    }

    const recordData = {
      name,
      type,
      amount: parseFloat(amount),
      dueDate: dueDate || undefined,
      notes: notes || undefined
    };

    try {
      if (isEdit && id) {
        await updateRecord(id, recordData);
      } else {
        await addRecord(recordData);
      }
      navigate('/');
    } catch (error) {
      alert('Failed to save record');
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await deleteRecord(id);
        navigate('/');
      } catch (error) {
        alert('Failed to delete record');
      }
    }
  };

  return (
    <div className="container py-6 max-w-2xl">
      <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Record' : 'Add New Record'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name *</label>
              <Input
                placeholder="e.g., HDFC Life Insurance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type *</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={type}
                onChange={(e) => setType(e.target.value as RecordType)}
              >
                <option value="Insurance">Insurance</option>
                <option value="SIP">SIP</option>
                <option value="Loan">Loan</option>
                <option value="Bank">Bank</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Amount (₹) *</label>
              <Input
                type="number"
                placeholder="e.g., 5000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date (Optional)</label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Notes (Optional)</label>
              <Textarea
                placeholder="Add any additional notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                {isEdit ? 'Update' : 'Save'}
              </Button>
              {isEdit && (
                <Button type="button" variant="destructive" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
