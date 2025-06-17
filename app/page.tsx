import Navigation from '@/components/Navigation'
import SocialLinks from '@/components/SocialLinks'
import ProjectCard from '@/components/ui/ProjectCard'
import ArticleCard from '@/components/ui/ArticleCard'
import { projects } from '@/data/projects'
import { featuredArticles } from '@/data/articles'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Navigation */}
        <Navigation />
        
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row items-start justify-between">
            <div className="flex-1 mb-8 lg:mb-0">
              <h1 className="text-5xl font-bold mb-4" style={{ color: '#ff4566' }}>
                Hi, I&apos;m Q1Hang 👋
              </h1>
              <p className="text-xl text-primary-500 mb-8">
                Interested in everything about AI
              </p>
              
              {/* Social Links */}
              <SocialLinks />
            </div>
            
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-64 h-64 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center overflow-hidden">
                {/* 这里可以放你的头像图片 */}
                <div className="text-6xl">🎮</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-8" style={{ color: '#ff4566' }}>Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Articles Section */}
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-8 text-black">Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
