'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { formatCurrency, formatNumber } from '@/lib/constants';
import type { DashboardStat } from '@/types';

interface StatCardProps {
  stat: DashboardStat;
  index?: number;
  loading?: boolean;
}

export function StatCard({ stat, index = 0, loading }: StatCardProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-7 w-28" />
          <Skeleton className="mt-2 h-3 w-20" />
        </CardContent>
      </Card>
    );
  }

  const formattedValue =
    stat.format === 'currency'
      ? formatCurrency(stat.value)
      : stat.format === 'percentage'
      ? `${stat.value}%`
      : formatNumber(stat.value);

  const TrendIcon =
    stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : Minus;

  const trendColor =
    stat.trend === 'up'
      ? 'text-emerald-600 bg-emerald-500/10'
      : stat.trend === 'down'
      ? 'text-red-600 bg-red-500/10'
      : 'text-muted-foreground bg-muted';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
    >
      <Card className="group relative overflow-hidden transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {stat.label}
          </CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <TrendIcon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tracking-tight">{formattedValue}</div>
          <div className="mt-1 flex items-center gap-1.5">
            <span
              className={cn(
                'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium',
                trendColor
              )}
            >
              <TrendIcon className="h-3 w-3" />
              {Math.abs(stat.change)}%
            </span>
            <span className="text-xs text-muted-foreground">آخر 30 يوماً</span>
          </div>
        </CardContent>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-right scale-x-0 bg-gradient-to-r from-emerald-500 to-teal-500 transition-transform duration-300 group-hover:scale-x-100" />
      </Card>
    </motion.div>
  );
}
