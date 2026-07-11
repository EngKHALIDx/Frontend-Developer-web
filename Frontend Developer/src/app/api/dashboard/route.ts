/**
 * GET /api/dashboard
 * Returns aggregated dashboard statistics for the admin panel.
 */
import { NextResponse } from 'next/server';
import {
  mockDashboardStats,
  mockRevenueData,
  mockTrafficSources,
  mockActivityLog,
} from '@/lib/mock-data';

export async function GET() {
  // Simulate network delay for realistic loading states
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json({
    data: {
      stats: mockDashboardStats,
      revenue: mockRevenueData,
      traffic: mockTrafficSources,
      activity: mockActivityLog,
    },
    success: true,
    message: 'Dashboard data retrieved successfully',
  });
}
