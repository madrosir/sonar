import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (typeof query !== 'string') {
    return NextResponse.json({ error: 'Query must be a string' }, { status: 400 });
  }

  try {
    const users = await db.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error in getSearch:", error);
    return NextResponse.json({ error: 'An error occurred while searching' }, { status: 500 });
  }
}