export interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  github: string
  demo?: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Portfolio',
    description: 'Showcase of my projects and blog posts',
    tech: ['Typescript', 'React'],
    github: 'https://github.com/S0lace11/portfolio'
  },
  {
    id: 2,
    title: 'Transcribe & Read Aloud',
    description: 'Video content transcription with real-time sync playback',
    tech: ['Python', 'Javascript'],
    github: 'https://github.com/S0lace11/transcribe-read-aloud'
  },
  {
    id: 3,
    title: 'Floater',
    description: 'Chrome extension for floating any website',
    tech: ['Python', 'Javascript'],
    github: 'https://github.com/S0lace11/floater'
  }
] 