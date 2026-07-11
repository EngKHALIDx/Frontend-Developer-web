/**
 * GET /api/users
 * Returns all registered users.
 */
import { NextResponse } from 'next/server';
import { mockUsers } from '@/lib/mock-data';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return NextResponse.json({
    data: mockUsers,
    success: true,
    message: 'Users retrieved successfully',
    meta: { page: 1, pageSize: mockUsers.length, total: mockUsers.length },
  });
}
