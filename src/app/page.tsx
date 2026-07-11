'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { AdminDashboard } from '@/components/sections/admin-dashboard';
import { UserStore } from '@/components/sections/user-store';
import { VendorPortal } from '@/components/sections/vendor-portal';
import { CustomerPortal } from '@/components/sections/customer-portal';
import { ComponentLibrary } from '@/components/sections/component-library';
import { TechStack } from '@/components/sections/tech-stack';
import { useAppStore } from '@/hooks/use-app-store';

export default function Home() {
  const activeSection = useAppStore((s) => s.activeSection);

  const sections: Record<string, React.ReactNode> = {
    home: <HeroSection />,
    admin: <AdminDashboard />,
    store: <UserStore />,
    vendor: <VendorPortal />,
    customer: <CustomerPortal />,
    components: <ComponentLibrary />,
    tech: <TechStack />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1" role="main">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {sections[activeSection] || <HeroSection />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
