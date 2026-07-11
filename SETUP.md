# 🛠️ دليل إعداد البيئة وبناء المشروع من الصفر

> هذا الدليل يشرح كيفية إعداد بيئة التطوير من الصفر وبناء المشروع خطوة بخطوة على جهازك الخاص.

---

## 📋 المتطلبات الأساسية

قبل البدء، تأكد من تثبيت الأدوات التالية على جهازك:

### 1️⃣ Node.js (الإصدار 18 أو أحدث)

```bash
# تحقق من الإصدار المثبت
node --version
# يجب أن يكون v18.x.x أو أحدث

# إذا لم يكن مثبتاً، حمّله من:
# https://nodejs.org/
```

### 2️⃣ npm أو bun أو yarn

```bash
# npm يأتي مع Node.js
npm --version

# أو ثبّت bun (أسرع)
curl -fsSL https://bun.sh/install | bash
bun --version
```

### 3️⃣ Git

```bash
git --version
# إذا لم يكن مثبتاً: https://git-scm.com/
```

### 4️⃣ محرر أكواد (VS Code موصى به)

```bash
# حمّل VS Code من: https://code.visualstudio.com/

# ثبّت الإضافات الموصى بها:
# - ESLint
# - Tailwind CSS IntelliSense
# - TypeScript Vue Plugin (Volar)
# - Prettier
# - GitLens
```

---

## 🚀 الطريقة الأولى: استنساخ المشروع الجاهز

### 1️⃣ استنساخ المستودع

```bash
git clone https://github.com/EngKHALIDx/Frontend-Developer-web.git
cd Frontend-Developer-web
```

### 2️⃣ إعداد الواجهة الأمامية (Frontend)

```bash
# الانتقال لمجلد الواجهة الأمامية
cd "Frontend Developer"

# تثبيت الحزم
npm install
# أو
bun install

# تشغيل خادم التطوير
npm run dev
# أو
bun run dev
```

الواجهة الأمامية ستعمل على: `http://localhost:3000`

### 3️⃣ إعداد الخادم الخلفي (Backend)

```bash
# في نافذة طرفية جديدة
cd Backend

# تثبيت الحزم
npm install

# تشغيل الخادم
npm run dev
# أو
npm start
```

الخادم الخلفي سيعمل على: `http://localhost:3001`

---

## 🔨 الطريقة الثانية: بناء المشروع من الصفر بالكامل

إذا أردت فهم كيف بُني المشروع من البداية، اتبع الخطوات التالية:

### 1️⃣ إنشاء مشروع Next.js جديد

```bash
# إنشاء مشروع Next.js جديد
npx create-next-app@latest monoverse-frontend --typescript --tailwind --app --src-dir --import-alias "@/*"

cd monoverse-frontend
```

### 2️⃣ تثبيت shadcn/ui (مكتبة المكونات)

```bash
# تهيئة shadcn/ui
npx shadcn@latest init

# تثبيت المكونات المستخدمة في المشروع
npx shadcn@latest add button card input label select dialog sheet tabs accordion
npx shadcn@latest add badge avatar progress skeleton scroll-area separator
npx shadcn@latest add tooltip toast sonner dropdown-menu hover-card
npx shadcn@latest add checkbox radio-group switch slider textarea
npx shadcn@latest add table pagination breadcrumb navigation-menu
npx shadcn@latest add alert alert-dialog popover command calendar
npx shadcn@latest add carousel aspect-ratio chart collapsible toggle
```

### 3️⃣ تثبيت الحزم الإضافية

```bash
# إدارة الحالة
npm install zustand @tanstack/react-query @tanstack/react-table

# الرسوم البيانية
npm install recharts

# الحركات
npm install framer-motion

# الثيم
npm install next-themes

# النماذج
npm install react-hook-form @hookform/resolvers zod

# الأيقونات
npm install lucide-react

# أدوات مساعدة
npm install clsx tailwind-merge class-variance-authority
npm install date-fns uuid

# Prisma (قاعدة البيانات)
npm install prisma @prisma/client
npx prisma init
```

### 4️⃣ إعداد بنية المجلدات

```bash
# إنشاء بنية المجلدات
mkdir -p src/components/{ui,layout,sections,shared,theme}
mkdir -p src/hooks
mkdir -p src/lib
mkdir -p src/types
mkdir -p src/app/api/{dashboard,products,orders,users,vendor,customer}
mkdir -p public/screenshots
```

### 5️⃣ إعداد Tailwind CSS

أنشئ ملف `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... بقية الألوان
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
```

### 6️⃣ إعداد TypeScript

ملف `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 7️⃣ إنشاء خادم Express.js (Backend)

```bash
# إنشاء مجلد Backend
mkdir -p Backend/src/{routes,data}
cd Backend

# تهيئة مشروع Node.js
npm init -y

# تثبيت Express
npm install express cors
npm install -D nodemon

# إنشاء ملف server.js
touch src/server.js
```

### 8️⃣ إعداد Prisma (قاعدة البيانات)

```bash
# تهيئة Prisma
npx prisma init --datasource-provider sqlite

# تعديل ملف prisma/schema.prisma
# (راجع الملف الموجود في المشروع)

# تطبيق الـ schema
npx prisma db push

# توليد Prisma Client
npx prisma generate
```

---

## 📦 بنية المشروع النهائية

بعد اتباع الخطوات السابقة، ستحصل على:

```
Frontend-Developer-web/
│
├── 📂 Frontend Developer/
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/              # 6 API Routes
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── ui/               # 40+ مكون shadcn/ui
│   │   │   ├── layout/           # Navbar, Footer
│   │   │   ├── sections/         # 7 أقسام رئيسية
│   │   │   ├── shared/           # مكونات مشتركة
│   │   │   └── theme/            # Theme providers
│   │   ├── hooks/                # Custom hooks
│   │   ├── lib/                  # المساعدات
│   │   └── types/                # TypeScript types
│   ├── public/
│   ├── package.json
│   └── ...config files
│
├── 📂 Backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/               # 6 API routes
│   │   └── data/
│   ├── prisma/
│   ├── package.json
│   └── README.md
│
└── package.json                  # Workspace root
```

---

## 🧪 التحقق من التثبيت

بعد إعداد كل شيء، تحقق من أن كل شيء يعمل:

```bash
# 1. تحقق من إصدارات الأدوات
node --version       # v18+
npm --version        # 9+
git --version        # أي إصدار

# 2. تحقق من تشغيل الواجهة الأمامية
cd "Frontend Developer"
npm run dev
# افتح http://localhost:3000

# 3. تحقق من تشغيل الخادم الخلفي
cd Backend
npm run dev
# افتح http://localhost:3001/health

# 4. تحقق من جودة الكود
cd "Frontend Developer"
npm run lint
```

---

## 🔧 حل المشاكل الشائعة

### المشكلة: Port 3000 مستخدم

```bash
# ابحث عن العملية المستخدمة للمنفذ
lsof -i :3000        # macOS/Linux
netstat -ano | findstr :3000   # Windows

# اقتل العملية
kill -9 <PID>
```

### المشكلة: فشل تثبيت الحزم

```bash
# امسح cache
npm cache clean --force

# احذف node_modules وأعد التثبيت
rm -rf node_modules package-lock.json
npm install
```

### المشكلة: أخطاء TypeScript

```bash
# تحقق من الأنواع
npx tsc --noEmit

# أعد توليد ملفات Next.js
rm -rf .next
npm run dev
```

---

## 📚 مصادر التعلم

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/docs)

---

## ✅ قائمة التحقق النهائية

- [ ] Node.js 18+ مثبت
- [ ] npm/bun مثبت
- [ ] Git مثبت
- [ ] VS Code مع الإضافات الموصى بها
- [ ] تم استنساخ المشروع
- [ ] تم تثبيت حزم Frontend
- [ ] تم تثبيت حزم Backend
- [ ] الواجهة الأمامية تعمل على المنفذ 3000
- [ ] الخادم الخلفي يعمل على المنفذ 3001
- [ ] لا توجد أخطاء في `npm run lint`

---

بعد إكمال جميع الخطوات، سيكون المشروع جاهزاً للعمل على جهازك! 🎉
