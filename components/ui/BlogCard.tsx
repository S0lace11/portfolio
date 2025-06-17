import { Post } from '@/lib/posts'
import { formatDate, getCategoryName, getReadingTimeText } from '@/lib/utils'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300 hover:bg-blue-100 flex flex-col h-full relative group cursor-pointer">
        <div className="absolute top-6 right-6">
          <ArrowRight className="h-5 w-5 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
        </div>
        
        <div className="flex items-center justify-between mb-3 pr-8">
          <span className="bg-white px-3 py-1 rounded-full text-xs font-black text-black border border-gray-200 shadow-sm">
            {getCategoryName(post.category)}
          </span>
          <span className="text-xs text-gray-500">{getReadingTimeText(post.readingTime)}</span>
        </div>
        
        <h3 className="font-bold text-lg mb-4 pr-8" style={{ color: '#ff4566' }}>
          {post.title}
        </h3>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow min-h-[80px]">
          {post.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
        </div>
      </div>
    </Link>
  )
} 