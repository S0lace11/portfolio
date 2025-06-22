import React from 'react'
import { Github, Twitter, MessageCircle } from 'lucide-react'

interface SocialLink {
  name: string
  username: string
  icon: string
  href: string
  bgColor: string
  textColor: string
  tooltip: string
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    username: '@S0lace11',
    icon: 'Github',
    href: 'https://github.com/S0lace11',
    bgColor: 'bg-pink-50 hover:bg-pink-100',
    textColor: 'text-pink-600',
    tooltip: 'Check out my GitHub projects'
  },
  {
    name: 'Twitter',
    username: '@S0lace11',
    icon: 'Twitter',
    href: 'https://twitter.com/S0lace11',
    bgColor: 'bg-pink-50 hover:bg-pink-100',
    textColor: 'text-pink-600',
    tooltip: 'Follow me on Twitter'
  },
  {
    name: 'WeChat',
    username: 'Contact me',
    icon: 'MessageCircle',
    href: 'https://mp.weixin.qq.com/s/UJ-qOBn4MiyQVk3gxGvRzA',
    bgColor: 'bg-pink-50 hover:bg-pink-100',
    textColor: 'text-pink-600',
    tooltip: 'Follow my WeChat Official Account'
  }
]

// Function to render the appropriate icon
const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'Github':
      return <Github className="h-6 w-6" />
    case 'Twitter':
      return <Twitter className="h-6 w-6" />
    case 'MessageCircle':
      return <MessageCircle className="h-6 w-6" />
    default:
      return <Github className="h-6 w-6" />
  }
}

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : '_self'}
          rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
          className={`
            ${link.bgColor} ${link.textColor}
            border border-pink-200 rounded-2xl px-5 py-4 
            transition-all duration-200 hover:border-pink-300 hover:shadow-md hover:scale-105
            flex items-center gap-3 min-w-[160px]
          `}
          title={link.tooltip}
        >
          <div className="bg-pink-100 p-2 rounded-full text-pink-600 flex-shrink-0">
            {renderIcon(link.icon)}
          </div>
          <div>
            <div className="font-black text-base text-black">{link.name}</div>
            <div className="text-sm opacity-75">{link.username}</div>
          </div>
        </a>
      ))}
    </div>
  )
} 