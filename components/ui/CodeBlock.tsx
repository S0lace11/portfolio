import React from 'react'
import { 
  SiPython, 
  SiJavascript, 
  SiTypescript, 
  SiHtml5, 
  SiCss3, 
  SiReact, 
  SiNodedotjs, 
  SiGnubash,
  SiJson,
  SiYaml,
  SiMarkdown
} from 'react-icons/si'
import { IconType } from 'react-icons'

interface CodeBlockProps {
  children: string
  className?: string
}

const getLanguageInfo = (className: string = ''): { icon: IconType; name: string; color: string } => {
  // 从 className 中提取语言，通常是 "language-python" 的格式
  const language = className.replace('language-', '').toLowerCase()
  
  const languageMap: { [key: string]: { icon: IconType; name: string; color: string } } = {
    'python': { icon: SiPython, name: 'Python', color: '#3776ab' },
    'javascript': { icon: SiJavascript, name: 'JavaScript', color: '#f7df1e' },
    'js': { icon: SiJavascript, name: 'JavaScript', color: '#f7df1e' },
    'typescript': { icon: SiTypescript, name: 'TypeScript', color: '#3178c6' },
    'ts': { icon: SiTypescript, name: 'TypeScript', color: '#3178c6' },
    'tsx': { icon: SiReact, name: 'React TSX', color: '#61dafb' },
    'jsx': { icon: SiReact, name: 'React JSX', color: '#61dafb' },
    'html': { icon: SiHtml5, name: 'HTML', color: '#e34f26' },
    'css': { icon: SiCss3, name: 'CSS', color: '#1572b6' },
    'bash': { icon: SiGnubash, name: 'Bash', color: '#4eaa25' },
    'shell': { icon: SiGnubash, name: 'Shell', color: '#4eaa25' },
    'sh': { icon: SiGnubash, name: 'Shell', color: '#4eaa25' },
    'json': { icon: SiJson, name: 'JSON', color: '#000000' },
    'yaml': { icon: SiYaml, name: 'YAML', color: '#cb171e' },
    'yml': { icon: SiYaml, name: 'YAML', color: '#cb171e' },
    'markdown': { icon: SiMarkdown, name: 'Markdown', color: '#000000' },
    'md': { icon: SiMarkdown, name: 'Markdown', color: '#000000' },
  }
  
  return languageMap[language] || { icon: SiNodedotjs, name: 'Code', color: '#68217a' }
}

export default function CodeBlock({ children, className = '' }: CodeBlockProps) {
  const { icon: Icon, name, color } = getLanguageInfo(className)
  
  return (
    <div className="relative mb-6">
      {/* 语言标识头部 */}
      <div className="flex items-center gap-2 bg-gray-700 text-gray-200 px-4 py-2 rounded-t-lg text-sm">
        <Icon style={{ color }} className="w-4 h-4" />
        <span className="font-medium">{name}</span>
      </div>
      
      {/* 代码内容 */}
      <pre className="!mt-0 !rounded-t-none">
        <code className={className}>
          {children}
        </code>
      </pre>
    </div>
  )
} 