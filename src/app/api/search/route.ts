import prisma from '@/db/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 },
      )
    }

    const blogs = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
        ],
      },
    })

    return NextResponse.json(blogs)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new Response('Internal Server Error', { status: 500 })
    }
    return new Response('Internal Server Error', { status: 500 })
  }
}
