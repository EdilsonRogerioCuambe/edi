import { gql, request } from 'graphql-request'

const DATABASE_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL

if (!DATABASE_URL) {
  throw new Error(
    'Please define the DATABASE_URL environment variable inside .env.local',
  )
}

type Category = {
  id: string
  name: string
  slug: string
}

type AuthorData = {
  id: string
  name: string
  avatar: {
    url: string
  }
  description: string
}

type AuthorRes = {
  author: AuthorData
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
  category: Category
  author: AuthorData
  updatedAt: string
  publishedAt: string
}

type Blogs = {
  blogs: BlogData[]
}

export const getAllBlogs = async (): Promise<Blogs> => {
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
        category {
          ... on Category {
            id
            name
            slug
          }
        }
      }
    }
  `

  const blogs: Blogs = await request(DATABASE_URL, query)
  return blogs
}

export const getAllBlogsByCategory = async (
  category: string,
): Promise<Blogs> => {
  const query = gql`
    query BlogsByCategory {
      blogs(where: { category: { name: "${category}" } }) {
        id
        title
        content
        description
        slug
        imageUrl
        tags
        category {
          id
          name
        }
        author {
          ... on Author {
            id
            name
            avatar {
              url
            }
            description
          }
        }
        updatedAt
      }
    }
  `

  const blogs: Blogs = await request(DATABASE_URL, query)
  return blogs
}

export const getBlogBySlug = async (
  slug: string,
): Promise<{ blog: BlogData }> => {
  const query = gql`
    query MyQuery {
      blog(
        where: {
          slug: "${slug}"
        }
      ) {
        category {
          ... on Category {
            id
            name
            slug
          }
        }
        content
        publishedAt
        slug
        stage
        tags
        title
        updatedAt
        imageUrl {
          url
        }
        id
        description
        author {
          name
          avatar {
            url
          }
        }
      }
    }
  `

  const blog: { blog: BlogData } = await request(DATABASE_URL, query)
  return blog
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

export const getAllProjects = async (): Promise<Projects> => {
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

  const projects: Projects = await request(DATABASE_URL, query)
  return projects
}

export const getProjectBySlug = async (
  slug: string,
): Promise<{ project: ProjectData }> => {
  const query = gql`
    query ProjectBySlug {
      project(where: { slug: "${slug}" }) {
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

  const project: { project: ProjectData } = await request(DATABASE_URL, query)
  return project
}

const email = process.env.NEXT_PUBLIC_EMAIL

if (!email) {
  throw new Error(
    'Please define the NEXT_PUBLIC_EMAIL environment variable inside .env.local',
  )
}

export const getAuthorByEmail = async (): Promise<AuthorRes> => {
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

  const author: AuthorRes = await request(DATABASE_URL, query)
  return author
}
