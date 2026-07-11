'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ORDER_STATUS_AR } from '@/lib/constants';
import type { OrderStatus } from '@/types';

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusStyles: Record<OrderStatus, string> = {
  pending: 'bg-amber-500/15 text-amber-700 border-amber-500/30 dark:text-amber-400',
  processing: 'bg-blue-500/15 text-blue-700 border-blue-500/30 dark:text-blue-400',
  shipped: 'bg-purple-500/15 text-purple-700 border-purple-500/30 dark:text-purple-400',
  delivered: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-400',
  cancelled: 'bg-red-500/15 text-red-700 border-red-500/30 dark:text-red-400',
  refunded: 'bg-gray-500/15 text-gray-700 border-gray-500/30 dark:text-gray-400',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'border font-medium',
        statusStyles[status],
        className
      )}
    >
      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current" />
      {ORDER_STATUS_AR[status]}
    </Badge>
  );
}
