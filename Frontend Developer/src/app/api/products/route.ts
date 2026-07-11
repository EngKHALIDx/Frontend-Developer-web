/**
 * GET /api/products
 * Returns product catalog with optional filtering by category and search query.
 * Supports pagination via ?page=&pageSize= query parameters.
 */
import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search')?.toLowerCase();
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '20');

  await new Promise((resolve) => setTimeout(resolve, 250));

  let filtered = [...mockProducts];

  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.tags.some((t) => t.toLowerCase().includes(search))
    );
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return NextResponse.json({
    data: paginated,
    success: true,
    message: 'Products retrieved successfully',
    meta: { page, pageSize, total },
  });
}
