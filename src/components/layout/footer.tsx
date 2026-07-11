'use client';

import { Component, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';

export function Footer() {
  return (
    <footer
      className="mt-auto border-t border-border/60 bg-muted/30"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                <Component className="h-4 w-4" />
              </div>
              <span className="font-bold">{APP_CONFIG.nameAr}</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">
              منصة Monorepo متكاملة تجمع لوحة تحكم إدارية، متجر للمستخدمين، وبوابتين
              مترابطتين. مبنية بأحدث تقنيات الـ Frontend لضمان الأداء العالي وتجربة
              المستخدم المتميزة.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-accent"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-accent"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@monoverse.io"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-accent"
                aria-label="البريد الإلكتروني"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">المنصة</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  لوحة التحكم
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  المتجر
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  بوابة البائعين
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  بوابة العملاء
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">التقنيات</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>React.js + Next.js 16</li>
              <li>TypeScript 5</li>
              <li>Tailwind CSS 4</li>
              <li>TanStack Query + Zustand</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {APP_CONFIG.nameAr}. جميع الحقوق محفوظة.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            صُنع بـ <Heart className="h-3 w-3 fill-red-500 text-red-500" /> باستخدام React و Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
