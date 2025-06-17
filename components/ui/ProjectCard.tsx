import { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary-300 hover:bg-primary-100 flex flex-col h-full">
      <h3 className="font-bold text-xl mb-4" style={{ color: '#ff4566' }}>
        {project.title}
      </h3>
      <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow min-h-[80px]">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="bg-white px-3 py-1 rounded-full text-xs font-black text-black border border-gray-200 shadow-sm"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
            View Project
          </button>
        </a>
      </div>
    </div>
  )
} 