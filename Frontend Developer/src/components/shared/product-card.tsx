'use client';

import * as React from 'react';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { useAppStore } from '@/hooks/use-app-store';
import { CATEGORIES_AR, formatCurrency } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
  loading?: boolean;
}

export function ProductCard({ product, index = 0, loading }: ProductCardProps) {
  const { toast } = useToast();
  const addToCart = useAppStore((s) => s.addToCart);

  if (loading) {
    return (
      <Card className="overflow-hidden">
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-3 p-4">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      </Card>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast({
      title: 'تمت الإضافة إلى السلة',
      description: product.name,
    });
  };

  const statusBadge = {
    'in-stock': null,
    'low-stock': { label: 'مخزون منخفض', variant: 'secondary' as const },
    'out-of-stock': { label: 'نفد المخزون', variant: 'destructive' as const },
  }[product.status];

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={cn(
              'h-full w-full object-cover transition-transform duration-500 group-hover:scale-105',
              product.status === 'out-of-stock' && 'opacity-60 grayscale'
            )}
          />
          {/* Badges */}
          <div className="absolute right-2 top-2 flex flex-col gap-1.5">
            {discount > 0 && (
              <Badge className="bg-red-500 text-white hover:bg-red-500">
                -{discount}%
              </Badge>
            )}
            {product.tags.includes('الأكثر مبيعاً') && (
              <Badge className="bg-amber-500 text-white hover:bg-amber-500">
                الأكثر مبيعاً
              </Badge>
            )}
            {product.tags.includes('جديد') && (
              <Badge className="bg-emerald-500 text-white hover:bg-emerald-500">
                جديد
              </Badge>
            )}
          </div>
          {/* Hover actions */}
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-gradient-to-t from-black/70 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 rounded-full"
                    aria-label="إضافة للمفضلة"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>المفضلة</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 rounded-full"
                    aria-label="عرض سريع"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>عرض سريع</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {CATEGORIES_AR[product.category]}
            </span>
            {statusBadge && (
              <Badge variant={statusBadge.variant} className="text-[10px]">
                {statusBadge.label}
              </Badge>
            )}
          </div>

          <h3 className="line-clamp-1 font-semibold text-sm" title={product.name}>
            {product.name}
          </h3>
          <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
            <span className="text-[11px] text-muted-foreground">
              ({product.reviewCount.toLocaleString('ar-SA')})
            </span>
          </div>

          {/* Price + Add */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-base font-bold">
                {formatCurrency(product.price, product.currency)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(product.originalPrice, product.currency)}
                </span>
              )}
            </div>
            <Button
              size="icon"
              onClick={handleAddToCart}
              disabled={product.status === 'out-of-stock'}
              className="h-9 w-9 rounded-lg"
              aria-label={`إضافة ${product.name} إلى السلة`}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
