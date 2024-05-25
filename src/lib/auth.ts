import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/db/prisma'
import { AuthOptions } from 'next-auth'

const clientId = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET

if (!clientId) {
  throw new Error('GITHUB_CLIENT_ID is not set')
}

if (!clientSecret) {
  throw new Error('GITHUB_CLIENT_SECRET is not set')
}

export const auth: AuthOptions = {
  providers: [
    GithubProvider({
      clientId,
      clientSecret,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && typeof token.id === 'string') {
        if (session.user) {
          session.user.id = token.id
        }
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
