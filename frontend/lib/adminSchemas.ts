import { z } from "zod";

export const SKILL_CATEGORIES = [
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "ORM",
  "DEVOPS",
  "AUTHENTICATION",
  "LANGUAGE",
  "OTHER",
] as const;

export const SKILL_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;
export const PROJECT_STATUSES = ["COMPLETED", "ONGOING", "PLANNED"] as const;

const currentYear = new Date().getFullYear();
const optionalUrl = z.union([z.string().url("Enter a valid URL"), z.literal("")]);

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  designation: z.string().optional(),
  bio: z.string().optional(),
  about: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  github: optionalUrl.optional(),
  linkedin: optionalUrl.optional(),
  x: optionalUrl.optional(),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  problem: z.string().min(1, "Problem is required"),
  solution: z.string().min(1, "Solution is required"),
  challenges: z.string().optional(),
  futurePlan: z.string().optional(),
  githubUrl: optionalUrl.optional(),
  liveUrl: optionalUrl.optional(),
  status: z.enum(PROJECT_STATUSES),
  featured: z.boolean(),
  skills: z.array(z.string()),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(SKILL_CATEGORIES),
  level: z.enum(SKILL_LEVELS),
  projectExperience: z.coerce
    .number()
    .int()
    .min(0, "Must be 0 or more"),
  lastUsedYear: z.coerce
    .number()
    .int()
    .min(1990, "Must be 1990 or later")
    .max(currentYear, `Cannot exceed ${currentYear}`),
});

export const experienceSchema = z.object({
  companyName: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean(),
});

export const educationSchema = z.object({
  institute: z.string().min(1, "Institute is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().min(1, "Field is required"),
  startYear: z.coerce
    .number()
    .int()
    .min(1950, "Must be 1950 or later")
    .max(currentYear, `Cannot exceed ${currentYear}`),
  endYear: z
    .union([z.coerce.number().int(), z.literal("")])
    .optional(),
});

export function zodFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !out[key]) out[key] = issue.message;
  }
  return out;
}
