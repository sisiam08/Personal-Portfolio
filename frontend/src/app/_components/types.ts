export type SkillCategory =
  | "FRONTEND"
  | "BACKEND"
  | "DATABASE"
  | "ORM"
  | "DEVOPS"
  | "AUTHENTICATION"
  | "LANGUAGE"
  | "OTHER";

export type SkillLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface Skill {
  id?: string;
  name: string;
  category: SkillCategory | string;
  icon: string;
  level: SkillLevel | string;
  projectExperience: number;
  lastUsedYear: number;
  heroOrder?: number | null;
}

export interface ProjectSkill {
  id?: string;
  name: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  slug?: string;
  description: string;
  problem?: string | null;
  solution?: string | null;
  challenges?: string | null;
  futurePlan?: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  status?: "COMPLETED" | "ONGOING" | "PLANNED" | string;
  featured?: boolean;
  image: string;
  skills?: ProjectSkill[];
}

export interface Experience {
  id?: string;
  companyName: string;
  role: string;
  description: string;
  startDate: string;
  endDate?: string | null;
  current?: boolean;
}

export interface Education {
  id?: string;
  institute: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number | null;
}

export interface ProfileUser {
  name?: string;
  designation?: string | null;
  bio?: string | null;
  about?: string | null;
  image?: string | null;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  github?: string | null;
  linkedin?: string | null;
  x?: string | null;
  resumeUrl?: string | null;
}
