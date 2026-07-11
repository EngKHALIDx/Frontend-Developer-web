# 🚀 مونو فيرس | منصة مطور الواجهات الأمامية

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Express](https://img.shields.io/badge/Express-4.x-black?style=for-the-badge&logo=express)
![Monorepo](https://img.shields.io/badge/Architecture-Monorepo-orange?style=for-the-badge)

**منصة Monorepo متكاملة - Frontend (Next.js) + Backend (Express.js)**

</div>

---

## 📸 لقطات من الموقع

### 🏠 الصفحة الرئيسية
![الصفحة الرئيسية](Frontend%20Developer/public/screenshots/01-home.png)

### 📊 لوحة التحكم الإدارية
![لوحة التحكم](Frontend%20Developer/public/screenshots/02-admin-dashboard.png)

### 🛒 متجر المستخدم
![متجر المستخدم](Frontend%20Developer/public/screenshots/03-user-store.png)

### 🏪 بوابة البائعين
![بوابة البائعين](Frontend%20Developer/public/screenshots/04-vendor-portal.png)

### 👤 بوابة العملاء
![بوابة العملاء](Frontend%20Developer/public/screenshots/05-customer-portal.png)

### 📚 مكتبة المكونات
![مكتبة المكونات](Frontend%20Developer/public/screenshots/06-component-library.png)

### 🛠️ التقنيات والمهارات
![التقنيات](Frontend%20Developer/public/screenshots/07-tech-stack.png)

### 🌙 الوضع الداكن
![الوضع الداكن](Frontend%20Developer/public/screenshots/08-dark-mode.png)

---

## 📋 نظرة عامة

منصة **مونو فيرس** هي مشروع احترافي متكامل بأسلوب **Monorepo** يجمع الواجهة الأمامية (Frontend) والخادم (Backend) في مشروع واحد منظم، صُمم لعرض مهارات مطور الواجهات الأمامية بشكل عملي وشامل.

## 📁 بنية المشروع

```
Frontend-Developer-web/
│
├── 📂 Frontend Developer/          # الواجهة الأمامية (Next.js)
│   ├── src/
│   │   ├── app/                    # Next.js App Router + API Routes
│   │   ├── components/             # 50+ مكون (UI, Layout, Sections, Shared, Theme)
│   │   ├── hooks/                  # Custom Hooks
│   │   ├── lib/                    # المساعدات والأدوات
│   │   └── types/                  # TypeScript Types
│   ├── public/                     # الصور والملفات العامة
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── eslint.config.mjs
│
├── 📂 Backend/                     # الخادم (Express.js)
│   ├── src/
│   │   ├── server.js               # نقطة الدخول للخادم
│   │   ├── routes/                 # مسارات API (6 routes)
│   │   └── data/                   # البيانات
│   ├── prisma/
│   │   └── schema.prisma           # مخطط قاعدة البيانات
│   ├── package.json
│   └── README.md
│
├── 📄 README.md                    # هذا الملف
├── 📄 package.json                 # Workspace root
└── 📄 .gitignore
```

## 🎯 التطبيقات المترابطة

المشروع يحتوي على **4 تطبيقات** في منصة واحدة + قسمين إضافيين:

| # | التطبيق | الوصف |
|---|---------|--------|
| 1️⃣ | **لوحة التحكم الإدارية** | إحصائيات حية، رسوم بيانية تفاعلية، جداول بيانات، سجل نشاط |
| 2️⃣ | **متجر المستخدم الرئيسي** | كتالوج منتجات، بحث وتصفية، سلة تسوق تفاعلية كاملة |
| 3️⃣ | **بوابة البائعين** | إدارة المنتجات، تتبع المبيعات، الطلبات المعلقة |
| 4️⃣ | **بوابة العملاء** | ملف شخصي، برنامج ولاء، سجل الطلبات |
| 📚 | **مكتبة المكونات** | عرض المكونات القابلة لإعادة الاستخدام |
| 🛠️ | **التقنيات والمهارات** | عرض التقنيات المستخدمة مع مستوى الإتقان |

## ✨ الميزات

### 🏗️ البنية المعمارية
- ✅ **بنية Monorepo** احترافية مع فصل Frontend / Backend
- ✅ **Express.js** خادم خلفي مستقل
- ✅ **Next.js** مع API Routes للواجهة الأمامية
- ✅ **Design System** موحد مع مكتبة مكونات

### 🎨 واجهة المستخدم
- ✅ **تصميم متجاوب 100%** (Mobile-first approach)
- ✅ **دعم كامل للوضع الداكن** (Dark Mode)
- ✅ **دعم RTL** كامل للغة العربية
- ✅ **حركات وانتقالات** سلسة باستخدام Framer Motion

### 🔌 تكامل البيانات
- ✅ **6 REST API Routes** في Next.js
- ✅ **6 API Endpoints** في Express.js Backend
- ✅ **TanStack Query** لإدارة حالة الخادم
- ✅ **Zustand** لإدارة حالة العميل

### ♿ إمكانية الوصول (Accessibility)
- ✅ **WCAG 2.1 AA** compliant
- ✅ **Semantic HTML** و ARIA labels
- ✅ **دعم لوحة المفاتيح** الكامل
- ✅ **Screen Reader** support

## 🛠️ التقنيات المستخدمة

### Frontend (Frontend Developer/)
- **[Next.js 16](https://nextjs.org/)** - إطار العمل (App Router)
- **[React 19](https://react.dev/)** - مكتبة الواجهات
- **[TypeScript 5](https://www.typescriptlang.org/)**
- **[Tailwind CSS 4](https://tailwindcss.com/)** + **[shadcn/ui](https://ui.shadcn.com/)**
- **[TanStack Query](https://tanstack.com/query)** + **[Zustand](https://github.com/pmndrs/zustand)**
- **[Recharts](https://recharts.org/)** + **[Framer Motion](https://www.framer.com/motion/)**

### Backend (Backend/)
- **[Express.js 4](https://expressjs.com/)** - إطار الخادم
- **[Node.js](https://nodejs.org/)** - بيئة التشغيل
- **[Prisma ORM](https://www.prisma.io/)** - ORM لقاعدة البيانات
- **[CORS](https://github.com/expressjs/cors)** - مشاركة المصادر

## 🚀 التثبيت والتشغيل

### المتطلبات
- Node.js 18+
- npm أو yarn أو bun

### 1️⃣ استنساخ المستودع
```bash
git clone https://github.com/EngKHALIDx/Frontend-Developer-web.git
cd Frontend-Developer-web
```

### 2️⃣ تثبيت حزم الواجهة الأمامية
```bash
cd "Frontend Developer"
npm install
```

### 3️⃣ تشغيل الواجهة الأمامية
```bash
# من مجلد Frontend Developer
npm run dev
# أو من الجذر
cd ..
npm run dev
```
الواجهة الأمامية ستعمل على: `http://localhost:3000`

### 4️⃣ (اختياري) تشغيل الخادم الخلفي
```bash
cd Backend
npm install
npm run dev
```
الخادم الخلفي سيعمل على: `http://localhost:3001`

### 5️⃣ تشغيل كلاهما معاً (من الجذر)
```bash
npm run dev:all
```

## 📊 نقاط النهاية (API Endpoints)

### Next.js API Routes (Frontend)
| Method | Endpoint | الوصف |
|--------|----------|--------|
| `GET` | `/api/dashboard` | إحصائيات لوحة التحكم |
| `GET` | `/api/products` | قائمة المنتجات |
| `GET` | `/api/orders` | قائمة الطلبات |
| `GET` | `/api/users` | قائمة المستخدمين |
| `GET` | `/api/vendor` | بيانات البائعين |
| `GET` | `/api/customer` | بيانات العملاء |

### Express.js Backend API
| Method | Endpoint | الوصف |
|--------|----------|--------|
| `GET` | `/api/dashboard` | إحصائيات لوحة التحكم |
| `GET` | `/api/products` | قائمة المنتجات (CRUD كامل) |
| `GET` | `/api/orders` | قائمة الطلبات + تحديث الحالة |
| `GET` | `/api/users` | قائمة المستخدمين |
| `GET` | `/api/vendor` | بيانات البائعين |
| `GET` | `/api/customer` | بيانات العملاء |
| `GET` | `/health` | فحص صحة الخادم |

راجع [Backend/README.md](Backend/README.md) للتفاصيل الكاملة.

## 📱 الاستجابة (Responsive)

| Breakpoint | العرض | الوصف |
|------------|-------|--------|
| `mobile` | < 640px | تصميم Mobile-first |
| `sm` | ≥ 640px | أجهزة لوحية صغيرة |
| `md` | ≥ 768px | أجهزة لوحية |
| `lg` | ≥ 1024px | لابتوب |
| `xl` | ≥ 1280px | شاشات كبيرة |

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT.

## 👨‍💻 المطور

**خالد** - Frontend Developer

- GitHub: [@EngKHALIDx](https://github.com/EngKHALIDx)

---

<div align="center">

**صُنع بـ ❤️ باستخدام React و TypeScript و Tailwind CSS و Express.js**

</div>
