'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Store,
  Package,
  ShoppingCart,
  Star,
  TrendingUp,
  Plus,
  MoreHorizontal,
  Edit,
  Pause,
  Play,
  DollarSign,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SectionHeading } from '@/components/shared/section-heading';
import { StatusBadge } from '@/components/shared/status-badge';
import { useVendor } from '@/hooks/use-api';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency, formatNumber } from '@/lib/constants';
import { cn } from '@/lib/utils';

const monthlyData = [
  { month: 'يناير', sales: 3200, target: 3000 },
  { month: 'فبراير', sales: 4100, target: 3500 },
  { month: 'مارس', sales: 3800, target: 4000 },
  { month: 'أبريل', sales: 5200, target: 4500 },
  { month: 'مايو', sales: 6100, target: 5000 },
  { month: 'يونيو', sales: 7200, target: 5500 },
  { month: 'يوليو', sales: 8400, target: 6000 },
];

export function VendorPortal() {
  const { data, isLoading } = useVendor();
  const { toast } = useToast();

  const stats = data?.stats;
  const products = data?.products || [];
  const pendingOrders = data?.pendingOrders || [];

  const statCards = [
    {
      label: 'إجمالي المبيعات',
      value: stats ? formatCurrency(stats.totalSales) : '—',
      icon: DollarSign,
      change: '+18.5%',
      color: 'text-emerald-600 bg-emerald-500/10',
    },
    {
      label: 'المنتجات النشطة',
      value: stats?.activeProducts ?? '—',
      icon: Package,
      change: '+3 جديدة',
      color: 'text-blue-600 bg-blue-500/10',
    },
    {
      label: 'الطلبات المعلقة',
      value: stats?.pendingOrders ?? '—',
      icon: ShoppingCart,
      change: 'تحتاج إجراء',
      color: 'text-amber-600 bg-amber-500/10',
    },
    {
      label: 'تقييم العملاء',
      value: stats ? stats.customerRating.toFixed(1) : '—',
      icon: Star,
      change: 'من 5',
      color: 'text-purple-600 bg-purple-500/10',
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12 sm:px-6" aria-labelledby="vendor-heading">
      <SectionHeading
        badge="تطبيق 3 من 4"
        title="بوابة البائعين"
        subtitle="واجهة مخصصة للبائعين لإدارة منتجاتهم، تتبع المبيعات، ومتابعة الطلبات المعلقة مع تحليلات تفصيلية."
      />

      {/* Vendor Header */}
      <Card className="mt-8 overflow-hidden">
        <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
              <Store className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold">تك ستور</h3>
              <p className="text-sm text-muted-foreground">
                بائع معتمد منذ 2024 • حساب نشط
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1 border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
              <TrendingUp className="h-3 w-3" />
              نمو {stats?.monthlyGrowth.toFixed(1)}%
            </Badge>
            <Button className="gap-1.5">
              <Plus className="h-4 w-4" />
              إضافة منتج
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', stat.color)}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {stat.change}
                  </span>
                </div>
                <div className="mt-3 text-2xl font-bold">
                  {isLoading ? <Skeleton className="h-7 w-20" /> : stat.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chart + Pending Orders */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">مبيعات آخر 7 أشهر</CardTitle>
            <CardDescription>مقارنة المبيعات الشهرية بالمستهدف</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.922 0 0 / 0.5)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="oklch(0.556 0 0)" />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="oklch(0.556 0 0)"
                  tickFormatter={(v) => formatNumber(v)}
                />
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid oklch(0.922 0 0)',
                    fontSize: 12,
                    direction: 'rtl',
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Bar dataKey="target" name="المستهدف" fill="oklch(0.922 0 0)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sales" name="المبيعات" fill="oklch(0.646 0.222 41.116)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pending Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">طلبات معلقة</CardTitle>
                <CardDescription>تتطلب إجراء فوري</CardDescription>
              </div>
              <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400">
                {pendingOrders.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))
                : pendingOrders.slice(0, 4).map((order) => (
                    <div
                      key={order.id}
                      className="rounded-lg border border-border/60 p-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-medium">#{order.id}</span>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="mt-1.5 line-clamp-1 text-sm font-medium">
                        {order.product}
                      </p>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {order.customer}
                        </span>
                        <span className="text-sm font-bold">
                          {formatCurrency(order.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">إدارة المنتجات</CardTitle>
              <CardDescription>عرض وتعديل حالة جميع منتجاتك</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Package className="h-3.5 w-3.5" />
              تصدير
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المنتج</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>المخزون</TableHead>
                <TableHead>المبيعات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-left">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 6 }).map((_, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-4 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : products.map((p) => (
                    <TableRow key={p.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(p.price)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm">{p.stock} قطعة</span>
                          <Progress value={(p.stock / 200) * 100} className="h-1.5 w-20" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{p.sales}</span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            p.status === 'active' &&
                              'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
                            p.status === 'paused' &&
                              'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400',
                            p.status === 'draft' &&
                              'border-gray-500/30 bg-gray-500/10 text-gray-700 dark:text-gray-400'
                          )}
                        >
                          {p.status === 'active' ? 'نشط' : p.status === 'paused' ? 'متوقف' : 'مسودة'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast({ title: 'تعديل المنتج', description: p.name })}>
                              <Edit className="ml-2 h-4 w-4" />
                              تعديل
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast({ title: p.status === 'active' ? 'تم إيقاف المنتج' : 'تم تفعيل المنتج' })}>
                              {p.status === 'active' ? (
                                <>
                                  <Pause className="ml-2 h-4 w-4" />
                                  إيقاف مؤقت
                                </>
                              ) : (
                                <>
                                  <Play className="ml-2 h-4 w-4" />
                                  تفعيل
                                </>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
