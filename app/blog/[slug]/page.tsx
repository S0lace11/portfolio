import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { formatDate, getCategoryName, getReadingTimeText } from '@/lib/utils'
import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Clock, Calendar, ArrowLeft, Tag } from 'lucide-react'

interface Props {
  params: {
    slug: string
  }
}

// 生成静态参数
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// 生成动态SEO元数据
export async function generateMetadata({ params }: Props) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: '文章未找到',
      description: '抱歉，您访问的文章不存在'
    }
  }

  return {
    title: `${post.title} - Q1Hang`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Q1Hang'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Navigation />
        
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          返回博客
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
            <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-medium">
              {getCategoryName(post.category)}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{getReadingTimeText(post.readingTime)}</span>
            </div>
            {post.featured && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                推荐
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-4" style={{ color: '#ff4566' }}>
            {post.title}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            {post.description}
          </p>

          {post.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-6">
              <Tag className="h-4 w-4 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Article Content */}
        <article className="prose prose-lg prose-pink max-w-none">
          <div className="markdown-content">
            <MDXRemote source={post.content} />
          </div>
        </article>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              查看更多文章
            </Link>
            
            <div className="text-sm text-gray-500">
              发布于 {formatDate(post.date)}
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
} 