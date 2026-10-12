export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string;
  level: string;
  projectExperience: number;
  lastUsedYear: number;
  heroOrder?: number | null;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  problem: string;
  solution: string;
  challenges?: string | null;
  futurePlan?: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  status: string;
  featured: boolean;
  image: string;
  skills?: Skill[];
}

export interface Experience {
  id: string;
  companyName: string;
  role: string;
  description: string;
  startDate: string;
  endDate?: string | null;
  current: boolean;
}

export interface Education {
  id: string;
  institute: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number | null;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  designation?: string | null;
  bio?: string | null;
  about?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  github?: string | null;
  linkedin?: string | null;
  x?: string | null;
  resumeUrl?: string | null;
}
