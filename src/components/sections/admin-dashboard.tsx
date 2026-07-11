'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Activity,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
  Plus,
  UserPlus,
  LogIn,
  LogOut,
  Pencil,
  Trash2,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatCard } from '@/components/shared/stat-card';
import { StatusBadge } from '@/components/shared/status-badge';
import { SectionHeading } from '@/components/shared/section-heading';
import { useDashboard, useOrders } from '@/hooks/use-api';
import { formatCurrency, formatNumber } from '@/lib/constants';

const activityIcons = {
  create: { icon: Plus, color: 'text-emerald-600 bg-emerald-500/10' },
  update: { icon: Pencil, color: 'text-blue-600 bg-blue-500/10' },
  delete: { icon: Trash2, color: 'text-red-600 bg-red-500/10' },
  login: { icon: LogIn, color: 'text-purple-600 bg-purple-500/10' },
  logout: { icon: LogOut, color: 'text-gray-600 bg-gray-500/10' },
};

function formatTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return 'منذ أقل من ساعة';
  if (hours < 24) return `منذ ${hours} ساعة`;
  const days = Math.floor(hours / 24);
  return `منذ ${days} يوم`;
}

export function AdminDashboard() {
  const { data, isLoading } = useDashboard();
  const { data: orders, isLoading: ordersLoading } = useOrders();

  return (
    <section className="container mx-auto px-4 py-12 sm:px-6" aria-labelledby="admin-heading">
      <SectionHeading
        badge="تطبيق 1 من 4"
        title="لوحة التحكم الإدارية"
        subtitle="نظرة شاملة على أداء المنصة مع إحصائيات حية، رسوم بيانية تفاعلية، وجداول بيانات قابلة للفرز والتصفية."
      />

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <StatCard key={i} stat={{} as any} loading index={i} />
            ))
          : data?.stats.map((stat, i) => (
              <StatCard key={stat.id} stat={stat} index={i} />
            ))}
      </div>

      {/* Charts Row */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">الإيرادات الشهرية</CardTitle>
                <CardDescription>مقارنة الإيرادات بالمستهدف خلال 7 أشهر</CardDescription>
              </div>
              <Badge variant="outline" className="gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                +24.5%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[280px] w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data?.revenue || []} margin={{ left: -20, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.646 0.222 41.116)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="oklch(0.646 0.222 41.116)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.6 0.118 184.704)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.6 0.118 184.704)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.922 0 0 / 0.5)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    stroke="oklch(0.556 0 0)"
                  />
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
                  <Area
                    type="monotone"
                    dataKey="target"
                    name="المستهدف"
                    stroke="oklch(0.6 0.118 184.704)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fill="url(#colorTarget)"
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="الإيرادات"
                    stroke="oklch(0.646 0.222 41.116)"
                    strokeWidth={2.5}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">مصادر الزوار</CardTitle>
            <CardDescription>توزيع الزوار حسب المصدر</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[280px] w-full" />
            ) : (
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={data?.traffic || []}
                      dataKey="visitors"
                      nameKey="source"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                    >
                      {(data?.traffic || []).map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: '1px solid oklch(0.922 0 0)',
                        fontSize: 12,
                        direction: 'rtl',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-3 w-full space-y-1.5">
                  {(data?.traffic || []).map((src) => (
                    <div key={src.source} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: src.color }}
                        />
                        <span>{src.source}</span>
                      </div>
                      <span className="font-medium">{src.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Orders Table + Activity */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Orders Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">أحدث الطلبات</CardTitle>
                <CardDescription>إدارة ومتابعة الطلبات في الوقت الفعلي</CardDescription>
              </div>
              <Button size="sm" variant="outline" className="gap-1">
                <ShoppingCart className="h-3.5 w-3.5" />
                عرض الكل
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-[360px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الطلب</TableHead>
                    <TableHead>العميل</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordersLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          {Array.from({ length: 4 }).map((_, j) => (
                            <TableCell key={j}>
                              <Skeleton className="h-4 w-full" />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    : orders?.slice(0, 6).map((order) => (
                        <TableRow key={order.id} className="hover:bg-muted/50">
                          <TableCell className="font-mono text-xs font-medium">
                            #{order.id}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{order.customer}</span>
                              <span className="text-xs text-muted-foreground">
                                {order.customerEmail}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">
                            {formatCurrency(order.amount, order.currency)}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={order.status} />
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">سجل النشاط</CardTitle>
                <CardDescription>آخر العمليات على المنصة</CardDescription>
              </div>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-[360px] pr-3">
              <div className="space-y-1">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex gap-3 p-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex-1 space-y-1.5">
                          <Skeleton className="h-3 w-3/4" />
                          <Skeleton className="h-2 w-1/2" />
                        </div>
                      </div>
                    ))
                  : data?.activity.map((act, i) => {
                      const cfg = activityIcons[act.type];
                      const Icon = cfg.icon;
                      return (
                        <motion.div
                          key={act.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                        >
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${cfg.color}`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <div className="flex-1 space-y-0.5">
                            <p className="text-xs leading-relaxed">
                              <span className="font-semibold">{act.user}</span>{' '}
                              {act.action}{' '}
                              <span className="text-muted-foreground">{act.target}</span>
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {formatTimeAgo(act.timestamp)}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
