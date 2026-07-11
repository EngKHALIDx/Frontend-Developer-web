/**
 * Custom hooks for data fetching using TanStack Query.
 * Demonstrates server state management patterns with caching, retries, and optimistic updates.
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type {
  User,
  Product,
  Order,
  DashboardStat,
  RevenueDataPoint,
  TrafficSource,
  ActivityLog,
  VendorStats,
  VendorProduct,
  CustomerProfile,
  CustomerOrder,
} from '@/types';

// ===== Query Keys =====
export const queryKeys = {
  dashboard: ['dashboard'] as const,
  products: (filters?: Record<string, string>) => ['products', filters] as const,
  orders: (status?: string) => ['orders', status] as const,
  users: ['users'] as const,
  vendor: ['vendor'] as const,
  customer: ['customer'] as const,
};

// ===== Dashboard =====
interface DashboardData {
  stats: DashboardStat[];
  revenue: RevenueDataPoint[];
  traffic: TrafficSource[];
  activity: ActivityLog[];
}

export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: queryKeys.dashboard,
    queryFn: () => api.get<DashboardData>('/api/dashboard'),
    staleTime: 60_000,
    refetchInterval: 30_000,
  });
}

// ===== Products =====
export function useProducts(filters?: Record<string, string>) {
  return useQuery<Product[]>({
    queryKey: queryKeys.products(filters),
    queryFn: () => {
      const params = new URLSearchParams(filters);
      const query = params.toString();
      return api.get<Product[]>(`/api/products${query ? `?${query}` : ''}`);
    },
    staleTime: 30_000,
  });
}

// ===== Orders =====
export function useOrders(status?: string) {
  return useQuery<Order[]>({
    queryKey: queryKeys.orders(status),
    queryFn: () => api.get<Order[]>(`/api/orders${status ? `?status=${status}` : ''}`),
    staleTime: 20_000,
  });
}

// ===== Users =====
export function useUsers() {
  return useQuery<User[]>({
    queryKey: queryKeys.users,
    queryFn: () => api.get<User[]>('/api/users'),
    staleTime: 60_000,
  });
}

// ===== Vendor =====
interface VendorData {
  stats: VendorStats;
  products: VendorProduct[];
  pendingOrders: Order[];
}

export function useVendor() {
  return useQuery<VendorData>({
    queryKey: queryKeys.vendor,
    queryFn: () => api.get<VendorData>('/api/vendor'),
    staleTime: 30_000,
  });
}

// ===== Customer =====
interface CustomerData {
  profile: CustomerProfile;
  orders: CustomerOrder[];
}

export function useCustomer() {
  return useQuery<CustomerData>({
    queryKey: queryKeys.customer,
    queryFn: () => api.get<CustomerData>('/api/customer'),
    staleTime: 30_000,
  });
}

// ===== Mutations (for CRUD demos) =====
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Order['status'] }) =>
      api.patch<{ id: string; status: string }>(`/api/orders/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
