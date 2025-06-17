import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Tailwind CSS 类名合并工具
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 格式化日期
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 格式化日期为简短格式
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 截取文本到指定长度
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// 从文本中提取摘要
export function extractExcerpt(content: string, maxLength: number = 160): string {
  // 移除 Markdown 语法
  const cleanContent = content
    .replace(/#{1,6}\s+/g, '') // 移除标题标记
    .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体标记
    .replace(/\*(.*?)\*/g, '$1') // 移除斜体标记
    .replace(/`(.*?)`/g, '$1') // 移除行内代码标记
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接，保留文本
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // 移除图片
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/\n\s*\n/g, ' ') // 移除多余换行
    .trim()

  return truncateText(cleanContent, maxLength)
}

// 分类名称映射
export const categoryNames = {
  tech: '技术',
  life: '生活',
  projects: '项目'
} as const

// 获取分类中文名
export function getCategoryName(category: keyof typeof categoryNames): string {
  return categoryNames[category] || category
}

// 生成文章 URL
export function getPostUrl(slug: string): string {
  return `/blog/${slug}`
}

// 生成分类 URL
export function getCategoryUrl(category: string): string {
  return `/blog/category/${category}`
}

// 生成标签 URL
export function getTagUrl(tag: string): string {
  return `/blog/tag/${tag}`
}

// 生成阅读时间文本
export function getReadingTimeText(minutes: number): string {
  return `${minutes} 分钟阅读`
}

// 验证日期格式
export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

// 计算相对时间
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return '今天'
  if (diffInDays === 1) return '昨天'
  if (diffInDays < 7) return `${diffInDays} 天前`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} 周前`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} 个月前`
  return `${Math.floor(diffInDays / 365)} 年前`
} 