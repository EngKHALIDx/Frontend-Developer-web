/**
 * Application Constants
 * Centralized configuration for the monorepo platform.
 */

export const APP_CONFIG = {
  name: 'MonoVerse',
  nameAr: 'مونو فيرس',
  tagline: 'Frontend Developer Portfolio Platform',
  taglineAr: 'منصة معرض مطور الواجهات الأمامية',
  description:
    'منصة Monorepo متكاملة تضم لوحة تحكم إدارية، تطبيق مستخدم رئيسي، وبوابتين مترابطتين - مبنية بـ React، TypeScript، Tailwind CSS',
  version: '2.4.0',
  author: 'Frontend Developer',
} as const;

export const NAV_ITEMS = [
  {
    id: 'home',
    label: 'الرئيسية',
    labelEn: 'Home',
    icon: 'Home',
    description: 'نظرة عامة على المنصة',
  },
  {
    id: 'admin',
    label: 'لوحة التحكم',
    labelEn: 'Admin Dashboard',
    icon: 'LayoutDashboard',
    description: 'لوحة تحكم الإدارة الكاملة',
  },
  {
    id: 'store',
    label: 'متجر المستخدم',
    labelEn: 'User Store',
    icon: 'ShoppingBag',
    description: 'التطبيق الرئيسي للمستخدمين',
  },
  {
    id: 'vendor',
    label: 'بوابة البائعين',
    labelEn: 'Vendor Portal',
    icon: 'Store',
    description: 'بوابة إدارة البائعين',
  },
  {
    id: 'customer',
    label: 'بوابة العملاء',
    labelEn: 'Customer Portal',
    icon: 'UserCircle',
    description: 'بوابة حساب العميل',
  },
  {
    id: 'components',
    label: 'مكتبة المكونات',
    labelEn: 'Components',
    icon: 'Component',
    description: 'مكونات قابلة لإعادة الاستخدام',
  },
  {
    id: 'tech',
    label: 'التقنيات',
    labelEn: 'Tech Stack',
    icon: 'Code2',
    description: 'المهارات والتقنيات المستخدمة',
  },
] as const;

export const TECH_SKILLS = [
  {
    name: 'React.js',
    category: 'core' as const,
    proficiency: 95,
    yearsOfExperience: 5,
    description: 'خبرة عميقة في React 18+ مع Hooks، Context، Suspense، Server Components',
  },
  {
    name: 'Vue.js 3',
    category: 'core' as const,
    proficiency: 88,
    yearsOfExperience: 4,
    description: 'Composition API، Pinia، Vue Router، وتطبيقات SFC حديثة',
  },
  {
    name: 'TypeScript',
    category: 'core' as const,
    proficiency: 92,
    yearsOfExperience: 5,
    description: 'كتابة أكواد آمنة نوعياً مع Generics و Utility Types المتقدمة',
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'core' as const,
    proficiency: 96,
    yearsOfExperience: 6,
    description: 'إتقان كامل لـ ES6+ بما في ذلك async/await، generators، proxies',
  },
  {
    name: 'Tailwind CSS',
    category: 'styling' as const,
    proficiency: 94,
    yearsOfExperience: 4,
    description: 'تصميم متجاوب، تصميم نظام مخصص، JIT mode، ومكونات قابلة لإعادة الاستخدام',
  },
  {
    name: 'HTML5 & CSS3',
    category: 'styling' as const,
    proficiency: 97,
    yearsOfExperience: 6,
    description: 'Semantic HTML، Flexbox، Grid، CSS Variables، Animations',
  },
  {
    name: 'Vite',
    category: 'build' as const,
    proficiency: 90,
    yearsOfExperience: 3,
    description: 'إعداد مشاريع Vite، تحسين البناء، Hot Module Replacement',
  },
  {
    name: 'TanStack Query',
    category: 'state' as const,
    proficiency: 89,
    yearsOfExperience: 3,
    description: 'إدارة حالة الخادم، caching، optimistic updates، infinite queries',
  },
  {
    name: 'Zustand',
    category: 'state' as const,
    proficiency: 87,
    yearsOfExperience: 3,
    description: 'إدارة حالة العميل، middleware، persist، devtools',
  },
  {
    name: 'REST APIs',
    category: 'tools' as const,
    proficiency: 93,
    yearsOfExperience: 5,
    description: 'استهلاك وتكامل REST APIs، Postman، Swagger/OpenAPI',
  },
  {
    name: 'Git & GitHub',
    category: 'tools' as const,
    proficiency: 95,
    yearsOfExperience: 6,
    description: 'Git flow، code reviews، PRs، conflict resolution، GitHub Actions',
  },
  {
    name: 'Jira',
    category: 'tools' as const,
    proficiency: 85,
    yearsOfExperience: 4,
    description: 'إدارة المهام، sprint planning، agile methodologies',
  },
  {
    name: 'Accessibility (WCAG)',
    category: 'core' as const,
    proficiency: 86,
    yearsOfExperience: 3,
    description: 'WCAG 2.1 AA، ARIA، keyboard navigation، screen readers',
  },
  {
    name: 'Jest & Testing Library',
    category: 'testing' as const,
    proficiency: 84,
    yearsOfExperience: 3,
    description: 'Unit testing، component testing، mocking، coverage reports',
  },
  {
    name: 'Monorepo',
    category: 'build' as const,
    proficiency: 88,
    yearsOfExperience: 3,
    description: 'Turborepo، pnpm workspaces، shared packages',
  },
  {
    name: 'Performance Optimization',
    category: 'core' as const,
    proficiency: 90,
    yearsOfExperience: 4,
    description: 'Code splitting، lazy loading، memoization، Core Web Vitals',
  },
] as const;

export const CATEGORIES_AR: Record<string, string> = {
  electronics: 'إلكترونيات',
  fashion: 'أزياء',
  home: 'المنزل',
  books: 'كتب',
  sports: 'رياضة',
  beauty: 'تجميل',
};

export const ORDER_STATUS_AR: Record<string, string> = {
  pending: 'قيد الانتظار',
  processing: 'قيد المعالجة',
  shipped: 'تم الشحن',
  delivered: 'تم التوصيل',
  cancelled: 'ملغي',
  refunded: 'مسترد',
};

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  const symbols: Record<string, string> = { USD: '$', EUR: '€', SAR: 'ر.س', AED: 'د.إ' };
  const symbol = symbols[currency] || '$';
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const formatNumber = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
};
