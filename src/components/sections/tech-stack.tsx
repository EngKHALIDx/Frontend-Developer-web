'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Palette,
  Database,
  Settings2,
  TestTube,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SectionHeading } from '@/components/shared/section-heading';
import { TECH_SKILLS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const categoryConfig = {
  core: { label: 'الأساسية', icon: Code2, color: 'text-emerald-600 bg-emerald-500/10' },
  styling: { label: 'التصميم', icon: Palette, color: 'text-purple-600 bg-purple-500/10' },
  state: { label: 'إدارة الحالة', icon: Database, color: 'text-blue-600 bg-blue-500/10' },
  build: { label: 'البناء', icon: Settings2, color: 'text-amber-600 bg-amber-500/10' },
  testing: { label: 'الاختبارات', icon: TestTube, color: 'text-red-600 bg-red-500/10' },
  tools: { label: 'الأدوات', icon: Wrench, color: 'text-cyan-600 bg-cyan-500/10' },
};

const jobHighlights = [
  {
    title: 'خبرة لا تقل عن 3 سنوات',
    value: '6+ سنوات',
    description: 'خبرة فعلية في تطوير الواجهات الأمامية',
  },
  {
    title: 'خبرة في React.js',
    value: '5 سنوات',
    description: 'منذ React 16 حتى React 19 مع Server Components',
  },
  {
    title: 'خبرة في Vue.js 3',
    value: '4 سنوات',
    description: 'Composition API و Pinia و Vue Router',
  },
  {
    title: 'خبرة في Monorepo',
    value: '3 سنوات',
    description: 'Turborepo و pnpm workspaces',
  },
];

export function TechStack() {
  const grouped = React.useMemo(() => {
    const groups: Record<string, typeof TECH_SKILLS> = {};
    TECH_SKILLS.forEach((skill) => {
      if (!groups[skill.category]) groups[skill.category] = [];
      groups[skill.category].push(skill);
    });
    return groups;
  }, []);

  return (
    <section className="container mx-auto px-4 py-12 sm:px-6" aria-labelledby="tech-heading">
      <SectionHeading
        badge="Skills & Expertise"
        title="التقنيات والمهارات"
        subtitle="مجموعة شاملة من التقنيات التي تغطي جميع متطلبات الوظيفة، مع سنوات الخبرة الفعلية ومستوى الإتقان لكل تقنية."
      />

      {/* Job Requirements Highlights */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {jobHighlights.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="h-full">
              <CardContent className="p-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs text-muted-foreground">{item.title}</span>
                </div>
                <div className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {item.value}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Skills by Category */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(grouped).map(([category, skills], catIdx) => {
          const config = categoryConfig[category as keyof typeof categoryConfig];
          const Icon = config.icon;
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', config.color)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{config.label}</CardTitle>
                      <CardDescription className="text-xs">{skills.length} مهارات</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <Badge variant="outline" className="text-[10px]">
                            {skill.yearsOfExperience}+ سنة
                          </Badge>
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <Progress value={skill.proficiency} className="h-1.5" />
                      <p className="text-[11px] leading-relaxed text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Methodology & Tools */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">منهجية العمل والأدوات</CardTitle>
          <CardDescription>كيفية إدارة المشاريع والتعاون مع الفريق</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Git Workflow', desc: 'Git Flow، Feature Branches، Pull Requests، Code Reviews منتظمة' },
              { title: 'Agile / Scrum', desc: 'Jira لـ Sprint Planning، Daily Standups، Retrospectives' },
              { title: 'API Testing', desc: 'Postman و Swagger/OpenAPI لتوثيق واختبار REST APIs' },
              { title: 'CI/CD', desc: 'GitHub Actions للفحص التلقائي والنشر المستمر' },
              { title: 'Code Quality', desc: 'ESLint، Prettier، TypeScript Strict Mode، Husky' },
              { title: 'Testing', desc: 'Jest، Testing Library، Playwright لـ E2E Testing' },
              { title: 'Performance', desc: 'Lighthouse، Core Web Vitals، Bundle Analyzer' },
              { title: 'Accessibility', desc: 'WCAG 2.1 AA، axe-core، Keyboard Navigation، ARIA' },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border/60 bg-card/50 p-4 transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/5"
              >
                <h4 className="text-sm font-semibold">{item.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
