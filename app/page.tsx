import Image from 'next/image'
import Navigation from '@/components/Navigation'
import SimpleSocialLinks from '@/components/SimpleSocialLinks'
import ProjectCard from '@/components/ui/ProjectCard'
import BlogCard from '@/components/ui/BlogCard'
import { projects } from '@/data/projects'
import { getRecentPosts } from '@/lib/posts'

export default function Home() {
  // 获取最新的3篇博客文章
  const recentPosts = getRecentPosts(3)
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Navigation */}
        <Navigation />
        
        {/* Hero Section - 主要个人介绍区域 */}
        <section className="min-h-[80vh] flex items-center justify-center mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full">
            {/* Avatar */}
            <div className="flex-shrink-0 mb-8 lg:mb-0 lg:mr-12">
              <div className="relative w-56 h-56 rounded-full overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src="/images/profile-photo.png"
                  alt="Q1Hang Profile Photo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Personal Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl font-bold mb-6" style={{ color: '#ff4566' }}>
                Hi, I&apos;m Q1Hang 👋
              </h1>
              <h2 className="text-2xl font-medium text-gray-800 mb-6">
                Product Manager, AI Enthusiast.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl">
                Passionate about artificial intelligence and modern web technologies. 
                Currently exploring the intersection of AI and software development, 
                building innovative solutions that bridge the gap between human creativity and machine intelligence.
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center lg:justify-start">
                <SimpleSocialLinks />
              </div>
            </div>
          </div>
        </section>
        
        {/* 分割线 */}
        <div className="border-t border-gray-200 my-12"></div>
        
        {/* Projects Section - 移到下方，需要滚动查看 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#ff4566' }}>Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* 分割线 */}
        <div className="border-t border-gray-200 my-12"></div>
        
        {/* Blog Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#ff4566' }}>BLOG</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
