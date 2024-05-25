import { NextResponse } from 'next/server'
import slugify from 'slugify'
import prisma from '@/db/prisma'

export async function POST(req: Request) {
  try {
    const { title, content, shortDesc, image, email, tags } = await req.json()
    const slug = slugify(title, { lower: true, strict: true })

    const userExists = await prisma.user.findUnique({
      where: { email },
    })

    if (!userExists) {
      return new Response('Usuário não encontrado', { status: 404 })
    }

    const tagsExists = await prisma.tag.findMany({
      where: { id: { in: tags } },
    })

    if (tagsExists.length !== tags.length) {
      return new Response('Tag não encontrada', { status: 404 })
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        shortDesc,
        image,
        slug,
        author: {
          connect: { email },
        },
        tags: {
          connect: tags.map((tagId: string) => ({ id: tagId })),
        },
      },
    })
    return NextResponse.json(post)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new Response(error.message, { status: 500 })
    }
    return new Response('Erro ao criar post', { status: 500 })
  }
}
