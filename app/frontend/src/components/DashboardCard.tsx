import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface IDashboardCard {
  title: string;
  value: any;
  children?: React.ReactNode;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'secondary';
  icon?: React.ReactNode;
}

const DashboardCard = ({
  title,
  value,
  description,
  variant = 'default',
  icon,
}: IDashboardCard) => {
  return (
    <div className="bg-white border border-border rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
        <div
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs',
            variant === 'default' && 'bg-primary/10 text-primary',
            variant === 'secondary' && 'bg-amber-50 text-amber-600',
            variant === 'success' && 'bg-emerald-50 text-emerald-600',
            variant === 'destructive' && 'bg-rose-50 text-rose-600'
          )}
        >
          {icon ? (
            icon
          ) : variant === 'success' ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : variant === 'secondary' ? (
            <Clock className="w-5 h-5" />
          ) : variant === 'destructive' ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <TrendingUp className="w-5 h-5" />
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="font-serif text-3xl font-bold text-foreground tracking-tight">
          {value}
        </div>
        {description && (
          <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
            <span
              className={cn(
                'w-1.5 h-1.5 rounded-full',
                variant === 'default' && 'bg-primary',
                variant === 'secondary' && 'bg-amber-500',
                variant === 'success' && 'bg-emerald-500',
                variant === 'destructive' && 'bg-rose-500'
              )}
            />
            <span>{description}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
