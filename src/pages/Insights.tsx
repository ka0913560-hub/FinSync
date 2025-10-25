import { useMemo } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { formatCurrency } from '@/lib/utils';
import { BarChart2, TrendingUp, Shield, CreditCard, Wallet } from 'lucide-react';

const COLORS = {
  Insurance: '#0f6fff',
  SIP: '#16a34a',
  Loan: '#ef4444',
  Bank: '#06b6d4'
};

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.05) return null;
  return <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="font-semibold text-sm">{`${(percent * 100).toFixed(0)}%`}</text>;
};

export function Insights() {
  const { records } = useFinance();
  const byType = useMemo(() => {
    const grouped = { Insurance: 0, SIP: 0, Loan: 0, Bank: 0 };
    records.forEach(r => { grouped[r.type] += r.amount; });
    return Object.entries(grouped).map(([name, value]) => ({ name, value })).filter(item => item.value > 0);
  }, [records]);
  const topRecords = useMemo(() => [...records].sort((a, b) => b.amount - a.amount).slice(0, 5), [records]);
  const totalAmount = records.reduce((sum, r) => sum + r.amount, 0);
  const avgAmount = records.length > 0 ? totalAmount / records.length : 0;
  const maxAmount = records.length > 0 ? Math.max(...records.map(r => r.amount)) : 0;
  const iconMap = { Insurance: Shield, SIP: TrendingUp, Loan: CreditCard, Bank: Wallet };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-green-50/30">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3 mb-2">
            <BarChart2 className="h-8 w-8 text-primary" />
            Insights
          </h1>
          <p className="text-base text-muted-foreground">Analyze your financial data</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card className="shadow-sm border-none">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Total Amount</p>
              <p className="text-2xl md:text-3xl font-bold text-primary">{formatCurrency(totalAmount)}</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-none">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Average</p>
              <p className="text-2xl md:text-3xl font-bold text-accent">{formatCurrency(avgAmount)}</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-none">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Highest</p>
              <p className="text-2xl md:text-3xl font-bold text-green-600">{formatCurrency(maxAmount)}</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-none">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Total Records</p>
              <p className="text-2xl md:text-3xl font-bold">{records.length}</p>
            </CardContent>
          </Card>
        </div>
        {byType.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-sm border-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl">Amount by Type</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={byType} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#6b7280" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px' }} />
                    <Bar dataKey="value" fill="#0f6fff" radius={[8, 8, 0, 0]}>
                      {byType.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} className="hover:opacity-80 transition-opacity" />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl">Distribution</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie data={byType} cx="50%" cy="50%" labelLine={false} label={renderCustomLabel} outerRadius="65%" fill="#8884d8" dataKey="value" paddingAngle={2}>
                        {byType.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} className="hover:opacity-80 transition-opacity cursor-pointer" />)}
                      </Pie>
                      <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px' }} />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        {topRecords.length > 0 && (
          <Card className="shadow-sm border-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl md:text-2xl">Top 5 Records by Amount</CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="space-y-3">
                {topRecords.map((record, index) => {
                  const Icon = iconMap[record.type];
                  const color = COLORS[record.type];
                  return (
                    <div key={record.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:shadow-md transition-shadow bg-card">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted font-bold text-lg">{index + 1}</div>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}20` }}>
                        <Icon className="h-6 w-6" style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-base truncate">{record.name}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">{record.type}</p>
                      </div>
                      <p className="text-xl font-bold shrink-0" style={{ color }}>{formatCurrency(record.amount)}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
        {records.length === 0 && (
          <Card className="shadow-sm border-none">
            <CardContent className="flex flex-col items-center justify-center py-16 px-4">
              <div className="rounded-full bg-muted p-6 mb-6">
                <BarChart2 className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No data to analyze</h3>
              <p className="text-muted-foreground text-center">Add some records to see insights and analytics</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}