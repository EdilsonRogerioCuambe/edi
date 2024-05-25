import { NextResponse } from 'next/server'
import slugify from 'slugify'
import prisma from '@/db/prisma'

export async function POST(request: Request) {
  try {
    const { name } = await request.json()
    const slug = slugify(name, { lower: true, strict: true })

    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }

    const tag = await prisma.tag.create({ data: { name, slug } })

    return NextResponse.json(tag)
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Internal server error', { status: 500 })
  }
}

export async function GET() {
  try {
    const tags = await prisma.tag.findMany()

    return NextResponse.json(tags)
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Internal server error', { status: 500 })
  }
}
