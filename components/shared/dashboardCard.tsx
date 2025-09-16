import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  children?: React.ReactNode;
}

export function DashboardCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend,
  className,
  children 
}: DashboardCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-text-secondary">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className="h-4 w-4 text-text-muted" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-text-primary">{value}</div>
        {description && (
          <p className="text-xs text-text-muted mt-1">
            {description}
          </p>
        )}
        {trend && (
          <p className="text-xs mt-1">
            <span className={trend.isPositive ? "text-success" : "text-error"}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>{" "}
            <span className="text-text-muted">from last month</span>
          </p>
        )}
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}