'use client';

import * as React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIES_AR } from '@/lib/constants';

interface FilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  categories?: { value: string; label: string }[];
}

export function FilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
}: FilterBarProps) {
  const categoryOptions = [
    { value: 'all', label: 'كل الفئات' },
    ...Object.entries(CATEGORIES_AR).map(([value, label]) => ({ value, label })),
  ];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث عن المنتجات..."
          className="pr-10"
          aria-label="البحث عن المنتجات"
        />
      </div>
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-48" aria-label="تصفية حسب الفئة">
          <SlidersHorizontal className="ml-2 h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categoryOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
