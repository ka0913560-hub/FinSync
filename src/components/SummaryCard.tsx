import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color?: string;
}

export function SummaryCard({ title, value, icon: Icon, color = '#0f6fff' }: SummaryCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </p>
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
        </div>
        <p className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color }}>
          {formatCurrency(value)}
        </p>
      </CardContent>
    </Card>
  );
}
