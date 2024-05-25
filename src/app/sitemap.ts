import { MetadataRoute } from 'next'
import prisma from '@/db/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const email = process.env.NEXT_PUBLIC_EMAIL
  const URL = process.env.NEXT_PUBLIC_SITE_URL

  if (!email) {
    throw new Error(
      'Please define the NEXT_PUBLIC_EMAIL environment variable inside .env.local',
    )
  }

  const author = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!author) {
    throw new Error('Author not found')
  }

  const projects = await prisma.project.findMany({
    select: {
      slug: true,
    },
  })

  const blogs = await prisma.post.findMany({
    select: {
      slug: true,
    },
  })

  const blogSlugs = blogs.map((blog) => blog.slug)

  const dynamicRoutes = [
    ...blogSlugs.map((slug) => `/blog/${slug}`),
    ...projects.map((project) => `/project/${project.slug}`),
  ].map((path) => ({
    url: `${URL}${path}`,
    lastModified: new Date().toISOString(),
  }))

  const normalRoutes = [
    '/',
    '/blog',
    '/projects',
    '/about',
    '/privacy-policy',
    '/not-found',
    '/contact',
  ].map((path) => ({
    url: `${URL}${path}`,
    lastModified: new Date().toISOString(),
  }))

  return [...normalRoutes, ...dynamicRoutes]
}
