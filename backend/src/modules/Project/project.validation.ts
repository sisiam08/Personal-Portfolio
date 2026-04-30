import { z } from "zod";
import { ProjectStatus } from "../../generated/prisma/enums";

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string({ message: "Title is required" }),
    description: z.string({ message: "Description is required" }),
    problem: z.string({ message: "Problem statement is required" }),
    solution: z.string({ message: "Solution statement is required" }),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    status: z.nativeEnum(ProjectStatus, { message: "Status is required" } as any),
    featured: z.boolean().optional(),
    skills: z.array(z.string()).optional(), // Array of skill IDs
  })
});

export const updateProjectSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    problem: z.string().optional(),
    solution: z.string().optional(),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    status: z.nativeEnum(ProjectStatus).optional(),
    featured: z.boolean().optional(),
    skills: z.array(z.string()).optional(),
  })
});

export const ProjectValidation = {
  createProjectSchema,
  updateProjectSchema
};
