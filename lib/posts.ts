import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Post {
  slug: string
  title: string
  date: string
  category: 'tech' | 'life' | 'projects'
  description: string
  tags: string[]
  content: string
  readingTime: number
  featured?: boolean
  excerpt: string
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

// 计算阅读时间（基于250字/分钟的阅读速度）
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 250
  const wordCount = content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return Math.max(1, readingTime) // 至少1分钟
}

// 提取文章的第一段落
function extractFirstParagraph(content: string): string {
  // 移除frontmatter
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n/, '')
  
  // 移除标题（以#开头的行）
  const lines = contentWithoutFrontmatter.split('\n')
  const contentLines = lines.filter(line => !line.trim().startsWith('#') && line.trim() !== '')
  
  // 找到第一个非空段落
  for (const line of contentLines) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('```') && !trimmed.startsWith('|')) {
      // 移除markdown语法标记
      return trimmed
        .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体
        .replace(/\*(.*?)\*/g, '$1')     // 移除斜体
        .replace(/`(.*?)`/g, '$1')       // 移除代码标记
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // 移除链接，保留文字
        .substring(0, 200) // 限制长度
    }
  }
  
  return '暂无内容摘要'
}

// 获取所有文章
export function getAllPosts(): Post[] {
  const categories = ['tech', 'life', 'projects']
  const allPosts: Post[] = []

  categories.forEach(category => {
    const categoryPath = path.join(postsDirectory, category)
    
    if (!fs.existsSync(categoryPath)) {
      return
    }

    const files = fs.readdirSync(categoryPath)
    
    files.forEach(fileName => {
      if (!fileName.endsWith('.md')) {
        return
      }

      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(categoryPath, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      const post: Post = {
        slug,
        title: data.title || '',
        date: data.date || '',
        category: category as 'tech' | 'life' | 'projects',
        description: data.description || '',
        tags: data.tags || [],
        content,
        readingTime: calculateReadingTime(content),
        featured: data.featured || false,
        excerpt: extractFirstParagraph(content)
      }

      allPosts.push(post)
    })
  })

  // 按日期倒序排列
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// 根据slug获取单篇文章
export function getPostBySlug(slug: string): Post | null {
  const allPosts = getAllPosts()
  return allPosts.find(post => post.slug === slug) || null
}

// 根据分类获取文章
export function getPostsByCategory(category: 'tech' | 'life' | 'projects'): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.category === category)
}

// 获取推荐文章
export function getFeaturedPosts(): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.featured)
}

// 获取最新文章
export function getRecentPosts(limit: number = 5): Post[] {
  const allPosts = getAllPosts()
  return allPosts.slice(0, limit)
}

// 获取所有标签
export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tags = new Set<string>()
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}

// 根据标签获取文章
export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.tags.includes(tag))
} 