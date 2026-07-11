/**
 * GET /api/vendor
 * Returns vendor portal data including stats and products.
 */
import { NextResponse } from 'next/server';
import { mockVendorStats, mockVendorProducts, mockOrders } from '@/lib/mock-data';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const pendingOrders = mockOrders.filter(
    (o) => o.status === 'pending' || o.status === 'processing'
  );

  return NextResponse.json({
    data: {
      stats: mockVendorStats,
      products: mockVendorProducts,
      pendingOrders,
    },
    success: true,
    message: 'Vendor data retrieved successfully',
  });
}
