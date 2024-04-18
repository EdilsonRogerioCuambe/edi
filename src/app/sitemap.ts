import request, { gql } from 'graphql-request'
import { MetadataRoute } from 'next'

type AuthorData = {
  id: string
  name: string
  avatar: {
    url: string
  }
  description: string
}

type BlogData = {
  id: string
  title: string
  content: string
  description: string
  slug: string
  imageUrl: {
    url: string
  }
  tags: string[]
  category: string
  author: AuthorData
  updatedAt: string
  publishedAt: string
}

type ProjectData = {
  id: string
  name: string
  description: string
  content: string
  link?: string
  slug: string
  imageUrl: {
    url: string
  }
  langs: string[]
}

type Projects = {
  projects: ProjectData[]
}

type Blogs = {
  blogs: BlogData[]
}

async function fetchAllBlogs() {
  const DATABASE_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (!DATABASE_URL) {
    throw new Error(
      'Please define the DATABASE_URL environment variable inside .env.local',
    )
  }

  const query = gql`
    query Blogs {
      blogs(first: 500) {
        author {
          ... on Author {
            id
            name
            avatar {
              url
            }
            description
          }
          name
          id
          avatar {
            url
          }
        }
        updatedAt
        imageUrl {
          url
        }
        slug
        title
        tags
        publishedAt
        description
        content
        category
      }
    }
  `
  const blogs = await request<Blogs>(DATABASE_URL, query)
  return blogs
}

async function fetchAllProjects() {
  const DATABASE_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (!DATABASE_URL) {
    throw new Error(
      'Please define the DATABASE_URL environment variable inside .env.local',
    )
  }

  const query = gql`
    query Projects {
      projects(first: 500) {
        name
        description
        content
        link
        slug
        imageUrl {
          url
        }
        langs
      }
    }
  `
  const projects = await request<Projects>(DATABASE_URL, query)
  return projects
}

async function fetchAuthorByEmail(email: string) {
  const DATABASE_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (!DATABASE_URL) {
    throw new Error(
      'Please define the DATABASE_URL environment variable inside .env.local',
    )
  }

  const query = gql`
  query AuthorByEmail {
    author(where: { email: "${email}" }) {
      id
      name
      avatar {
        url
      }
      description
    }
  }
  `
  const author = await request<{ author: AuthorData }>(DATABASE_URL, query, {
    email,
  })
  return author
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await fetchAllBlogs()
  const projects = await fetchAllProjects()

  const email = process.env.NEXT_PUBLIC_EMAIL
  const URL = process.env.NEXT_PUBLIC_SITE_URL

  if (!email) {
    throw new Error(
      'Please define the NEXT_PUBLIC_EMAIL environment variable inside .env.local',
    )
  }

  const author = await fetchAuthorByEmail(email)

  if (!author.author) {
    throw new Error('Author not found')
  }

  const blogSlugs = blogs.blogs.map((blog) => blog.slug)
  const projectSlugs = projects.projects.map((project) => project.slug)

  const dynamicRoutes = [
    ...blogSlugs.map((slug) => `/blog/${slug}`),
    ...projectSlugs.map((slug) => `/project/${slug}`),
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
