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
    title: 'Transcribe & Read Aloud',
    description: 'Video content transcription with real-time sync playback',
    tech: ['Python', 'Javascript'],
    github: 'https://github.com/username/transcribe-read-aloud'
  },
  {
    id: 2,
    title: 'Floater',
    description: 'Chrome extension for floating any website',
    tech: ['Python', 'Javascript'],
    github: 'https://github.com/username/floater'
  }
] 