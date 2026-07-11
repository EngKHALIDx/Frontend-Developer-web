'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  UserCircle,
  Mail,
  Award,
  Star,
  ShoppingBag,
  Wallet,
  Calendar,
  ChevronLeft,
  Package,
  TrendingUp,
} from 'lucide-react';
import {
  RadialBar,
  RadialBarChart,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionHeading } from '@/components/shared/section-heading';
import { StatusBadge } from '@/components/shared/status-badge';
import { useCustomer } from '@/hooks/use-api';
import { formatCurrency } from '@/lib/constants';
import { cn } from '@/lib/utils';

const tierConfig = {
  bronze: { label: 'برونزي', color: 'from-amber-600 to-orange-700', next: 'فضي', pointsNeeded: 1000 },
  silver: { label: 'فضي', color: 'from-gray-400 to-gray-600', next: 'ذهبي', pointsNeeded: 2500 },
  gold: { label: 'ذهبي', color: 'from-amber-400 to-yellow-600', next: 'بلاتيني', pointsNeeded: 5000 },
  platinum: { label: 'بلاتيني', color: 'from-cyan-300 to-teal-500', next: null, pointsNeeded: 0 },
};

export function CustomerPortal() {
  const { data, isLoading } = useCustomer();
  const profile = data?.profile;
  const orders = data?.orders || [];

  const tier = profile ? tierConfig[profile.tier] : tierConfig.bronze;
  const progressToNextTier = profile
    ? Math.min(100, (profile.points / tier.pointsNeeded) * 100)
    : 0;

  const radialData = [{ name: 'points', value: progressToNextTier, fill: 'oklch(0.646 0.222 41.116)' }];

  const quickStats = [
    {
      label: 'إجمالي الطلبات',
      value: profile?.totalOrders ?? 0,
      icon: ShoppingBag,
      color: 'text-blue-600 bg-blue-500/10',
    },
    {
      label: 'إجمالي الإنفاق',
      value: profile ? formatCurrency(profile.totalSpent) : '—',
      icon: Wallet,
      color: 'text-emerald-600 bg-emerald-500/10',
    },
    {
      label: 'نقاط الولاء',
      value: profile?.points ?? 0,
      icon: Star,
      color: 'text-amber-600 bg-amber-500/10',
    },
    {
      label: 'عضو منذ',
      value: profile
        ? new Date(profile.joinedAt).toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'short',
          })
        : '—',
      icon: Calendar,
      color: 'text-purple-600 bg-purple-500/10',
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12 sm:px-6" aria-labelledby="customer-heading">
      <SectionHeading
        badge="تطبيق 4 من 4"
        title="بوابة العملاء"
        subtitle="صفحة شخصية للعميل تعرض الملف التعريفي، مستوى الولاء، سجل الطلبات، والإحصائيات الشخصية بتصميم أنيق ومتجاوب."
      />

      {/* Profile Header */}
      <Card className="mt-8 overflow-hidden">
        <div className={cn('h-24 bg-gradient-to-l', tier.color)} />
        <CardContent className="px-6 pb-6">
          <div className="-mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                  <AvatarImage src="https://i.pravatar.cc/150?img=9" alt={profile?.name} />
                  <AvatarFallback className="text-2xl">
                    {profile?.name?.charAt(0) || 'ن'}
                  </AvatarFallback>
                </Avatar>
                <div className={cn('absolute -bottom-1 -left-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br', tier.color)}>
                  <Award className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="pb-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">
                    {isLoading ? <Skeleton className="h-6 w-32" /> : profile?.name}
                  </h2>
                  <Badge className={cn('bg-gradient-to-l text-white', tier.color)}>
                    {tier.label}
                  </Badge>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  {isLoading ? <Skeleton className="h-4 w-40" /> : profile?.email}
                </div>
              </div>
            </div>
            <Button variant="outline" className="gap-1.5">
              <UserCircle className="h-4 w-4" />
              تعديل الملف
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {quickStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card>
              <CardContent className="p-5">
                <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', stat.color)}>
                  <stat.icon className="h-4 w-4" />
                </div>
                <div className="mt-3 text-xl font-bold">
                  {isLoading ? <Skeleton className="h-6 w-16" /> : stat.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Loyalty + Orders */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Loyalty Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">برنامج الولاء</CardTitle>
            <CardDescription>تقدمك نحو المستوى التالي</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={160}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="65%"
                  outerRadius="100%"
                  data={radialData}
                  startAngle={90}
                  endAngle={90 - (progressToNextTier / 100) * 360}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
                  <RadialBar dataKey="value" cornerRadius={20} background={{ fill: 'oklch(0.922 0 0)' }} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="-mt-24 mb-4 text-center">
                <div className="text-3xl font-bold">{profile?.points ?? 0}</div>
                <div className="text-xs text-muted-foreground">نقطة</div>
              </div>
              <div className="mt-4 w-full space-y-2 text-center">
                {tier.next ? (
                  <>
                    <p className="text-sm text-muted-foreground">
                      تحتاج{' '}
                      <span className="font-semibold text-foreground">
                        {Math.max(0, tier.pointsNeeded - (profile?.points ?? 0))}
                      </span>{' '}
                      نقطة للوصول إلى المستوى{' '}
                      <span className="font-semibold">{tier.next}</span>
                    </p>
                    <Progress value={progressToNextTier} className="h-2" />
                  </>
                ) : (
                  <div className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500/10 p-3 text-emerald-700 dark:text-emerald-400">
                    <Award className="h-5 w-5" />
                    <span className="font-medium">وصلت إلى أعلى مستوى!</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">سجل الطلبات</CardTitle>
                <CardDescription>آخر طلباتك وتفاصيلها</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                عرض الكل
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {orders.map((order, i) => (
                  <AccordionItem key={order.id} value={order.id} className="border-b">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex w-full items-center justify-between gap-3 pr-2">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <Package className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">#{order.id}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(order.date).toLocaleDateString('ar-SA', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusBadge status={order.status} />
                          <div className="text-left">
                            <div className="text-sm font-bold">
                              {formatCurrency(order.total)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {order.items} منتج
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 py-2 pr-12">
                        {order.products.map((p, j) => (
                          <div
                            key={j}
                            className="flex items-center justify-between rounded-lg bg-muted/50 p-2 text-sm"
                          >
                            <span className="font-medium">{p.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-muted-foreground">
                                ×{p.qty}
                              </span>
                              <span className="font-semibold">
                                {formatCurrency(p.price * p.qty)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
