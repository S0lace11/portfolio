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
    description: 'A Web application based on Flask that can convert video content into text and achieve real-time synchronization and joint display between video playback',
    tech: ['Python', 'Javascript'],
    github: 'https://github.com/username/transcribe-read-aloud'
  },
  {
    id: 2,
    title: 'Floater',
    description: 'A Chrome extension enables users to float any websites',
    tech: ['Python', 'Javascript'],
    github: 'https://github.com/username/floater'
  }
] 