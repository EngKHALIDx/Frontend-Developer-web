/**
 * GET /api/orders
 * Returns all orders with optional status filtering.
 */
import { NextRequest, NextResponse } from 'next/server';
import { mockOrders } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  await new Promise((resolve) => setTimeout(resolve, 250));

  let filtered = [...mockOrders];
  if (status && status !== 'all') {
    filtered = filtered.filter((o) => o.status === status);
  }

  return NextResponse.json({
    data: filtered,
    success: true,
    message: 'Orders retrieved successfully',
    meta: { page: 1, pageSize: filtered.length, total: filtered.length },
  });
}
