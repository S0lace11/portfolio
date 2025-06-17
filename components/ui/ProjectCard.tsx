import { Project } from '@/data/projects'
import { ArrowRight } from 'lucide-react'
import { 
  SiPython, 
  SiJavascript, 
  SiReact, 
  SiTypescript, 
  SiHtml5, 
  SiCss3, 
  SiNodedotjs, 
  SiVuedotjs, 
  SiAngular, 
  SiFlask, 
  SiDjango, 
  SiExpress 
} from 'react-icons/si'
import { IconType } from 'react-icons'

interface ProjectCardProps {
  project: Project
}

const getTechIcon = (tech: string): { icon: IconType; color: string } => {
  const iconMap: { [key: string]: { icon: IconType; color: string } } = {
    'Python': { icon: SiPython, color: '#3776ab' },
    'Javascript': { icon: SiJavascript, color: '#f7df1e' },
    'JavaScript': { icon: SiJavascript, color: '#f7df1e' },
    'React': { icon: SiReact, color: '#61dafb' },
    'TypeScript': { icon: SiTypescript, color: '#3178c6' },
    'HTML': { icon: SiHtml5, color: '#e34f26' },
    'CSS': { icon: SiCss3, color: '#1572b6' },
    'Node.js': { icon: SiNodedotjs, color: '#339933' },
    'Vue': { icon: SiVuedotjs, color: '#4fc08d' },
    'Angular': { icon: SiAngular, color: '#dd0031' },
    'Flask': { icon: SiFlask, color: '#000000' },
    'Django': { icon: SiDjango, color: '#092e20' },
    'Express': { icon: SiExpress, color: '#000000' }
  }
  return iconMap[tech] || { icon: SiJavascript, color: '#f7df1e' }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-primary-300 hover:bg-primary-100 flex flex-col relative group cursor-pointer h-32">
        <div className="absolute top-3 right-3">
          <ArrowRight className="h-4 w-4 text-primary-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-200" />
        </div>
        
        <h3 className="font-bold text-sm mb-2 pr-6 leading-tight" style={{ color: '#ff4566' }}>
          {project.title}
        </h3>
        
        <p className="text-gray-600 text-xs leading-relaxed mb-3 flex-grow overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {project.description}
        </p>
        
        <div className="flex gap-2 mt-auto">
          {project.tech.slice(0, 4).map((tech) => {
            const { icon: IconComponent, color } = getTechIcon(tech)
            return (
              <span
                key={tech}
                className="text-lg"
                title={tech}
              >
                <IconComponent style={{ color }} />
              </span>
            )
          })}
          {project.tech.length > 4 && (
            <span className="text-xs text-gray-400 self-center">+{project.tech.length - 4}</span>
          )}
        </div>
      </div>
    </a>
  )
} 