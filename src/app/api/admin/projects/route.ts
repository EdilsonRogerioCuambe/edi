import { NextResponse } from 'next/server'
import prisma from '@/db/prisma'
import slugify from 'slugify'

export async function POST(request: Request) {
  try {
    const {
      title,
      description,
      shortDesc,
      image,
      email,
      github,
      demo,
      languages,
    } = await request.json()

    if (
      !title ||
      !description ||
      !shortDesc ||
      !image ||
      !email ||
      !languages ||
      !Array.isArray(languages)
    ) {
      throw new Error('Missing required fields')
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        shortDesc,
        github,
        demo,
        image,
        slug: slugify(title, { lower: true, strict: true }),
        languages,
        authorId: user.id,
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
