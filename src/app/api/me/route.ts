import { NextResponse } from 'next/server'
import prisma from '@/db/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return new Response('Email não encontrado', { status: 404 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return new Response('Usuário não encontrado', { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return new Response(error.message, { status: 500 })
    }
    return new Response('Erro ao buscar usuário', { status: 500 })
  }
}
