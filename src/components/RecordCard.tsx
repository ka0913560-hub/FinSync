import { Card, CardContent } from '@/components/ui/card';
import { FinRecord } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Shield, TrendingUp, CreditCard, Wallet } from 'lucide-react';

interface RecordCardProps {
  record: FinRecord;
  onClick?: () => void;
}

const iconMap = {
  Insurance: Shield,
  SIP: TrendingUp,
  Loan: CreditCard,
  Bank: Wallet
};

const colorMap = {
  Insurance: '#0f6fff',
  SIP: '#16a34a',
  Loan: '#ef4444',
  Bank: '#06b6d4'
};

export function RecordCard({ record, onClick }: RecordCardProps) {
  const Icon = iconMap[record.type];
  const color = colorMap[record.type];

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 border-none shadow-sm hover:scale-[1.02]" 
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="h-6 w-6" style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                {record.type}
              </p>
              <p className="text-base font-semibold truncate text-foreground mb-1">
                {record.name}
              </p>
              {record.notes && (
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {record.notes}
                </p>
              )}
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-lg md:text-xl font-bold whitespace-nowrap" style={{ color }}>
              {formatCurrency(record.amount)}
            </p>
            {record.dueDate && (
              <p className="text-xs text-muted-foreground mt-1 whitespace-nowrap">
                {formatDate(record.dueDate)}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
