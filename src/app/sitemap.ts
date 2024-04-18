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
        publishedAt
        id
        imageUrl {
          url
        }
        slug
        title
        content
        description
        tags
        category
      }
    }
  `
  const blogs = await request<Blogs>(DATABASE_URL, query)
  return blogs
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await fetchAllBlogs()

  if (!blogs.blogs) {
    return []
  }

  return blogs.blogs.slice(0, 50000).map((blog) => ({
    url: `https://edilson.site/blog/${blog.slug}`,
    lastmod: blog.updatedAt,
    changefreq: 'daily',
    priority: 0.7,
  }))
}
