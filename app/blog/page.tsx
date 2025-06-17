import { getAllPosts, getAllTags } from '@/lib/posts'
import { formatDate, getCategoryName, getReadingTimeText } from '@/lib/utils'
import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { Clock, Calendar, Tag, ArrowRight } from 'lucide-react'

export const metadata = {
  title: '博客 - Q1Hang',
  description: '技术分享、生活随笔和项目经验',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Navigation />
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#ff4566' }}>
            博客
          </h1>
          <p className="text-lg text-gray-600">
            分享技术思考、生活感悟和项目经验
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 flex flex-wrap gap-4 text-sm text-gray-500">
          <span>共 {posts.length} 篇文章</span>
          <span>•</span>
          <span>{tags.length} 个标签</span>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-pink-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-500">
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
                </div>
                {post.featured && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    推荐
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold mb-3 hover:text-pink-600 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {post.description}
              </p>

              {post.tags.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm text-gray-500 hover:text-pink-600 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium group"
              >
                阅读全文
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">暂无文章</p>
            <p className="text-gray-400 text-sm mt-2">敬请期待更多内容</p>
          </div>
        )}
      </div>
    </div>
  )
} 