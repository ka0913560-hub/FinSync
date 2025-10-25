import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

export function getDaysUntil(dateStr?: string): number {
  if (!dateStr) return Infinity;
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function isThisWeek(dateStr?: string): boolean {
  if (!dateStr) return false;
  const days = getDaysUntil(dateStr);
  return days >= 0 && days <= 7;
}

export function isNextWeek(dateStr?: string): boolean {
  if (!dateStr) return false;
  const days = getDaysUntil(dateStr);
  return days > 7 && days <= 14;
}

export function isThisMonth(dateStr?: string): boolean {
  if (!dateStr) return false;
  const days = getDaysUntil(dateStr);
  return days >= 0 && days <= 30;
}
