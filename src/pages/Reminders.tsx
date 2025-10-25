import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinance } from '@/context/FinanceContext';
import { RecordCard } from '@/components/RecordCard';
import { Button } from '@/components/ui/button';
import { getDaysUntil, isThisWeek, isNextWeek, isThisMonth } from '@/lib/utils';
import { Bell, Calendar, AlertCircle } from 'lucide-react';

type FilterType = 'all' | 'overdue' | 'thisWeek' | 'nextWeek' | 'thisMonth';

export function Reminders() {
  const navigate = useNavigate();
  const { records } = useFinance();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredRecords = useMemo(() => {
    const recordsWithDates = records.filter(r => r.dueDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    switch (filter) {
      case 'overdue':
        return recordsWithDates.filter(r => {
          const daysUntil = getDaysUntil(r.dueDate!);
          return daysUntil < 0;
        });
      case 'thisWeek':
        return recordsWithDates.filter(r => isThisWeek(r.dueDate!));
      case 'nextWeek':
        return recordsWithDates.filter(r => isNextWeek(r.dueDate!));
      case 'thisMonth':
        return recordsWithDates.filter(r => isThisMonth(r.dueDate!));
      default:
        return recordsWithDates;
    }
  }, [records, filter]);

  // Sort by due date
  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => {
      const dateA = new Date(a.dueDate!).getTime();
      const dateB = new Date(b.dueDate!).getTime();
      return dateA - dateB;
    });
  }, [filteredRecords]);

  // Count overdue
  const overdueCount = useMemo(() => {
    return records.filter(r => r.dueDate && getDaysUntil(r.dueDate) < 0).length;
  }, [records]);

  const filters: { type: FilterType; label: string }[] = [
    { type: 'all', label: 'All' },
    { type: 'overdue', label: 'Overdue' },
    { type: 'thisWeek', label: 'This Week' },
    { type: 'nextWeek', label: 'Next Week' },
    { type: 'thisMonth', label: 'This Month' }
  ];

  return (
    <div className="container py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            Reminders
          </h1>
          <p className="text-muted-foreground mt-1">Track your upcoming payments</p>
        </div>
      </div>

      {/* Overdue Alert */}
      {overdueCount > 0 && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <div className="flex-1">
            <p className="font-semibold text-destructive">
              {overdueCount} overdue payment{overdueCount > 1 ? 's' : ''}
            </p>
            <p className="text-sm text-muted-foreground">Please review and update</p>
          </div>
        </div>
      )}

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filters.map(({ type, label }) => (
          <Button
            key={type}
            variant={filter === type ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(type)}
          >
            {label}
            {type === 'overdue' && overdueCount > 0 && (
              <span className="ml-2 bg-destructive text-destructive-foreground rounded-full px-2 py-0.5 text-xs">
                {overdueCount}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Records List */}
      {sortedRecords.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg border">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-2">
            {filter === 'all' 
              ? 'No records with due dates' 
              : `No records ${filter === 'overdue' ? 'overdue' : `for ${filter.replace(/([A-Z])/g, ' $1').toLowerCase()}`}`
            }
          </p>
          <p className="text-sm text-muted-foreground">
            Add due dates to your records to see reminders here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Showing {sortedRecords.length} record{sortedRecords.length > 1 ? 's' : ''}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedRecords.map((record) => {
              const daysUntil = getDaysUntil(record.dueDate!);
              return (
                <div key={record.id} className="relative">
                  {daysUntil < 0 && (
                    <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded-full z-10">
                      {Math.abs(daysUntil)}d overdue
                    </div>
                  )}
                  {daysUntil >= 0 && daysUntil <= 7 && (
                    <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-full z-10">
                      {daysUntil === 0 ? 'Today' : `${daysUntil}d left`}
                    </div>
                  )}
                  <RecordCard
                    record={record}
                    onClick={() => navigate(`/edit/${record.id}`)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
