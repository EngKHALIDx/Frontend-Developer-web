/**
 * Type Definitions for the Frontend Developer Portfolio Platform
 * Centralized type definitions used across all applications in the monorepo.
 */

// ===== User Management Types =====
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
  joinedAt: string;
}

export type UserRole = 'admin' | 'manager' | 'vendor' | 'customer' | 'viewer';

// ===== Product / E-Commerce Types =====
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  category: ProductCategory;
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  vendor: string;
}

export type ProductCategory =
  | 'electronics'
  | 'fashion'
  | 'home'
  | 'books'
  | 'sports'
  | 'beauty';

// ===== Order Management Types =====
export interface Order {
  id: string;
  customer: string;
  customerEmail: string;
  product: string;
  amount: number;
  currency: string;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: string;
  shippingAddress: string;
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

// ===== Analytics & Dashboard Types =====
export interface DashboardStat {
  id: string;
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  format: 'number' | 'currency' | 'percentage';
  icon: string;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  orders: number;
  target: number;
}

export interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  color: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'create' | 'update' | 'delete' | 'login' | 'logout';
}

// ===== Vendor Portal Types =====
export interface VendorStats {
  totalSales: number;
  activeProducts: number;
  pendingOrders: number;
  customerRating: number;
  monthlyGrowth: number;
}

export interface VendorProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  sales: number;
  status: 'active' | 'paused' | 'draft';
}

// ===== Customer Portal Types =====
export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  points: number;
  totalOrders: number;
  totalSpent: number;
  joinedAt: string;
}

export interface CustomerOrder {
  id: string;
  date: string;
  items: number;
  total: number;
  status: OrderStatus;
  products: { name: string; qty: number; price: number }[];
}

// ===== Component Library Showcase Types =====
export interface ComponentShowcaseItem {
  id: string;
  name: string;
  description: string;
  category: 'form' | 'display' | 'feedback' | 'navigation' | 'overlay';
  props: string[];
  accessibilityScore: number;
}

// ===== API Response Types =====
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  meta?: {
    page: number;
    pageSize: number;
    total: number;
  };
}

// ===== Navigation Types =====
export interface NavItem {
  id: string;
  label: string;
  labelEn: string;
  icon: string;
  description: string;
}

// ===== Tech Stack Types =====
export interface TechSkill {
  name: string;
  category: 'core' | 'styling' | 'state' | 'build' | 'testing' | 'tools';
  proficiency: number;
  yearsOfExperience: number;
  description: string;
}
