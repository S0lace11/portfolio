import { Article } from '@/data/articles'
import Link from 'next/link'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300 hover:bg-blue-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <span className="bg-white px-3 py-1 rounded-full text-xs font-black text-black border border-gray-200 shadow-sm">
          {article.category}
        </span>
        <span className="text-xs text-gray-500">{article.readTime}</span>
      </div>
      
      <h3 className="font-bold text-xl mb-4" style={{ color: '#ff4566' }}>
        {article.title}
      </h3>
      
      <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow min-h-[80px]">
        {article.description}
      </p>
      
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs text-gray-500">{article.date}</span>
      </div>
      
      <div className="mt-auto">
        <Link href={`/blog/${article.slug}`} className="w-full">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
            Read Article
          </button>
        </Link>
      </div>
    </div>
  )
} 