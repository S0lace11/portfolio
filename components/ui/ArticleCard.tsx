import { Article } from '@/data/articles'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/blog/${article.slug}`} className="block">
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300 hover:bg-blue-100 flex flex-col h-full relative group cursor-pointer">
        <div className="absolute top-6 right-6">
          <ArrowRight className="h-5 w-5 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
        </div>
        
        <div className="flex items-center justify-between mb-3 pr-8">
          <span className="bg-white px-3 py-1 rounded-full text-xs font-black text-black border border-gray-200 shadow-sm">
            {article.category}
          </span>
          <span className="text-xs text-gray-500">{article.readTime}</span>
        </div>
        
        <h3 className="font-bold text-lg mb-4 pr-8" style={{ color: '#ff4566' }}>
          {article.title}
        </h3>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow min-h-[80px]">
          {article.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-gray-500">{article.date}</span>
        </div>
      </div>
    </Link>
  )
} 