'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  LayoutDashboard,
  ShoppingBag,
  Store,
  UserCircle,
  Component,
  Code2,
  Menu,
  X,
  ShoppingCart,
  Search,
  Github,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { useAppStore } from '@/hooks/use-app-store';
import { APP_CONFIG, NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const iconMap = {
  Home,
  LayoutDashboard,
  ShoppingBag,
  Store,
  UserCircle,
  Component,
  Code2,
};

export function Navbar() {
  const { activeSection, setActiveSection, cartCount } = useAppStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartItems = cartCount();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl transition-all duration-300',
        scrolled && 'shadow-sm'
      )}
      role="banner"
    >
      <nav
        className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6"
        role="navigation"
        aria-label="التنقل الرئيسي"
      >
        {/* Logo */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          aria-label={`${APP_CONFIG.nameAr} - الصفحة الرئيسية`}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
            <Component className="h-5 w-5" />
          </div>
          <div className="hidden flex-col items-start leading-none sm:flex">
            <span className="text-base font-bold tracking-tight">{APP_CONFIG.nameAr}</span>
            <span className="text-[10px] text-muted-foreground">v{APP_CONFIG.version}</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex" role="tablist">
          {NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                role="tab"
                aria-selected={isActive}
                aria-label={item.label}
                className={cn(
                  'relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="بحث">
            <Search className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9"
            onClick={() => handleNav('store')}
            aria-label={`سلة التسوق - ${cartItems} منتجات`}
          >
            <ShoppingCart className="h-4 w-4" />
            <AnimatePresence>
              {cartItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-white"
                >
                  {cartItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="hidden h-9 w-9 sm:flex"
            asChild
            aria-label="GitHub Repository"
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 lg:hidden"
                aria-label="فتح القائمة"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <SheetTitle className="sr-only">قائمة التنقل</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                      <Component className="h-4 w-4" />
                    </div>
                    <span className="font-bold">{APP_CONFIG.nameAr}</span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                  {NAV_ITEMS.map((item) => {
                    const Icon = iconMap[item.icon as keyof typeof iconMap];
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        className={cn(
                          'mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-right transition-colors',
                          isActive
                            ? 'bg-accent text-foreground'
                            : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <div className="flex flex-1 flex-col">
                          <span className="text-sm font-medium">{item.label}</span>
                          <span className="text-[11px] text-muted-foreground">
                            {item.description}
                          </span>
                        </div>
                        {isActive && (
                          <Badge variant="default" className="h-1.5 w-1.5 rounded-full bg-emerald-500 p-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="border-t p-4 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">{APP_CONFIG.nameAr}</p>
                  <p className="mt-1">{APP_CONFIG.taglineAr}</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
