
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface DashboardStatProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const DashboardStat: React.FC<DashboardStatProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
}) => {
  return (
    <div className={cn(
      "p-6 rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow elegant-card", 
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold mb-1">{value}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
          {icon}
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className={cn(
            "flex items-center text-sm",
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
          )}>
            {trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : trend === 'down' ? (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            ) : null}
            <span>{trendValue} dalam 30 hari terakhir</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardStat;
