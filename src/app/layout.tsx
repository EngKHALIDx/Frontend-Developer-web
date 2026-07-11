import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryProvider } from "@/components/theme/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "مونو فيرس | منصة مطور الواجهات الأمامية",
  description:
    "منصة Monorepo متكاملة تضم لوحة تحكم إدارية، متجر للمستخدمين، وبوابتين مترابطتين. مبنية بـ React، TypeScript، Tailwind CSS.",
  keywords: [
    "Frontend Developer",
    "React",
    "Vue.js",
    "TypeScript",
    "Tailwind CSS",
    "Monorepo",
    "مطور واجهات أمامية",
  ],
  authors: [{ name: "Frontend Developer" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "مونو فيرس | منصة مطور الواجهات الأمامية",
    description: "منصة Monorepo متكاملة بمكونات قابلة لإعادة الاستخدام",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster />
            <SonnerToaster position="top-center" richColors />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
