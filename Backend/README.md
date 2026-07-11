# 🔧 MonoVerse Backend API

<div align="center">

![Express](https://img.shields.io/badge/Express-4.x-black?style=for-the-badge&logo=express)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![REST API](https://img.shields.io/badge/REST-API-orange?style=for-the-badge)

**خادم REST API مستقل لمنصة مونو فيرس**

</div>

---

## 📋 نظرة عامة

خادم خلفي (Backend) مبني بـ **Express.js** يوفر REST APIs كاملة لمنصة مونو فيرس. يتعامل مع البيانات، المصادقة، وإدارة المنطق البرمجي للتطبيقات الأربعة المترابطة.

## 🚀 التشغيل

### المتطلبات
- Node.js 18+
- npm أو yarn

### التثبيت والتشغيل

```bash
# تثبيت الحزم
npm install

# تشغيل خادم التطوير (مع إعادة تشغيل تلقائية)
npm run dev

# أو تشغيل الخادم العادي
npm start
```

الخادم سيعمل على: `http://localhost:3001`

## 📊 نقاط النهاية (API Endpoints)

### 📊 لوحة التحكم
| Method | Endpoint | الوصف |
|--------|----------|--------|
| `GET` | `/api/dashboard` | إحصائيات وبيانات لوحة التحكم |

### 🛒 المنتجات
| Method | Endpoint | الوصف |
|--------|----------|--------|
| `GET` | `/api/products` | قائمة المنتجات (مع تصفية وبحث) |
| `GET` | `/api/products/:id` | منتج واحد |
| `POST` | `/api/products` | إنشاء منتج جديد |
| `PUT` | `/api/products/:id` | تحديث منتج |
| `DELETE` | `/api/products/:id` | حذف منتج |

### 📦 الطلبات
| Method | Endpoint | الوصف |
|--------|----------|--------|
| `GET` | `/api/orders` | قائمة الطلبات (مع تصفية بالحالة) |
| `GET` | `/api/orders/:id` | طلب واحد |
| `PATCH` | `/api/orders/:id/status` | تحديث حالة الطلب |

### 👥 المستخدمين
| Method | Endpoint | الوصف |
|--------|----------|--------|
| `GET` | `/api/users` | قائمة المستخدمين |
| `GET` | `/api/users/:id` | مستخدم واحد |

### 🏪 البائعين
| Method | Endpoint | الوصف |
|--------|----------|--------|
| `GET` | `/api/vendor` | بيانات بوابة البائعين |

### 👤 العملاء
| Method | Endpoint | الوصف |
|--------|----------|--------|
| `GET` | `/api/customer` | بيانات بوابة العملاء |

### أدوات مساعدة
| Method | Endpoint | الوصف |
|--------|----------|--------|
| `GET` | `/health` | فحص صحة الخادم |
| `GET` | `/` | معلومات الـ API |

## 📝 معاملات الاستعلام

### تصفية المنتجات
```
GET /api/products?category=electronics&search=سماعات&page=1&pageSize=20
```

| المعامل | النوع | الوصف |
|---------|------|--------|
| `category` | string | الفئة (electronics, fashion, home, books, sports, beauty) |
| `search` | string | نص البحث (في الاسم، الوصف، الوسوم) |
| `page` | number | رقم الصفحة (افتراضي: 1) |
| `pageSize` | number | حجم الصفحة (افتراضي: 20) |

### تصفية الطلبات
```
GET /api/orders?status=delivered
```

| المعامل | النوع | الوصف |
|---------|------|--------|
| `status` | string | الحالة (pending, processing, shipped, delivered, cancelled, refunded) |

## 📦 استجابة API

جميع الاستجابات تتبع نفس الهيكل:

```json
{
  "success": true,
  "message": "Description of the result",
  "data": { ... },
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 100
  }
}
```

### مثال استجابة خطأ
```json
{
  "success": false,
  "message": "Product not found"
}
```

## 🗄️ قاعدة البيانات

يستخدم المشروع **Prisma ORM** مع SQLite. ملف الـ schema موجود في:
```
Backend/prisma/schema.prisma
```

### أوامر Prisma
```bash
# تطبيق الـ schema على قاعدة البيانات
npx prisma db push

# توليد Prisma Client
npx prisma generate

# إنشاء migration
npx prisma migrate dev
```

## 📁 بنية المجلدات

```
Backend/
├── src/
│   ├── server.js              # نقطة الدخول للخادم
│   ├── routes/                # مسارات API
│   │   ├── dashboard.js       # مسار لوحة التحكم
│   │   ├── products.js        # مسار المنتجات (CRUD)
│   │   ├── orders.js          # مسار الطلبات
│   │   ├── users.js           # مسار المستخدمين
│   │   ├── vendor.js          # مسار البائعين
│   │   └── customer.js        # مسار العملاء
│   └── data/
│       └── mock-data.js       # البيانات التجريبية
├── prisma/
│   └── schema.prisma          # مخطط قاعدة البيانات
├── package.json
└── README.md
```

## 🔐 الأمان

- ✅ **CORS** مُفعّل للواجهة الأمامية فقط
- ✅ **JSON Parser** للتعامل مع الطلبات
- ✅ معالجة الأخطاء المركزية
- ✅ التحقق من المدخلات

## 🧪 الاختبار

```bash
# تشغيل الاختبارات
npm test

# فحص الـ API يدوياً
curl http://localhost:3001/health
curl http://localhost:3001/api/dashboard
curl http://localhost:3001/api/products?category=electronics
```

## 📄 الترخيص

MIT License
