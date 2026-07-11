'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button as UiButton } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Heart,
  Share2,
  Download,
  Star,
  Info,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  Lock,
  Eye,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/shared/section-heading';

const componentCategories = [
  {
    id: 'form',
    label: 'مكونات النماذج',
    components: ['Button', 'Input', 'Switch', 'Checkbox', 'RadioGroup', 'Slider', 'Label'],
  },
  {
    id: 'display',
    label: 'مكونات العرض',
    components: ['Badge', 'Progress', 'Avatar', 'Card', 'Tabs'],
  },
  {
    id: 'feedback',
    label: 'مكونات التغذية الراجعة',
    components: ['Tooltip', 'Toast', 'Alert', 'Skeleton', 'Spinner'],
  },
];

export function ComponentLibrary() {
  const [switchOn, setSwitchOn] = React.useState(true);
  const [checkbox, setCheckbox] = React.useState(true);
  const [radio, setRadio] = React.useState('option-1');
  const [slider, setSlider] = React.useState([60]);
  const [progress, setProgress] = React.useState(68);

  return (
    <section className="container mx-auto px-4 py-12 sm:px-6" aria-labelledby="components-heading">
      <SectionHeading
        badge="Reusable Library"
        title="مكتبة المكونات القابلة لإعادة الاستخدام"
        subtitle="مجموعة من المكونات الموحدة والمبنية بأسلوب Design System، تدعم الوضع الداكن، إمكانية الوصول WCAG، والتصميم المتجاوب."
      />

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Buttons Showcase */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">الأزرار (Button)</CardTitle>
            <CardDescription>متغيرات وأحجام مختلفة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <UiButton>افتراضي</UiButton>
              <UiButton variant="secondary">ثانوي</UiButton>
              <UiButton variant="outline">حدودي</UiButton>
              <UiButton variant="ghost">شبحي</UiButton>
              <UiButton variant="destructive">حذف</UiButton>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <UiButton size="sm">صغير</UiButton>
              <UiButton size="default">متوسط</UiButton>
              <UiButton size="lg">كبير</UiButton>
              <UiButton size="icon" aria-label="مفضلة">
                <Heart className="h-4 w-4" />
              </UiButton>
            </div>
            <div className="flex flex-wrap gap-2">
              <UiButton className="gap-1.5">
                <Download className="h-4 w-4" />
                تحميل
              </UiButton>
              <UiButton variant="outline" className="gap-1.5">
                <Share2 className="h-4 w-4" />
                مشاركة
              </UiButton>
              <UiButton disabled className="gap-1.5">
                <Loader2 className="h-4 w-4 animate-spin" />
                جاري...
              </UiButton>
            </div>
          </CardContent>
        </Card>

        {/* Form Inputs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">الحقول (Inputs)</CardTitle>
            <CardDescription>مدخلات النماذج المختلفة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="demo-email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="demo-email" type="email" placeholder="you@example.com" className="pr-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="demo-password" type="password" placeholder="••••••••" className="pr-10" />
                <button className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="demo-switch" className="cursor-pointer">
                تفعيل الإشعارات
              </Label>
              <Switch id="demo-switch" checked={switchOn} onCheckedChange={setSwitchOn} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="demo-check" checked={checkbox} onCheckedChange={(v) => setCheckbox(v === true)} />
              <Label htmlFor="demo-check" className="cursor-pointer text-sm">
                أوافق على الشروط والأحكام
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Badges & Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">الشارات والتقدم</CardTitle>
            <CardDescription>عرض الحالات والمؤشرات</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>افتراضي</Badge>
              <Badge variant="secondary">ثانوي</Badge>
              <Badge variant="outline">حدودي</Badge>
              <Badge variant="destructive">خطأ</Badge>
              <Badge className="gap-1 bg-emerald-500 hover:bg-emerald-500">
                <CheckCircle2 className="h-3 w-3" />
                نجاح
              </Badge>
              <Badge className="gap-1 bg-amber-500 hover:bg-amber-500">
                <AlertCircle className="h-3 w-3" />
                تحذير
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">تقدم المشروع</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div className="space-y-2">
              <Label>مستوى الصوت: {slider[0]}%</Label>
              <Slider value={slider} onValueChange={setSlider} max={100} step={1} />
            </div>
            <RadioGroup value={radio} onValueChange={setRadio}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="option-1" id="r1" />
                <Label htmlFor="r1" className="cursor-pointer">الخيار الأول</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="option-2" id="r2" />
                <Label htmlFor="r2" className="cursor-pointer">الخيار الثاني</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="option-3" id="r3" />
                <Label htmlFor="r3" className="cursor-pointer">الخيار الثالث</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Avatars & Rating */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">الصور الرمزية والتقييم</CardTitle>
            <CardDescription>مكونات العرض الشخصي</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-emerald-500/10 text-emerald-600">ع</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-blue-500/10 text-blue-600">س</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-purple-500/10 text-purple-600">م</AvatarFallback>
              </Avatar>
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {['A', 'B', 'C', 'D'].map((c, i) => (
                  <Avatar key={c} className="h-8 w-8 border-2 border-background">
                    <AvatarFallback
                      className="text-xs"
                      style={{
                        backgroundColor: `hsl(${i * 90}, 60%, 90%)`,
                        color: `hsl(${i * 90}, 60%, 30%)`,
                      }}
                    >
                      {c}
                    </AvatarFallback>
                  </Avatar>
                ))}
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                  +5
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={star <= 4 ? 'h-5 w-5 fill-amber-400 text-amber-400' : 'h-5 w-5 text-muted-foreground'}
                  />
                ))}
                <span className="mr-2 text-sm font-medium">4.0</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={star <= 5 ? 'h-4 w-4 fill-amber-400 text-amber-400' : 'h-4 w-4 text-muted-foreground'}
                  />
                ))}
                <span className="mr-2 text-sm font-medium">5.0 ممتاز</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">التبويبات (Tabs)</CardTitle>
            <CardDescription>تنظيم المحتوى في تبويبات</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">الحساب</TabsTrigger>
                <TabsTrigger value="password">الأمان</TabsTrigger>
                <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="mt-3 space-y-2">
                <p className="text-sm text-muted-foreground">
                  إدارة معلومات حسابك الشخصي وتفضيلاتك.
                </p>
                <UiButton size="sm" variant="outline">تعديل الحساب</UiButton>
              </TabsContent>
              <TabsContent value="password" className="mt-3 space-y-2">
                <p className="text-sm text-muted-foreground">
                  تغيير كلمة المرور وإعدادات الأمان.
                </p>
                <UiButton size="sm" variant="outline">تغيير كلمة المرور</UiButton>
              </TabsContent>
              <TabsContent value="notifications" className="mt-3 space-y-2">
                <p className="text-sm text-muted-foreground">
                  تحكم في الإشعارات التي تستقبلها.
                </p>
                <UiButton size="sm" variant="outline">إدارة الإشعارات</UiButton>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Tooltips & Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">التلميحات والتغذية الراجعة</CardTitle>
            <CardDescription>عناصر تفاعلية لتجربة أفضل</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <TooltipProvider>
              <div className="flex flex-wrap gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <UiButton variant="outline" size="icon">
                      <Info className="h-4 w-4" />
                    </UiButton>
                  </TooltipTrigger>
                  <TooltipContent>معلومة إضافية هنا</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <UiButton variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </UiButton>
                  </TooltipTrigger>
                  <TooltipContent>إضافة للمفضلة</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <UiButton variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </UiButton>
                  </TooltipTrigger>
                  <TooltipContent>مشاركة</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
            <div className="space-y-2">
              <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>تم حفظ التغييرات بنجاح</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
                <span>يرجى مراجعة الحقول المطلوبة</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>حدث خطأ، حاول مرة أخرى</span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border p-3 text-sm">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              <span className="text-muted-foreground">جاري التحميل...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
