import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinance } from '@/context/FinanceContext';
import { SummaryCard } from '@/components/SummaryCard';
import { RecordCard } from '@/components/RecordCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Shield, TrendingUp, CreditCard, Wallet, PlusCircle } from 'lucide-react';
import { loadUser } from '@/lib/storage';

const COLORS = {
  Insurance: '#0f6fff',
  SIP: '#16a34a',
  Loan: '#ef4444',
  Bank: '#06b6d4'
};

// Custom label rendering for better spacing
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null; // Hide labels for very small slices

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="font-semibold text-sm"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function Dashboard() {
  const navigate = useNavigate();
  const { records, loading } = useFinance();

  useEffect(() => {
    const user = loadUser();
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate summaries
  const totalInsurance = records.filter(r => r.type === 'Insurance').reduce((sum, r) => sum + r.amount, 0);
  const totalSIP = records.filter(r => r.type === 'SIP').reduce((sum, r) => sum + r.amount, 0);
  const totalLoan = records.filter(r => r.type === 'Loan').reduce((sum, r) => sum + r.amount, 0);
  const totalBank = records.filter(r => r.type === 'Bank').reduce((sum, r) => sum + r.amount, 0);

  // Prepare chart data
  const chartData = [
    { name: 'Insurance', value: totalInsurance },
    { name: 'SIP', value: totalSIP },
    { name: 'Loan', value: totalLoan },
    { name: 'Bank', value: totalBank }
  ].filter(item => item.value > 0);

  const user = loadUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-green-50/30">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, {user?.name || 'Guest'}!
          </h1>
          <p className="text-base text-muted-foreground">
            Here's your financial overview
          </p>
        </div>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <SummaryCard title="Insurance" value={totalInsurance} icon={Shield} color={COLORS.Insurance} />
          <SummaryCard title="SIP" value={totalSIP} icon={TrendingUp} color={COLORS.SIP} />
          <SummaryCard title="Loans" value={totalLoan} icon={CreditCard} color={COLORS.Loan} />
          <SummaryCard title="Bank" value={totalBank} icon={Wallet} color={COLORS.Bank} />
        </div>

        {/* Chart Section */}
        {chartData.length > 0 && (
          <Card className="mb-8 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl md:text-2xl">Distribution by Type</CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height={400} className="mx-auto">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomLabel}
                      outerRadius="70%"
                      innerRadius="0%"
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={2}
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[entry.name as keyof typeof COLORS]}
                          className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '8px 12px'
                      }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      iconType="circle"
                      wrapperStyle={{
                        paddingTop: '20px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Records List Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">All Records</h2>
            <Button 
              onClick={() => navigate('/add')}
              className="w-full sm:w-auto"
              size="default"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </div>

          {records.length === 0 ? (
            <Card className="shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-16 px-4">
                <div className="rounded-full bg-muted p-6 mb-6">
                  <Wallet className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No records yet</h3>
                <p className="text-muted-foreground text-center mb-6 max-w-sm">
                  Start tracking your finances by adding your first record
                </p>
                <Button onClick={() => navigate('/add')} size="lg">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create First Record
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {records.map((record) => (
                <RecordCard
                  key={record.id}
                  record={record}
                  onClick={() => navigate(`/edit/${record.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
