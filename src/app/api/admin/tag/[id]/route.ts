import { NextResponse } from 'next/server'
import slugify from 'slugify'
import prisma from '@/db/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const values = await request.json()
    const { id } = params

    if (!values.name) {
      return new NextResponse('Name is required', { status: 400 })
    }

    const tag = await prisma.tag.findUnique({ where: { id } })

    if (!tag) {
      return new NextResponse('Tag not found', { status: 404 })
    }

    const updatedTag = await prisma.tag.update({
      where: { id },
      data: {
        ...values,
        slug: values.name
          ? slugify(values.name, { lower: true, strict: true })
          : tag.slug,
      },
    })

    return NextResponse.json(updatedTag)
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Internal server error', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    const tag = await prisma.tag.findUnique({ where: { id } })

    if (!tag) {
      return new NextResponse('Tag not found', { status: 404 })
    }

    await prisma.tag.delete({ where: { id } })

    return new NextResponse('Tag deleted', { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Internal server error', { status: 500 })
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    const tag = await prisma.tag.findUnique({ where: { id } })

    if (!tag) {
      return new NextResponse('Tag not found', { status: 404 })
    }

    return NextResponse.json(tag)
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Internal server error', { status: 500 })
  }
}
