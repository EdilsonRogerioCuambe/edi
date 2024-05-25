import { NextResponse } from 'next/server'
import prisma from '@/db/prisma'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        tags: true,
      },
    })

    if (!post) {
      return new Response('Post não encontrado', { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new Response(error.message, { status: 500 })
    }
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params
    const { title, content, shortDesc, image, tags } = await request.json()

    const post = await prisma.post.update({
      where: { slug },
      data: {
        title,
        content,
        shortDesc,
        image,
        tags: {
          set: tags.map((tagId: string) => ({ id: tagId })),
        },
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new Response(error.message, { status: 500 })
    }
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params

    await prisma.post.delete({
      where: { slug },
    })

    return new Response('Post deletado com sucesso', { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new Response(error.message, { status: 500 })
    }
    return new Response('Internal Server Error', { status: 500 })
  }
}
