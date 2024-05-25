import { NextResponse } from 'next/server'
import prisma from '@/db/prisma'
import slugify from 'slugify'

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params
    const {
      title,
      description,
      shortDesc,
      image,
      email,
      demo,
      github,
      languages,
    } = await request.json()

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    const project = await prisma.project.update({
      where: { slug },
      data: {
        title,
        description,
        github,
        demo,
        shortDesc,
        slug: slugify(title, { lower: true, strict: true }),
        image,
        languages,
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Internal server error', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params

    await prisma.project.delete({
      where: { slug },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Internal server error', { status: 500 })
  }
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params

    const project = await prisma.project.findUnique({
      where: { slug },
    })

    if (!project) {
      return new NextResponse('Project not found', { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Internal server error', { status: 500 })
  }
}
