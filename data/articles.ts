export interface Article {
  id: number
  title: string
  description: string
  category: string
  date: string
  readTime: string
  slug: string
}

export const featuredArticles: Article[] = [
  {
    id: 1,
    title: "Understanding Machine Learning Fundamentals",
    description: "A comprehensive guide to machine learning concepts, algorithms, and practical applications in modern AI development.",
    category: "Tech",
    date: "2024-01-15",
    readTime: "8 min read",
    slug: "understanding-machine-learning-fundamentals"
  },
  {
    id: 2,
    title: "Building Scalable Web Applications with Next.js",
    description: "Learn how to create performant and scalable web applications using Next.js 14 with TypeScript and modern development practices.",
    category: "Tech", 
    date: "2024-01-10",
    readTime: "12 min read",
    slug: "building-scalable-web-applications-nextjs"
  },
  {
    id: 3,
    title: "The Future of AI in Software Development",
    description: "Exploring how artificial intelligence is transforming the software development landscape and what developers need to know.",
    category: "AI",
    date: "2024-01-05",
    readTime: "6 min read", 
    slug: "future-ai-software-development"
  }
] 