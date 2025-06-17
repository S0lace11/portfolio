import React from 'react'
import { Github, Twitter, MessageCircle, Coffee } from 'lucide-react'

const socialLinks = [
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/S0lace11',
    color: 'hover:text-blue-500'
  },
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/S0lace11',
    color: 'hover:text-gray-800'
  },
  {
    name: 'WeChat',
    icon: MessageCircle,
    href: '#',
    color: 'hover:text-green-500'
  },
  {
    name: 'Coffee',
    icon: Coffee,
    href: '#',
    color: 'hover:text-amber-600'
  }
]

export default function SimpleSocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((link) => {
        const IconComponent = link.icon
        return (
          <a
            key={link.name}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : '_self'}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
            className={`text-gray-600 ${link.color} transition-colors duration-200 p-1 rounded-lg hover:bg-gray-50`}
            aria-label={link.name}
          >
            <IconComponent className="h-4 w-4" />
          </a>
        )
      })}
    </div>
  )
} 