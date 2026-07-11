'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, X, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ProductCard } from '@/components/shared/product-card';
import { FilterBar } from '@/components/shared/filter-bar';
import { SectionHeading } from '@/components/shared/section-heading';
import { useProducts } from '@/hooks/use-api';
import { useAppStore } from '@/hooks/use-app-store';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/constants';

export function UserStore() {
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('all');
  const [cartOpen, setCartOpen] = React.useState(false);

  const { data: products, isLoading } = useProducts({
    search,
    category: category === 'all' ? '' : category,
  });

  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  } = useAppStore();
  const { toast } = useToast();

  const total = cartTotal();
  const count = cartCount();

  const handleCheckout = () => {
    toast({
      title: 'تم إرسال الطلب بنجاح',
      description: `إجمالي ${count} منتج بقيمة ${formatCurrency(total)}`,
    });
    clearCart();
    setCartOpen(false);
  };

  return (
    <section className="container mx-auto px-4 py-12 sm:px-6" aria-labelledby="store-heading">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          badge="تطبيق 2 من 4"
          title="متجر المستخدم الرئيسي"
          subtitle="تجربة تسوق متكاملة مع بحث وتصفية، سلة تسوق تفاعلية، وتصميم متجاوب يعمل بسلاسة على جميع الأجهزة."
        />
        <Sheet open={cartOpen} onOpenChange={setCartOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2 self-start sm:self-auto">
              <ShoppingCart className="h-4 w-4" />
              سلة التسوق
              {count > 0 && (
                <Badge className="ml-1 bg-emerald-500 text-white hover:bg-emerald-500">
                  {count}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="flex w-full flex-col sm:max-w-md">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                سلة التسوق ({count})
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-4 py-2">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">السلة فارغة</p>
                    <p className="text-sm text-muted-foreground">
                      أضف منتجات للبدء بالتسوق
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <Card className="flex gap-3 p-3">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="line-clamp-1 text-sm font-medium">
                              {item.name}
                            </h4>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 shrink-0 text-muted-foreground hover:text-red-500"
                              onClick={() => removeFromCart(item.id)}
                              aria-label="حذف من السلة"
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                aria-label="تقليل الكمية"
                              >
                                -
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                aria-label="زيادة الكمية"
                              >
                                +
                              </Button>
                            </div>
                            <span className="text-sm font-bold">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">الإجمالي</span>
                  <span className="text-xl font-bold">{formatCurrency(total)}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 gap-1.5"
                    onClick={() => {
                      clearCart();
                      toast({ title: 'تم تفريغ السلة' });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    تفريغ
                  </Button>
                  <Button
                    className="flex-1 gap-1.5"
                    onClick={handleCheckout}
                  >
                    إتمام الشراء
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>

      {/* Filters */}
      <div className="mt-6">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
        />
      </div>

      {/* Products Grid */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ProductCard key={i} product={{} as any} loading index={i} />
            ))
          : products?.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
      </div>

      {!isLoading && products?.length === 0 && (
        <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">لا توجد منتجات</p>
            <p className="text-sm text-muted-foreground">
              جرب تغيير معايير البحث أو التصفية
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
