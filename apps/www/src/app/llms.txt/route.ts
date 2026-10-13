import { NextResponse } from 'next/server';
import { buildLlmsText } from '@/lib/llms';

export const revalidate = 3600;

export async function GET() {
  try {
    return new NextResponse(buildLlmsText(), {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating llms.txt:', error);
    return new NextResponse('Internal Server Error while generating llms.txt.', { status: 500 });
  }
}
