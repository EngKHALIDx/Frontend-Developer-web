/**
 * GET /api/customer
 * Returns customer portal data including profile and order history.
 */
import { NextResponse } from 'next/server';
import { mockCustomerProfile, mockCustomerOrders } from '@/lib/mock-data';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json({
    data: {
      profile: mockCustomerProfile,
      orders: mockCustomerOrders,
    },
    success: true,
    message: 'Customer data retrieved successfully',
  });
}
