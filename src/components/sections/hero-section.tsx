'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Sparkles,
  Code2,
  Layers,
  Zap,
  ShieldCheck,
  GitBranch,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { APP_CONFIG } from '@/lib/constants';
import { useAppStore } from '@/hooks/use-app-store';

const features = [
  { icon: Layers, label: 'بنية Monorepo', desc: 'تطبيقات مترابطة' },
  { icon: Code2, label: 'React + TypeScript', desc: 'كود آمن نوعياً' },
  { icon: Zap, label: 'Vite + Turbopack', desc: 'بناء فائق السرعة' },
  { icon: ShieldCheck, label: 'WCAG 2.1 AA', desc: 'إمكانية وصول كاملة' },
  { icon: GitBranch, label: 'Code Reviews', desc: 'أفضل الممارسات' },
];

const stats = [
  { value: '5+', label: 'تطبيقات مترابطة' },
  { value: '40+', label: 'مكونات قابلة لإعادة الاستخدام' },
  { value: '16+', label: 'تقنيات مستخدمة' },
  { value: '100%', label: 'متجاوب مع جميع الأحجام' },
];

export function HeroSection() {
  const setActiveSection = useAppStore((s) => s.setActiveSection);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute left-1/4 top-32 h-72 w-72 rounded-full bg-teal-500/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6 gap-1.5 border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-700 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              منصة Frontend احترافية v{APP_CONFIG.version}
            </Badge>
          </motion.div>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            منصة{' '}
            <span className="bg-gradient-to-l from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              {APP_CONFIG.nameAr}
            </span>{' '}
            للواجهات الأمامية
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground leading-relaxed sm:text-lg"
          >
            مشروع متكامل بأسلوب Monorepo يضم لوحة تحكم إدارية، متجراً تفاعلياً
            للمستخدمين، وبوابتين مترابطتين للبائعين والعملاء. مبني بأحدث تقنيات
            React، TypeScript، وTailwind CSS مع التزام كامل بمعايير الأداء
            وإمكانية الوصول.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              size="lg"
              onClick={() => scrollTo('admin')}
              className="h-12 gap-2 rounded-xl px-6"
            >
              استكشف لوحة التحكم
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo('tech')}
              className="h-12 gap-2 rounded-xl px-6"
            >
              <Code2 className="h-4 w-4" />
              التقنيات المستخدمة
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/60 bg-card/50 p-4 backdrop-blur-sm"
              >
                <div className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          {features.map((feature) => (
            <div
              key={feature.label}
              className="group flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card/50 p-4 text-center backdrop-blur-sm transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 transition-transform group-hover:scale-110 dark:text-emerald-400">
                <feature.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold">{feature.label}</div>
                <div className="text-[11px] text-muted-foreground">
                  {feature.desc}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Job requirements check */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mx-auto mt-16 max-w-3xl rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm sm:p-8"
        >
          <h3 className="mb-4 text-center text-sm font-semibold text-muted-foreground">
            يغطي المشروع متطلبات الوظيفة التالية
          </h3>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {[
              'React.js + Vue.js 3',
              'TypeScript (ES6+)',
              'Tailwind CSS + HTML5/CSS3',
              'Vite & Build Tools',
              'REST APIs Integration',
              'State Management (Zustand + TanStack Query)',
              'Monorepo Architecture',
              'Responsive Design',
              'Accessibility (WCAG)',
              'Performance Optimization',
              'Component Testing',
              'Git & Code Reviews',
            ].map((req) => (
              <div key={req} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
