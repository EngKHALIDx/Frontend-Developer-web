'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'right' | 'center' | 'left';
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  align = 'right',
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4 }}
      className={cn(
        'flex flex-col gap-2',
        align === 'center' && 'items-center text-center',
        align === 'left' && 'items-start text-left',
        className
      )}
    >
      {badge && (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {badge}
        </span>
      )}
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {subtitle && (
        <p className="max-w-2xl text-sm text-muted-foreground leading-relaxed sm:text-base">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
