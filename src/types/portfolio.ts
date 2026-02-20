export interface PersonalInfo {
  name: string
  title: string
  tagline: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
}

export interface Experience {
  id: number
  title: string
  company: string
  location: string
  date: string
  description: string[]
}

export interface Achievement {
  id: number
  icon: string
  text: string
}

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  id: number
  title: string
  description: string
  details: string[]
  links: ProjectLink[]
}

export interface Skills {
  [category: string]: string[]
}

export interface Education {
  degree: string
  institution: string
  location: string
  date: string
}

export interface PortfolioData {
  personalInfo: PersonalInfo
  experiences: Experience[]
  achievements: Achievement[]
  projects: Project[]
  skills: Skills
  education: Education
}
